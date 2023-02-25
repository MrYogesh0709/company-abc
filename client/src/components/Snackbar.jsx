import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useAppContext } from "../context/appContext";

const SnackbarComponent = () => {
  const { message, severity, open, handleClose } = useAppContext();
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
