import { registrationUser, loginUser } from '../../controllers/user.controller';
import userModel from '../../models/user.model';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../utils/ErrorHandler';

// Mocking dependencies
jest.mock('../../models/user.model');

describe('User Controller - Unit Tests', () => {
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn() as NextFunction;
  });

  describe('registrationUser', () => {
    it('should return error if email already exists', async () => {
      req.body = { name: 'Rinesa Zuzaku', email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' };
      (userModel.findOne as jest.Mock).mockResolvedValue(true);

      await registrationUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new ErrorHandler('Email already exist', 400));
    });

    it('should successfully register user and send activation email', async () => {
      req.body = { name: 'Rinesa Zuzaku', email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' };
      (userModel.findOne as jest.Mock).mockResolvedValue(false);

      const sendMail = require('../../utils/sendMail');
      const ejs = require('ejs');
      jest.spyOn(ejs, 'renderFile').mockResolvedValue('<html></html>');
      jest.spyOn(sendMail, 'default').mockResolvedValue(true);

      await registrationUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: expect.any(String),
        activationToken: expect.any(String),
      }));
    });
  });


describe('loginUser', () => {
  it('should return error if email or password is missing', async () => {
    req.body = { email: '' };
    await loginUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new ErrorHandler('Please enter email and password', 400));
  });

  it('should return error if user not found', async () => {
    req.body = { email: 'rinesa.zuzaku1@student.uni-pr.edu', password: '12345678' };
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    await loginUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new ErrorHandler('Invalid email or password', 400));
  });

  it('should return error if password is incorrect', async () => {
    req.body = { email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' };
    const user = { comparePassword: jest.fn().mockResolvedValue(false) };
    (userModel.findOne as jest.Mock).mockResolvedValue(user);

    await loginUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new ErrorHandler('Invalid email or password', 400));
  });

  it('should log in user successfully and send token', async () => {
    req.body = { email: 'rinesa.zuzaku@student.uni-pr.edu', password: '12345678' };
    const user = { comparePassword: jest.fn().mockResolvedValue(true) };
    (userModel.findOne as jest.Mock).mockResolvedValue(user);

    const jwtUtils = require('../../utils/jwt');
    jest.spyOn(jwtUtils, 'sendToken').mockImplementation((user, statusCode, res) => {
      (res as Response).status(statusCode as number).json({ success: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmNjZWMzZjExNGVlODZmMmNiMjMzYyIsImlhdCI6MTcxNjY1MDk3MSwiZXhwIjoxNzE2NjUxMjcxfQ.F7ZZAJHUYVDpSS3f4wfvGtqPtHFENABTfhM2fdUdA7k' });
    });

    await loginUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmNjZWMzZjExNGVlODZmMmNiMjMzYyIsImlhdCI6MTcxNjY1MDk3MSwiZXhwIjoxNzE2NjUxMjcxfQ.F7ZZAJHUYVDpSS3f4wfvGtqPtHFENABTfhM2fdUdA7k' });
  });
});
});
