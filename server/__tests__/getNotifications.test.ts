import request from 'supertest';
import { app } from '../app'; // Import your express app
import mongoose from 'mongoose';
import NotificationModel from '../models/notification.Model'; // Import your notification model
import connectDB from '../utils/db';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { deleteOldNotifications } from '../controllers/notification.controller';
import { redis } from '../utils/redis';

beforeAll(async () => {
// Connect to a Mongo DB
await connectDB();
}, 30000); // Timeout of 30 seconds

afterAll((done) => {
    // Disconnect from the Mongo DB
    mongoose.connection.close().then(() => {
      // Close the Redis connection
      redis.quit(() => {
        console.log('Redis connection closed');
        deleteOldNotifications.stop();
        done();
      });
    });
  });
  

describe('GET /api/v1/get-all-notifications', () => {
let token: any;

beforeAll(() => {
// Create a token
const secret = process.env.ACCESS_TOKEN;
if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}
// Replace 'test_id' with the _id of an admin user in your database
token = jwt.sign({ _id: 'test_id' }, secret);
});

it('should get all notifications and return 201 status', async () => {
const res = await request(app)
    .get('/api/v1/get-all-notifications')
    .set('Authorization', `Bearer ${token}`);

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('success', true);
expect(res.body).toHaveProperty('notifications');
});
});
