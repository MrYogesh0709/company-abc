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
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import authenticatedUser, { authorizePermissions } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
//*not  used this route yet
router.post("/createEmployee", authenticatedUser, createEmployee);
router.get(
  "/getAllEmployee",
  authenticatedUser,
  authorizePermissions("manager"),
  getAllEmployee
);
router.delete(
  "/removeEmployee/:id",
  authenticatedUser,
  authorizePermissions("manager"),
  removeEmployee
);
router.patch(
  "/updateEmployeeStatus/:id",
  authenticatedUser,
  authorizePermissions("manager"),
  updateEmployeeStatus
);

router.delete("/logout", authenticatedUser, logout);

router.route("/getCurrentUser").get(authenticatedUser, getCurrentUser);
router.route("/verify-email").post(verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
