import mongoose from "mongoose";

const connectDB = (URL) => {
  mongoose.set("strictQuery", true).connect(URL);
};

export default connectDB;
