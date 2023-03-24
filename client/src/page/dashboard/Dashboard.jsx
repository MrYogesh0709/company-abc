import React, { useEffect, useState } from "react";
import { useAppContext } from "@context/appContext";
import {
  Loading,
  Logout,
  PageBtnContainer,
  SnackbarComponent,
} from "@components";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import task from "@assets/task.svg";
import moment from "moment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const Dashboard = () => {
  const { getAllTask, tasks, numOfPages, page } = useAppContext();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTask().then(() => setIsDataLoaded(true));
  }, [page]);

  const employeeTask = (props) => {
    navigate(`/dashboard/employee/task/${props}`);
  };

  return (
    <Container>
      <SnackbarComponent />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "1rem" }}
      >
        <Link to="/dashboard/getAllEmployee">
          <Button variant="contained">All Employee</Button>
        </Link>
        <Logout />
      </Box>
      <Typography variant="h4" component="h4" textAlign="center">
        All Task
      </Typography>
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
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#EFEFEF" },
                      }}
                      key={task._id}
                      onClick={() => employeeTask(task.assignedTo)}
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
      {numOfPages > 1 && <PageBtnContainer />}
    </Container>
  );
};
export default Dashboard;
