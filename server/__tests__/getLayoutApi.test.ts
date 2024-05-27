    import request from 'supertest';
    import { app } from '../app'; // Import your express app
    import mongoose from 'mongoose';
    import LayoutModel from '../models/layout.model'; // Import your layout model
    import connectDB from '../utils/db';
    import { deleteOldNotifications } from '../controllers/notification.controller';
    import { redis } from '../utils/redis';

    beforeAll(async () => {
    // Connect to a Mongo DB
    await connectDB();
    }, 30000); // Timeout of 30 seconds

        // Disconnect from the Mongo DB
        mongoose.connection.close().then(() => {
        // Close the Redis connection
        redis.quit();
        deleteOldNotifications.stop();
    });

    describe('GET /api/v1/get-layout/:type', () => {
    let layout: any;

    beforeAll(async () => {
        // Create a layout in the database
        layout = await LayoutModel.create({
        type: 'testType',
        // Add other properties as needed
        });
    });

    it('should get the layout by type and return 201 status', async () => {
        const res = await request(app)
        .get(`/api/v1/get-layout/${layout.type}`);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('layout');
    });
    });
