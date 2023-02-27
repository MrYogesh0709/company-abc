import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import Task from "../modal/Task.js";
import User from "../modal/User.js";

const createTask = async (req, res) => {
  // Check if the user is a manager
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Only managers can create Task");
  }
  const { id: employeeId } = req.params;
  const { title, description, startDate, dueDate } = req.body;
  // Check if the assignedTo employee exists in the database
  const assignedEmployee = await User.findOne({
    _id: employeeId,
    role: "employee",
    isActive: true,
  });
  if (!assignedEmployee) {
    throw new BadRequestError("Invalid assignedTo employee");
  }

  // Create a new task
  const task = new Task({
    title,
    description,
    startDate,
    dueDate,
    assignedTo: assignedEmployee._id,
    isComplete: false,
    createdBy: req.user.userId,
  });

  // Save the task to the database
  const savedTask = await task.save();
  res.status(201).json({ msg: "Task created", task: savedTask });
};

const getSpecificEmployeeTask = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Only managers can create Task");
  }
  const { id: employeeId } = req.params;
  const tasks = await Task.find({ assignedTo: employeeId });
  const user = await User.findOne({ _id: employeeId });
  if (tasks.length === 0) {
    throw new NotFoundError("No tasks found for the specified employee");
  }
  res.status(StatusCodes.OK).json({
    tasks,
    user: {
      user: user.name,
      role: user.role,
      isActive: user.isActive,
      id: user._id,
    },
  });
};

const completeTask = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Only managers will approve tasks");
  }
  const { id: taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError("No task found");
  }

  if (task.isComplete) {
    throw new BadRequestError("Task is already completed");
  }
  task.status = "completed";
  task.isComplete = true;
  task.completedDate = new Date();
  await task.save();

  return res.status(StatusCodes.OK).json({ msg: "Task completed", task });
};

const getAllTask = async (req, res) => {
  if (req.user.role !== "manager") {
    throw new UnauthenticatedError("Only managers are allowed");
  }
  const queryObject = { createdBy: req.user.userId };

  let result = Task.find().sort("-createdAt");
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const tasks = await result;
  const totalTasks = await Task.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTasks / limit);
  res.status(StatusCodes.OK).json({ tasks, totalTasks, numOfPages });
};

const getEmployeeTask = async (req, res) => {
  const employeeId = req.user.userId;
  const tasks = await Task.find({ assignedTo: employeeId });
  const user = await User.findOne({ _id: employeeId });
  res.status(StatusCodes.OK).json({
    tasks,
    user: { user: user.name, role: user.role, isActive: user.isActive },
  });
};

export {
  createTask,
  getAllTask,
  getEmployeeTask,
  getSpecificEmployeeTask,
  completeTask,
};
