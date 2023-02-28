import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  //this (error.msg) so here clg(err.msg) is built in js so we check that first
  //default error for frontend
  // console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };
  // missing name,password or email error
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  //unique email
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  //when params id is not perfect like more characters;
  if (err.name === "CastError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `No job with id ${Object.values(err.value).join("")}`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  // res.status(defaultError.statusCode).json({ msg: err });
};
export default errorHandlerMiddleware;
