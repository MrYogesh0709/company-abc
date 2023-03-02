import { StatusCodes } from "http-status-codes";
import User from "../modal/User.js";
import Task from "../modal/Task.js";
import {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} from "../errors/index.js";
import crypto from "crypto";
import {
  sendVerificationEmail,
  createHash,
  sendResetPasswordEmail,
  createTokenUser,
  attachCookiesToResponse,
} from "../utils/index.js";
import Token from "../modal/Token.js";

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
  // const origin = "http://localhost:5173";

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

  const tokenUser = createTokenUser(user);

  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  //or we can use method like we used in registerUser
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
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
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out..." });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Pleaser provide valid email");
  }
  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    //send email

    // const origin = "http://localhost:5173";
    const origin = "https://comapny-abc.onrender.com";

    sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError("Pleaser provide all values");
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "password changed success..." });
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
  forgotPassword,
  resetPassword,
};
