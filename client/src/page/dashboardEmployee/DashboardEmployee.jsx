import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, Logout, SnackbarComponent } from "../../components";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import task from "../../assets/task.svg";
import moment from "moment";
import { Link } from "react-router-dom";

const DashboardEmployee = () => {
  const { getEmployeeTask, tasks, user, isLoading } = useAppContext();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    getEmployeeTask().then(() => setIsDataLoaded(true));
  }, []);

  return (
    <Container>
      <SnackbarComponent />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
        <Logout />
      </Box>
      {isLoading ? (
        <Loading />
      ) : (
        user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <Typography variant="h6" component="h2">
              Name:
              <Typography variant="subtitle1" component="span">
                {user.name}
              </Typography>
            </Typography>
            <Typography variant="h6" component="h2">
              Role:
              <Typography variant="subtitle1" component="span">
                {user.role}
              </Typography>
            </Typography>
            <Typography variant="h6" component="h2">
              Status:
              <Typography variant="subtitle1" component="span">
                {user.isActive ? "Active" : "Inactive"}
              </Typography>
            </Typography>
          </Box>
        )
      )}
      <Box sx={{ mt: "2rem" }}>
        {!isDataLoaded ? (
          <Loading />
        ) : tasks.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Complete Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => {
                  return (
                    <TableRow
                      key={task._id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#EFEFEF" },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        {moment(task.startDate).format("MMMM Do, YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(task.dueDate).format("MMMM Do,YYYY")}
                      </TableCell>
                      <TableCell>
                        {task.completedDate
                          ? moment(task.completedDate).format("MMMM Do, YYYY")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box>
            <img src={task} alt={task} />
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "2rem",
                color: "#209CEE",
              }}
            >
              No tasks assigned
            </Typography>
            <Box display={"flex"} justifyContent="center" mt="2rem">
              <Link to="/">
                <Button variant="contained">back home</Button>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DashboardEmployee;
