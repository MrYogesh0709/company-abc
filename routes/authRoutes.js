import express from "express";
import {
  login,
  logout,
  register,
  createEmployee,
  removeEmployee,
  updateEmployeeStatus,
  getAllEmployee,
  getCurrentUser,
} from "../controllers/authController.js";
import authenticatedUser from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createEmployee", authenticatedUser, createEmployee);
router.get("/getAllEmployee", authenticatedUser, getAllEmployee);
router.delete("/removeEmployee/:id", authenticatedUser, removeEmployee);
router.patch(
  "/updateEmployeeStatus/:id",
  authenticatedUser,
  updateEmployeeStatus
);
router.get("/logout", logout);
router.route("/getCurrentUser").get(authenticatedUser, getCurrentUser);

export default router;
