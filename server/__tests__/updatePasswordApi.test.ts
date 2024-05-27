import request from 'supertest';
import { app } from '../app'; // Import your express app
import mongoose from 'mongoose';
import userModel from '../models/user.model'; // Import your user model
import connectDB from '../utils/db';
import { redis } from '../utils/redis';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { deleteOldNotifications } from '../controllers/notification.controller';

beforeAll(async () => {
// Connect to a Mongo DB
await connectDB();
}, 30000); // Timeout of 30 seconds

afterAll( (done) => {
// Disconnect from the Mongo DB
mongoose.connection.close();

// Close the Redis connection
redis.quit(() => {
console.log('Redis connection closed');
deleteOldNotifications.stop();
done();
});
});

describe('PUT /api/v1/update-user-password', () => {
let user;
let token: any;

beforeAll(async () => {
// Fetch the user from the database
user = await userModel.findOne({ email: 'vera.llugiqi@student.uni-pr.edu' });

if (!user) {
    throw new Error('User not found');
}

// Create a token
const secret = process.env.ACCESS_TOKEN;
if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}
token = jwt.sign({ _id: user._id }, secret);
});

it('should update the user password and return 201 status', async () => {
const res = await request(app)
    .put('/api/v1/update-user-password')
    .set('Authorization', `Bearer ${token}`)
    .send({
    oldPassword: '12345678',
    newPassword: 'newPassword123'
    });

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('success', true);
});

it('should return 400 status for invalid old password', async () => {
const res = await request(app)
    .put('/api/v1/update-user-password')
    .set('Authorization', `Bearer ${token}`)
    .send({
    oldPassword: 'wrongOldPassword',
    newPassword: 'newPassword123'
    });

expect(res.statusCode).toEqual(400);
expect(res.body).toHaveProperty('success', false);
expect(res.body).toHaveProperty('message', 'Invalid old password');
});
});
