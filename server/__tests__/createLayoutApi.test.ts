import request from 'supertest';
import { app } from '../app'; // Import your express app
import mongoose from 'mongoose';
import LayoutModel from '../models/layout.model'; // Import your layout model
import connectDB from '../utils/db';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { deleteOldNotifications } from '../controllers/notification.controller';
import { redis } from '../utils/redis';

beforeAll(async () => {
// Connect to a Mongo DB
await connectDB();
}, 30000); // Timeout of 30 seconds

afterAll(async () => {
// Disconnect from the Mongo DB
await mongoose.connection.close();
redis.quit();
deleteOldNotifications.stop();
});

describe('POST /api/v1/create-layout', () => {
let token: any;

beforeAll(() => {
// Create a token
const secret = process.env.ACCESS_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}
// Replace 'test_id' with the _id of an admin user in your database
token = jwt.sign({ _id: 'test_id' }, secret);
});

it('should create a new layout and return 200 status', async () => {
const layout = {
    type: 'Banner',
    banner: {
    image: 'test_image',
    title: 'Test Title',
    subTitle: 'Test Subtitle'
    }
};

const res = await request(app)
    .post('/api/v1/create-layout')
    .set('Authorization', `Bearer ${token}`)
    .send(layout);

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('success', true);
expect(res.body).toHaveProperty('message', 'Layout created successfully');
});
});
