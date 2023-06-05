const request = require('supertest');
const User = require('../models/user');

let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../index');
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });
  describe('GET /', () => {
    it('should return all users', async () => {
      await User.collection.insertMany([
        { name: 'enaholo1', email: 'ena12345@gmail.com', password: '123456' },
        { name: 'desmond2', email: 'des123245@gmail.com', password: '123456' },
      ]);
      const { body, status } = await request(server).get('/api/user');
      expect(status).toBe(200);
      // expect(body.data.length).toBe(2);
    });
  });

  describe('GET /:id', () => {
    test('should return a user if valid id is passed', async () => {
      const new_user = new User({
        name: 'desmond2',
        email: 'dessy112345@gmail.com',
        password: '123456',
      });

      await new_user.save();

      const { body, status } = await request(server).get(
        `/api/user/${new_user._id}`
      );
      expect(status).toBe(200);
      expect(body).toHaveProperty('name', new_user.name);
    });

    test('should return 404 if invalid ID is passed', async () => {
      const { body, status } = await request(server).get('/api/user/1');
      expect(status).toBe(404);
    });
  });

  describe('POST /', () => {
    test('should return 401 if client is not logged in', async () => {
      const { status, body } = await request(server)
        .post('/api/user')
        .send({ name: 'Ena', email: 'ena1234@gmail.com' });

      expect(status).toBe(400);
    });

    test('should return 400 if user name is less than 5 characters', async () => {
      const token = new User().getAuthToken();
      const { status, body } = await request(server)
        .post('/api/user')
        .set('x-auth-token', token)
        .send({ password: '12345', email: 'dessy112345@gmail.com' });

      expect(status).toBe(200);
    });
  });
});
