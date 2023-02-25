import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { TextField, Button, Grid, Container, Box } from "@mui/material";
import { SnackbarComponent } from "../../components";

const CreateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createTask, isLoading, displayAlert } = useAppContext();

  const initialState = {
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
  };

  const [values, setValues] = useState(initialState);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, startDate, dueDate } = values;
    if (!title || !description || !startDate || !dueDate) {
      displayAlert();
      return;
    }
    const startDateISO = new Date(startDate).toISOString();
    const dueDateISO = new Date(dueDate).toISOString();
    const createEmployeeTask = {
      title,
      description,
      startDate: startDateISO,
      dueDate: dueDateISO,
    };
    createTask({ employeeId: id, payload: createEmployeeTask });
    setValues(initialState);
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <SnackbarComponent />
      <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Start Date"
              name="startDate"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Due Date"
              name="dueDate"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Box
          display={"flex"}
          justifyContent="space-around"
          alignItems={"center"}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: "2rem" }}
            disabled={isLoading}
          >
            Create Task
          </Button>
          <Link to="/dashboard">
            <Button variant="contained" sx={{ mt: "2rem" }}>
              back home
            </Button>
          </Link>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTask;
