import express from "express";
import {
  completeTask,
  createTask,
  getAllTask,
  getEmployeeTask,
  getSpecificEmployeeTask,
} from "../controllers/taskController.js";
import authenticatedUser from "../middleware/auth.js";
const router = express.Router();

router.post("/createTask/:id", authenticatedUser, createTask);
router.patch("/completeTask/:id", authenticatedUser, completeTask);
router.get("/manager", authenticatedUser, getAllTask);
router.get("/manager/employee/:id", authenticatedUser, getSpecificEmployeeTask);
router.get("/employee", authenticatedUser, getEmployeeTask);

export default router;
