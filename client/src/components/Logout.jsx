import { Button } from "@mui/material";
import React from "react";
import { useAppContext } from "../context/appContext";

const Logout = () => {
  const { logoutUser, logOutUserMessage } = useAppContext();

  const logout = () => {
    logOutUserMessage();
    logoutUser();
  };

  return (
    <Button onClick={logout} variant="contained">
      Logout
    </Button>
  );
};

export default Logout;
