import { Box, Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/error.svg";
const Error = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <img src={error} alt={error} style={{ maxWidth: "100%" }} />
        <h3>ohh! page not found</h3>
        <p>we can&rsquo;t seem to find the page you&rsquo;re looking for</p>
        <Link to="/">
          <Button variant="contained">back home</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Error;
