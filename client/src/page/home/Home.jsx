import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import company from "@assets/company.svg";
import logo from "@assets/logo.svg";
import { Copyright, SnackbarComponent } from "@components";

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container>
      <SnackbarComponent />
      <Box sx={{ width: "100%", maxWidth: "400px", my: 4 }}>
        <img
          src={logo}
          alt="company"
          style={{ display: "block", maxWidth: "100%", height: "auto" }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 700, fontSize: "60px", mb: "2rem" }}>
              Company ABC
            </Typography>
            <Typography mb="2rem">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad unde
              beatae tempore quibusdam at sunt, repellat iusto distinctio
              voluptatibus quaerat nostrum pariatur incidunt. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Cum modi et maiores
              voluptas laboriosam! Sequi accusamus odio sed cum temporibus sint
              vero dolorem autem!
            </Typography>
            <Link to="/register">
              <Button variant="contained">Login/Register</Button>
            </Link>
          </Grid>
          {!isSmallScreen && (
            <Grid item xs={12} sm={6}>
              <img
                style={{ maxWidth: "100%" }}
                src={company}
                alt="loading..."
              />
            </Grid>
          )}
        </Grid>
        <Box sx={{ position: "absolute", bottom: -100, right: 0 }}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
