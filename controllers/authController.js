import { StatusCodes } from "http-status-codes";
import User from "../modal/User.js";
import Task from "../modal/Task.js";
import {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} from "../errors/index.js";
import crypto from "crypto";
import attachCookie from "../utils/attachCookie.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "manager" : "employee";

  const verificationToken = await crypto.randomBytes(40).toString("hex");
  const origin = "https://comapny-abc.onrender.com";
  const user = new User({ name, email, role, password, verificationToken });
  await user.save();
  await sendVerificationEmail({
    name: name,
    email: email,
    verificationToken: verificationToken,
    origin: origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Verification failed no user found");
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification failed");
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect password");
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your email");
  }
  const token = user.createJWT();
  attachCookie({ res, token });
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      role: user.role,
      name: user.name,
      isActive: user.isActive,
    },
    role: user.role,
  });
};

//* haven't used yet in project;
const createEmployee = async (req, res) => {
  const { name, email, password } = req.body;
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Unauthorized to this route");
  }
  // Check if user already exists with this email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }
  const employee = new User({
    name,
    email,
    password,
    role: "employee",
    isActive: true,
  });
  await employee.save();
  res.status(StatusCodes.CREATED).json({ msg: "Employee created" });
};

const getAllEmployee = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Unauthorized to this route");
  }
  const employees = await User.find({ role: "employee" }).select("-password");
  res.status(StatusCodes.OK).json({ employees });
};

const removeEmployee = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Unauthorized to this route");
  }
  // Find the user to remove by ID
  const { id } = req.params;
  const user = await User.findById(id);
  // If user not found, return 404 status code
  if (!user) {
    throw new NotFoundError("User not found");
  }
  // Remove the user
  await user.remove();
  await Task.deleteMany({ assignedTo: id });

  res.status(200).json({ msg: "User removed successfully" });
};

const updateEmployeeStatus = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Unauthorized to this route");
  }
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (user.isActive === false) {
    throw new BadRequestError("User is already InActive");
  }
  // Update the user status to inactive
  user.isActive = false;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "User Status Updated...", isActive: user.isActive });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      role: user.role,
      name: user.name,
      isActive: user.isActive,
    },
    role: user.role,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out..." });
};

export {
  register,
  login,
  logout,
  createEmployee,
  removeEmployee,
  updateEmployeeStatus,
  getAllEmployee,
  getCurrentUser,
  verifyEmail,
};
