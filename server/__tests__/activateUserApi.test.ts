import request from 'supertest';
import { app } from '../app'; // Import your express app
import mongoose from 'mongoose';
import userModel from '../models/user.model'; // Import your user model
import connectDB from '../utils/db';
import { redis } from '../utils/redis';
import { deleteOldNotifications } from '../controllers/notification.controller';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

beforeAll(async () => {
// Connect to a Mongo DB
await connectDB();
}, 30000); // Timeout of 30 seconds

afterAll(async () => {
// Disconnect from the Mongo DB
await mongoose.connection.close();

// Close the Redis connection
redis.quit();

// Stop the cron job
deleteOldNotifications.stop();
});

describe('POST /api/v1/activate-user', () => {
afterEach(async () => {
// After each test, clean up the database
// await userModel.deleteMany({});
});

it('should activate a new user and return 201 status', async () => {
const user = {
    name: 'Test User',
    email: 'vera.llugiqi@student.uni-pr.edu',
    password: '12345678'
};

// Create an activation token
const secret = process.env.ACTIVATION_SECRET;
if (!secret) {
    throw new Error('ACTIVATION_SECRET is not defined');
}
const activationToken = jwt.sign({ user, activationCode: '123456' }, secret);

const res = await request(app)
    .post('/api/v1/activate-user')
    .send({
    activation_token: activationToken,
    activation_code: '123456'
    });

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('success', true);
});

it('should return 400 status for invalid activation code', async () => {
const user = {
    name: 'Test User',
    email: 'vera.llugiqi@outlook.com',
    password: '12345678'
};

// Create an activation token
const secret = process.env.ACTIVATION_SECRET;
if (!secret) {
    throw new Error('ACTIVATION_SECRET is not defined');
}
const activationToken = jwt.sign({ user, activationCode: '123456' }, secret);

const res = await request(app)
    .post('/api/v1/activate-user')
    .send({
    activation_token: activationToken,
    activation_code: 'wrong-code'
    });

expect(res.statusCode).toEqual(400);
expect(res.body).toHaveProperty('success', false);
expect(res.body).toHaveProperty('message', 'Invalid activation code');
});
});
