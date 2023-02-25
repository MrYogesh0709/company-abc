import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {"Copyright © "}
      <Link to="/">
        <Button>Company</Button>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
