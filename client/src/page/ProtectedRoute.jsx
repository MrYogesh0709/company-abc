import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import PropTypes from "prop-types";
import { Loading } from "../components";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading, role } = useAppContext();
  if (userLoading) return <Loading />;
  if (!user) {
    return <Navigate to="/" />;
  }
  if (role !== "manager") {
    return <Navigate to="/dashboard/employee" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
