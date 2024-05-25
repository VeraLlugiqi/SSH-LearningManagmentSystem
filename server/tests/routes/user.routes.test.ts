import request from 'supertest';
import express, { Response } from 'express';
import userRouter from '../../routes/user.route';
import userModel from '../../models/user.model';

// Mocking dependencies
jest.mock('../../models/user.model');
jest.mock('../../utils/jwt', () => ({
  sendToken: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter);

describe('User Routes - API Tests', () => {
  describe('POST /registration', () => {
    it('should return 400 if email already exists', async () => {
      userModel.findOne = jest.fn().mockResolvedValue(true);

      const res = await request(app)
        .post('/api/v1/user/registration')
        .send({ name: 'Rinesa', email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Email already exist');
    });

    it('should successfully register user and send activation email', async () => {
      userModel.findOne = jest.fn().mockResolvedValue(false);

      // Mocking sendMail function
      jest.mock('../../utils/sendMail', () => jest.fn());

      const res = await request(app)
        .post('/api/v1/user/registration')
        .send({ name: 'Rinesa Zuzaku', email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.objectContaining({
        success: true,
        message: expect.any(String),
        activationToken: expect.any(String),
      }));
    });
  });

  describe('POST /login', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/login')
        .send({ email: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Please enter email and password');
    });

    it('should return 400 if user not found', async () => {
      userModel.findOne = jest.fn().mockResolvedValue(null);

      const res = await request(app)
        .post('/api/v1/user/login')
        .send({ email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should log in user successfully and send token', async () => {
      const user = { comparePassword: jest.fn().mockResolvedValue(true) };
      userModel.findOne = jest.fn().mockResolvedValue(user);

      const jwtUtils = require('../../utils/jwt');
      const { sendToken } = jwtUtils;

      // Mocking sendToken function
      jest.spyOn(sendToken, 'sendToken').mockImplementation((user, statusCode, res) => {
        (res as Response).status(statusCode as number).json({ success: true, token: 'dummyToken' });
      });

      const res = await request(app)
        .post('/api/v1/user/login')
        .send({ email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true, token: 'dummyToken' });
    });
  });
});
