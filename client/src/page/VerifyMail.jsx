import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { Box, Button, Container, Typography } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyMail = () => {
  const { verificationToken, isLoading } = useAppContext();
  const query = useQuery();

  useEffect(() => {
    verificationToken({
      token: query.get("token"),
      email: query.get("email"),
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <Box
        sx={{ display: "grid", justifyContent: "center", margin: "10rem 0" }}
      >
        <Typography variant="h4" component={"h2"}>
          Account Confirmed
        </Typography>
        <Link to="/register">
          <Button variant="contained">Please Login</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default VerifyMail;
