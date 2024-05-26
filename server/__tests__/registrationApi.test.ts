import request from 'supertest';
import {app} from '../app';
import mongoose from 'mongoose';
import userModel from '../models/user.model'
import connectDB from '../utils/db';
import {redis} from '../utils/redis';
import { deleteOldNotifications } from '../controllers/notification.controller';

beforeAll(async () => {
    // Connect to a Mongo DB
    await connectDB();
  }, 30000); // Timeout of 10 seconds


afterAll(async () => {
// Disconnect from the Mongo DB
await mongoose.connection.close();
redis.quit();
deleteOldNotifications.stop();
});

describe('POST /api/v1/registration', () => {
afterEach(async () => {
// After each test, clean up the database
// await userModel.deleteMany({});
});

it('should create a new user and return 201 status', async () => {
const res = await request(app)
    .post('/api/v1/registration')
    .send({
    name: 'Test kUser',
    email: 'vera.llugiqi@student.uni-pr.edu',
    password: '12345678'
    });

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('success', true);
expect(res.body).toHaveProperty('message');
expect(res.body).toHaveProperty('activationToken');
});

it('should return 400 status for duplicate email', async () => {
await request(app)
    .post('/registration')
    .send({
    name: 'Test kUser',
    email: 'vera.llugiqi@outlook.com',
    password: 'password123'
    });

const res = await request(app)
    .post('/api/v1/registration')
    .send({
    name: 'Test kUser',
    email: 'vera.llugiqi@student.uni-pr.edu',
    password: '12345678'
    });

expect(res.statusCode).toEqual(400);
expect(res.body).toHaveProperty('success', false);
expect(res.body).toHaveProperty('message', 'Email already exist');
});
});
