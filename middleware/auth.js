const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied, no token provided.' });

  try {
    const decodedToken = await jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Access denied, invalid token provided.' });
  }
};
