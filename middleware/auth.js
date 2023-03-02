import { UnauthenticatedError } from "../errors/index.js";
import Token from "../modal/Token.js";
import { attachCookiesToResponse, isTokenValid } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  // * without refreshToken
  // if (!token) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }
  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   req.user = { userId: payload.userId, role: payload.role };
  //   next();
  // } catch (error) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }
};

export default auth;
