
import { updateNotification } from '../../controllers/notification.controller';
import notificationModel from '../../models/notificationModel';
import { Request, Response, NextFunction } from 'express';

// Mocking dependencies
jest.mock('../../models/notification.model');

describe('Notification Controller - Unit Tests', () => {
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn() as NextFunction;
  });

  describe('updateNotification', () => {
    it('should update notification status and return notifications', async () => {
      req.body = { notificationId: 'validNotificationId', status: 'read' };
      const mockNotification = { _id: 'validNotificationId', message: 'Notification Message', status: 'unread' };
      (notificationModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockNotification);

      const updatedNotification = { ...mockNotification, status: 'read' };
      (notificationModel.find as jest.Mock).mockResolvedValue([updatedNotification]);

      await updateNotification(req as Request, res as Response, next);

      expect(notificationModel.findByIdAndUpdate).toHaveBeenCalledWith('validNotificationId', { status: 'read' }, { new: true });
      expect(notificationModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        notifications: [updatedNotification],
      });
    });
  });
});
