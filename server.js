import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//DATABASE
import connectDB from "./db/connect.js";

//routes
import authRoute from "./routes/authRoutes.js";
import taskRoute from "./routes/taskRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//extra middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
