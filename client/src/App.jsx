import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AllEmployee,
  CreateTask,
  Dashboard,
  DashboardEmployee,
  Error,
  Home,
  Register,
  Task,
} from "./page";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/employee" element={<DashboardEmployee />} />
        <Route path="/dashboard/createTask/:id" element={<CreateTask />} />
        <Route path="/dashboard/employee/task/:id" element={<Task />} />
        <Route path="/dashboard/getAllEmployee" element={<AllEmployee />} />
        <Route path="/dashboard/user" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
