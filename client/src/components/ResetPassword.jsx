import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import SnackbarComponent from "./Snackbar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const { loading, resetPassword } = useAppContext();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const query = useQuery();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      token: query.get("token"),
      email: query.get("email"),
      password,
    });
    navigate("/register");
  };

  return (
    <Container>
      <SnackbarComponent />
      <form
        className={loading ? "form form-loading" : "form"}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h4" mt="2rem">
          Reset password
        </Typography>
        {/* single form row */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        {/* end of single form row */}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Please Wait..." : "New Password"}
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
