import { Container, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import company from "../../assets/company.svg";
import logo from "../../assets/logo.svg";
import { Copyright, SnackbarComponent } from "../../components";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  return (
    <Container>
      <SnackbarComponent />
      <Box sx={{ width: "100%", maxWidth: "400px", my: 4 }}>
        <img src={logo} alt="company" style={{ width: "100%" }} />
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
          <Grid item xs={6}>
            <img className={classes.image} src={company} alt="loading..." />
          </Grid>
        </Grid>
        <Box sx={{ position: "absolute", bottom: -100, right: 0 }}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
