import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
