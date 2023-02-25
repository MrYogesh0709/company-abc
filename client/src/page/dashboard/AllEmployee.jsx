import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { SnackbarComponent } from "../../components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const AllEmployee = () => {
  const { getAllEmployee, employees, removeEmployee, editEmployee } =
    useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);

  const addTaskEmployee = (props) => {
    navigate(`/dashboard/createTask/${props}`);
  };
  const employeeTask = (props) => {
    navigate(`/dashboard/employee/task/${props}`);
  };

  return (
    <Container>
      <SnackbarComponent />
      <Button
        variant="contained"
        sx={{ margin: "1rem 0 1rem 0" }}
        onClick={() => navigate("/")}
      >
        Add New User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Remove</TableCell>
            <TableCell>Add Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee._id}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#EFEFEF" },
              }}
            >
              <TableCell onClick={() => employeeTask(employee._id)}>
                {employee.name}
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell
                onClick={() => editEmployee(employee._id)}
                sx={{ cursor: "pointer" }}
              >
                {employee.isActive ? "Active" : "In active"}
              </TableCell>
              <TableCell
                onClick={() =>
                  removeEmployee({ id: employee._id, name: employee.name })
                }
                sx={{ cursor: "pointer" }}
              >
                <Avatar
                  sx={{
                    bgcolor: "transparent",
                    width: 24,
                    height: 24,
                    color: "red",
                  }}
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </Avatar>
              </TableCell>
              <TableCell
                onClick={() => addTaskEmployee(employee._id)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Avatar
                  sx={{
                    color: "blue",
                    width: 24,
                    height: 24,
                    bgcolor: "transparent",
                  }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </Avatar>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllEmployee;
