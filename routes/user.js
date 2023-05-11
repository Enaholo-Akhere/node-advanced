const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Joi = require('joi');
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

const validateCourse = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(3),
    isAdmin: Joi.boolean(),
  });

  return ({ error, value } = schema.validate(user));
};

router.get('/me', [auth, admin], async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password -__v');
  if (!user)
    res.status(400).json({ message: 'user not found', success: false });
  res.status(200).json({ data: user, message: 'user found', success: true });
});

router.get('/', auth, async (req, res) => {
  try {
    data;
    const user = await Users.find();
    if (!user) throw new Error('user does not exist');
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error.message);
  }
});

// create user
router.post('/', async (req, res) => {
  console.log(req.body);

  const { error, value } = validateCourse(req.body);
  console.log('value', value);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);
    const user = await new Users({
      email: value.email,
      password: hashedPassword,
      name: value.name,
    });

    const result = await user.save();
    console.log(result);
    const token = user.getAuthToken();

    return res
      .header('x-auth-token', token)
      .status(200)
      .json({ data: result, succuss: true, message: 'successfully signed up' });
  } catch (error) {
    console.log('error', error);
  }
});

//get a user
router.post('/login', async (req, res) => {
  const { error, value } = validateCourse(req.body);
  console.log('value', value);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await Users.findOne({ email: value.email });
    if (!user)
      return res.status(404).json({ message: 'incorrect email or password' });
    const checkPassPassword = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!checkPassPassword)
      return res.status(404).json({ message: 'incorrect email or password' });
    // create token
    const token = user.getAuthToken();
    return res.header('x-auth-token', token).status(200).json({
      data: user,
      message: 'log in successful',
      status: 'success',
    });
  } catch (error) {
    console.log('error message', error);
  }
});

router.put('/update/:id', auth, async (req, res) => {
  //check if it exist
  // debug('req', req);
  const user = await Users.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        email: req.body.email,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
      },
    },
    { new: true }
  );

  //update the course
  console.log('updated user', user);
  return res.status(200).json({ data: user });
});

router.delete('/delete/:id', auth, async (req, res) => {
  const user = await Users.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(404)
      .json({ messages: 'user with this id not found', status: 'failed' });
  return res
    .status(200)
    .json({ messages: 'user deleted', status: 'successful' });
});

module.exports = router;
