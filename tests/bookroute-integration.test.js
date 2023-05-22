const express = require('express');
const request = require('supertest');
const bookRoute = require('../routes/books');

const app = express();

app.use('/api/books', bookRoute);

describe('Integration tests for book API', () => {
  test('GET /api/books - success - get all the books', async () => {
    const { body, statusCode } = await request(app).get('/api/books');

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          author: expect.any(String),
          id: expect.any(Number),
        }),
      ])
    );

    expect(statusCode).toBe(200);
  });

  test('POST /api/books - failure on invalid post body', async () => {
    const { body, statusCode } = await request(app).post('/api/books').send({
      name: '',
      author: 'John Travolta',
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      errors: [
        {
          location: 'body',
          msg: 'Book name is required',
          param: 'name',
          value: '',
        },
      ],
    });
  });
});
