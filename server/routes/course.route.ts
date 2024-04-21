import express from "express";
import { uploadCourse, editCourse ,getSingleCourse, getAllCourses,getCourseByUser, addQuestion, addAnswer} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();


courseRouter.post(
    "/create-course",
    isAutheticated,
    authorizeRoles("admin"),
    uploadCourse
);

courseRouter.put(
    "/edit-course/:id",
    isAutheticated,
    authorizeRoles("admin"),
    editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);
courseRouter.put(
    "/add-question", 
    isAutheticated, 
    addQuestion);

courseRouter.put(
    "/add-answer", 
    isAutheticated, 
    addAnswer);

export default courseRouter;