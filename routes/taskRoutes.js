import express from "express";
import {
  completeTask,
  createTask,
  getAllTask,
  getEmployeeTask,
  getSpecificEmployeeTask,
} from "../controllers/taskController.js";
import authenticatedUser, { authorizePermissions } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/createTask/:id",
  authenticatedUser,
  authorizePermissions("manager"),
  createTask
);
router.patch(
  "/completeTask/:id",
  authenticatedUser,
  authorizePermissions("manager"),
  completeTask
);
router.get(
  "/manager",
  authenticatedUser,
  authorizePermissions("manager"),
  getAllTask
);
router.get(
  "/manager/employee/:id",
  authenticatedUser,
  authorizePermissions("manager"),
  getSpecificEmployeeTask
);
router.get("/employee", authenticatedUser, getEmployeeTask);

export default router;
