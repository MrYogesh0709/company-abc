import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Loading, SnackbarComponent } from "../../components";
import task from "../../assets/task.svg";
import moment from "moment";

const Task = () => {
  const { getSpecificEmployeeTask, tasks, user, isLoading, updateTask } =
    useAppContext();
  console.log(user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    getSpecificEmployeeTask(id).then(() => setIsDataLoaded(true));
  }, []);

  const addTaskEmployee = (props) => {
    navigate(`/dashboard/createTask/${props}`);
  };
  return (
    <Container>
      <SnackbarComponent />
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
              Name:{user.user}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Role: {user.role}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Status: {user.isActive ? "Active" : "Inactive"}
            </Typography>
          </Box>
        )
      )}
      <Box sx={{ mt: "2rem" }}>
        {!isDataLoaded ? (
          <Loading />
        ) : tasks.length > 0 ? (
          <>
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
                        key={index}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#EFEFEF" },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell onClick={() => updateTask(task._id)}>
                          {task.status}
                        </TableCell>
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
            <Box display={"flex"} justifyContent="flex-end" mt={"2rem"}>
              <Button
                onClick={() => addTaskEmployee(user?.id)}
                variant="contained"
                sx={{
                  cursor: "pointer",
                }}
              >
                create Task
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <img src={task} alt="task" />
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

export default Task;
