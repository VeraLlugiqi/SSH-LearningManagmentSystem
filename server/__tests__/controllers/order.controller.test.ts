
import { createOrder } from '../../controllers/order.controller';
import orderModel from '../../models/order.Model';
import courseModel from '../../models/course.model';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../utils/ErrorHandler';

// Mocking dependencies
jest.mock('../../models/order.model');
jest.mock('../../models/course.model');

describe('Order Controller - Unit Tests', () => {
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn() as NextFunction;
  });

  describe('createOrder', () => {
    it('should return error if course is not found', async () => {
      req.body = { courseId: 'invalidCourseId', userId: 'userId' };
      (courseModel.findById as jest.Mock).mockResolvedValue(null);

      await createOrder(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new ErrorHandler('Course not found', 404));
    });

    it('should send order confirmation email and create order successfully', async () => {
      req.body = { courseId: 'validCourseId', userId: 'userId' };
      const mockCourse = { _id: 'validCourseId', title: 'Valid Course' };
      (courseModel.findById as jest.Mock).mockResolvedValue(mockCourse);

      const mockOrder = { _id: 'validOrderId', courseId: 'validCourseId', userId: 'userId' };
      (orderModel.create as jest.Mock).mockResolvedValue(mockOrder);

      const sendMail = require('../../utils/sendMail');
      const ejs = require('ejs');
      jest.spyOn(ejs, 'renderFile').mockResolvedValue('<html></html>');
      jest.spyOn(sendMail, 'default').mockResolvedValue(true);

      await createOrder(req as Request, res as Response, next);

      expect(ejs.renderFile).toHaveBeenCalledWith(expect.any(String), { order: mockOrder });
      expect(sendMail.default).toHaveBeenCalledWith(expect.objectContaining({
        email: 'userEmail', // Replace 'userEmail' with the actual user email
        subject: 'Order Confirmation',
      }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ order: mockOrder }));
    });
  });
});
