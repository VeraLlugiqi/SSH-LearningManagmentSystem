import dotenv from "dotenv";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app"; // Import your Express app
import CourseModel from "../models/course.model"; // Import the course model

dotenv.config(); // Ensure dotenv is configured at the top

const newCourse = {
  name: "Test Course",
  description: "This is a test course description",
  categories: "Programming",
  price: 100,
  tags: "test,programming",
  level: "Beginner",
  demoUrl: "http://example.com/demo",
  benefits: [{ title: "Benefit 1" }],
  prerequisites: [{ title: "Prerequisite 1" }],
};

describe("Course API", () => {
  let token: string;

  beforeAll(async () => {
    console.log("Before all hook is running...");
    const mongoUrl = process.env.DB_URL;
    console.log("MONGO_URL:", mongoUrl); // Log the MONGO_URL to check if it is set
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined");
    }
    await mongoose.connect(mongoUrl, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    // Make a request to login and get the JWT token
    const loginResponse = await request(app).post("/api/v1/login").send({
      email: "test1716832840890@example.com",
      password: "Password123",
    });
    token = loginResponse.body.accessToken; // Store the JWT token for later use
  });

  it("should create a new course", async () => {
    console.log("Inside the first test...");
    const res = await request(app)
      .post("/api/v1/create-course")
      .set("Authorization", `Bearer ${token}`) // Use the stored JWT token for authorization
      .send(newCourse);

    console.log("Create Course Response:", res.body); // Add this line for debugging
    console.log("Status Code:", res.statusCode); // Log the status code for debugging

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.course).toHaveProperty("_id");
    expect(res.body.course.name).toBe(newCourse.name);
  });

  it("should get all courses", async () => {
    const res = await request(app).get("/api/v1/get-courses");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.courses.length).toBeGreaterThan(0);
  });

  it("should get a single course", async () => {
    const course = await CourseModel.create(newCourse);
    const res = await request(app).get(`/api/v1/get-course/${course._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.course).toHaveProperty("_id", course._id.toString());
  });

  it("should edit a course", async () => {
    const course = await CourseModel.create(newCourse);
    const res = await request(app)
      .put(`/api/v1/edit-course/${course._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Course Name" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.course).toHaveProperty("_id", course._id.toString());
    expect(res.body.course.name).toBe("Updated Course Name");
  });

  it("should delete a course", async () => {
    const course = await CourseModel.create(newCourse);
    const res = await request(app)
      .delete(`/api/v1/delete-course/${course._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.message).toBe("Course deleted successfully");
  });
});
