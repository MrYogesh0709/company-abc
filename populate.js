import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();
import { readFile } from "fs/promises";
import { URL } from "url";
import Task from "./modal/Task.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // await Task.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock_data.json", import.meta.url))
    );
    await Task.create(jsonProducts);
    console.log("Success...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
