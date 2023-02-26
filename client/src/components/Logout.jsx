import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Logout = () => {
  const { logoutUser, logOutUserMessage } = useAppContext();
  const navigate = useNavigate();
  const logout = () => {
    logOutUserMessage();
    logoutUser();
    navigate("/");
  };

  return (
    <Button onClick={logout} variant="contained">
      Logout
    </Button>
  );
};

export default Logout;
