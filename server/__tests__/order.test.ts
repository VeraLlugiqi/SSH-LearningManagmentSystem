import request from "supertest";
import { app } from "../app"; // Adjust the path as needed
import mongoose from "mongoose";
import userModel from "../models/user.model";
import orderModel from "../models/order.Model";
import connectDB from "../utils/db";
import { redis } from "../utils/redis";
import { deleteOldNotifications } from "../controllers/notification.controller";

beforeAll(async () => {
  // Connect to MongoDB
  await connectDB();
}, 30000); // Timeout of 30 seconds

afterAll(async () => {
  // Disconnect from MongoDB and close Redis connection
  await mongoose.connection.close();
  redis.quit();
  deleteOldNotifications.stop();
});

describe("POST /api/v1/create-order", () => {
  let user;
  let token = ""; // TypeScript will infer the type as string based on the value assignment

  beforeAll(async () => {
    // Create a user to authenticate
    user = await userModel.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    // Simulate user login to get the token
    const res = await request(app).post("/api/v1/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    token = res.body.token; // Assuming the login route returns a JWT token
  });

  afterEach(async () => {
    // After each test, clean up the database
    await orderModel.deleteMany({});
  });

  it("should create a new order and return 201 status", async () => {
    const res = await request(app)
      .post("/api/v1/create-order")
      .set("Authorization", `Bearer ${token}`) // Send token in header
      .send({
        courseId: "someCourseId",
        payment_info: {
          id: "somePaymentId",
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("order");
  });

  it("should return 400 status for duplicate order", async () => {
    await request(app)
      .post("/api/v1/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        courseId: "someCourseId",
        payment_info: {
          id: "somePaymentId",
        },
      });

    const res = await request(app)
      .post("/api/v1/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        courseId: "someCourseId",
        payment_info: {
          id: "somePaymentId",
        },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty(
      "message",
      "You have already purchased this course"
    );
  });
});
