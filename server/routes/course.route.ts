import express from "express";
import {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourses,
  getCourseByUser,
  addQuestion,
  addAnwser,
  addReview,
  addReplyToReview,
  deleteCourse,
  generateVideoUrl,
  getAdminAllCourses,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get(
  "/get-admin-courses",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);

courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAutheticated,
  getCourseByUser
);

courseRouter.put(
  "/add-question",
  updateAccessToken,
  isAutheticated,
  addQuestion
);

courseRouter.put("/add-answer", updateAccessToken, isAutheticated, addAnwser);

courseRouter.put(
  "/add-review/:id",
  updateAccessToken,
  isAutheticated,
  addReview
);

courseRouter.put(
  "/add-reply",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRouter.get(
  "/get-admin-courses",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);

courseRouter.post(
  "/getVdoCipherOTP",
  // isAutheticated,
  generateVideoUrl
);

courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
