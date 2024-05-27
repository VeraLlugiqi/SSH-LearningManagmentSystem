import request from 'supertest';
import { app } from '../app'; // Import your express app
import mongoose from 'mongoose';
import userModel from '../models/user.model'; // Import your user model
import connectDB from '../utils/db';
import { redis } from '../utils/redis';
import { deleteOldNotifications } from '../controllers/notification.controller';

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

describe('POST /api/v1/login', () => {
afterEach(async () => {
// After each test, clean up the database
// await userModel.deleteMany({});
});

it('should log in an existing user and return 200 status', async () => {
// First, create a user
const user = {
    name: 'Vera User',
    email: 'vera.llugiqi@outlook.com',
    password: '12345678'
};
await userModel.create(user);

// Then, try to log in with that user's credentials
const res = await request(app)
    .post('/api/v1/login')
    .send({
    email: user.email,
    password: user.password
    });

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('success', true);
expect(res.body).toHaveProperty('message', 'Logged in successfully');
});

it('should return 400 status for invalid email or password', async () => {
const res = await request(app)
    .post('/api/v1/login')
    .send({
    email: 'wrong.email@example.com',
    password: 'wrongpassword'
    });

expect(res.statusCode).toEqual(400);
expect(res.body).toHaveProperty('success', false);
expect(res.body).toHaveProperty('message', 'Invalid email or password');
});
});
