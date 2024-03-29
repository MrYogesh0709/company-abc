import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgetPassword, ResetPassword, VerifyMail } from "./components";
import {
  AllEmployee,
  CreateTask,
  Dashboard,
  DashboardEmployee,
  Home,
  ProtectedRoute,
  Register,
  Task,
  Error,
} from "./page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="manager">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/getAllEmployee"
          element={
            <ProtectedRoute role="manager">
              <AllEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/createTask/:id"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/employee/task/:id"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/employee" element={<DashboardEmployee />} />
        <Route path="/user/verify-email" element={<VerifyMail />} />

        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
