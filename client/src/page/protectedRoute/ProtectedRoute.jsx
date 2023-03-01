import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import PropTypes from "prop-types";
import { Loading } from "../../components";

const ProtectedRoute = ({ children, role }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) return <Loading />;
  if (!user) {
    return <Navigate to="/" />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/dashboard/employee" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};
export default ProtectedRoute;
