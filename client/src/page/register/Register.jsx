import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import {
  Alert,
  Snackbar,
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const {
    signUpUser,
    loginUser,
    isLoading,
    message,
    severity,
    open,
    handleClose,
    displayAlert,
    user,
  } = useAppContext();
  const [values, setValues] = React.useState(initialState);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      loginUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Success! Redirecting...",
      });
    } else {
      signUpUser({
        currentUser,
        endPoint: "register",
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (user?.role === "manager") {
      navigate("/dashboard");
    }
    if (user?.role === "employee") {
      navigate("/dashboard/employee");
    }
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {values.isMember ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {values.isMember ? "Sign In" : "Sign Up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {!values.isMember && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
            />
          )}
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
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {values.isMember ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container>
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            <Grid item>
              <Button
                onClick={() => {
                  setValues({ ...values, isMember: !values.isMember });
                }}
              >
                {values.isMember
                  ? "Already have account? Sign IN"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
