import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import SnackbarComponent from "./Snackbar";
import { useAppContext } from "../context/appContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { displayAlert, forgotPassword, loading } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      displayAlert();
      return;
    }
    forgotPassword({ email });
    setEmail("");
    navigate("/register");
  };
  return (
    <Container>
      <SnackbarComponent />
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h4" mt="2rem">
          Forgot password
        </Typography>
        {/* single form row */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        />
        {/* end of single form row */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: "1rem" }}
        >
          {loading ? "Please Wait..." : "Get Reset Password Link"}
        </Button>
        <Typography mt="1rem">
          Already have an account?
          <Link to="/register">
            <Button>Log In</Button>
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default ForgotPassword;
