import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import PropTypes from "prop-types";
import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_VALUE,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  EDIT_EMPLOYEE_BEGIN,
  EDIT_EMPLOYEE_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_EMPLOYEE_BEGIN,
  GET_EMPLOYEE_SPECIFIC_TASK_BEGIN,
  GET_EMPLOYEE_SPECIFIC_TASK_SUCCESS,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_TASK_BEGIN,
  GET_EMPLOYEE_TASK_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_CURRENT_USER,
  LOGOUT_USER,
  REMOVE_EMPLOYEE_BEGIN,
  REMOVE_EMPLOYEE_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SET_ALERT,
  UPDATE_TASK_BEGIN,
  UPDATE_TASK_SUCCESS,
} from "./action";
import axios from "axios";

export const initialState = {
  isLoading: false,
  user: null,
  tasks: [],
  role: "",
  employees: [],
  message: "",
  severity: "success",
  open: false,
  userLoading: true,
  employee: null,
  page: 1,
  totalTasks: 0,
  numOfPages: 1,
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser,
        {
          withCredentials: true,
        }
      );
      const { user, role } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          role,
          message: alertText,
          severity: "success",
        },
      });
    } catch (error) {
      dispatch({
        type: SET_ALERT,
        payload: { message: error.response.data.msg, severity: "error" },
      });
    }
  };

  const displayAlert = () => {
    dispatch({
      type: SET_ALERT,
      payload: { message: "Please provide all value", severity: "error" },
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: CLEAR_ALERT });
  };
  const logoutUser = async () => {
    await axios.get(`/api/v1/auth/logout`, {
      withCredentials: true,
    });
  };

  const logoutCurrentUser = async () => {
    await axios.get(`/api/v1/auth/logout`, {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_CURRENT_USER });
  };

  const logOutUserMessage = () => {
    dispatch({
      type: LOGOUT_USER,
      payload: { message: "User Logged out...", severity: "success" },
    });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/auth/getCurrentUser`, {
        withCredentials: true,
      });
      const { user, role } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, role } });
    } catch (error) {
      logoutCurrentUser();
    }
  };

  const getEmployeeTask = async () => {
    dispatch({ type: GET_EMPLOYEE_TASK_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/task/employee`, {
        withCredentials: true,
      });
      const { tasks } = data;
      dispatch({ type: GET_EMPLOYEE_TASK_SUCCESS, payload: { tasks } });
    } catch (error) {
      dispatch({
        type: SET_ALERT,
        payload: { message: error.response.data.msg, severity: "error" },
      });
      logoutUser();
    }
  };

  const getAllTask = async () => {
    dispatch({ type: GET_EMPLOYEE_TASK_BEGIN });
    const { page } = state;
    try {
      const { data } = await axios.get(`/api/v1/task/manager?page=${page}`, {
        withCredentials: true,
      });
      const { tasks, totalTasks, numOfPages } = data;
      dispatch({
        type: GET_EMPLOYEE_TASK_SUCCESS,
        payload: { tasks, totalTasks, numOfPages },
      });
    } catch (error) {
      dispatch({
        type: SET_ALERT,
        payload: { message: error.response.data.msg, severity: "error" },
      });
      logoutUser();
    }
  };

  const getSpecificEmployeeTask = async (employeeId) => {
    dispatch({ type: GET_EMPLOYEE_SPECIFIC_TASK_BEGIN });
    try {
      const { data } = await axios.get(
        `/api/v1/task/manager/employee/${employeeId}`,
        {
          withCredentials: true,
        }
      );
      const { tasks, user } = data;
      dispatch({
        type: GET_EMPLOYEE_SPECIFIC_TASK_SUCCESS,
        payload: { tasks, user },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const getAllEmployee = async () => {
    dispatch({ type: GET_EMPLOYEE_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/auth/getAllEmployee`, {
        withCredentials: true,
      });
      const { employees } = data;
      dispatch({
        type: GET_EMPLOYEE_SUCCESS,
        payload: { employees },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const removeEmployee = async ({ id: employeeId, name }) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${name} ?`
    );
    if (confirmed) {
      dispatch({ type: REMOVE_EMPLOYEE_BEGIN });
      try {
        const { data } = await axios.delete(
          `/api/v1/auth/removeEmployee/${employeeId}`,
          { withCredentials: true }
        );
        const { msg } = data;
        dispatch({
          type: REMOVE_EMPLOYEE_SUCCESS,
          payload: { message: msg, employeeId },
        });
      } catch (error) {
        dispatch({
          type: SET_ALERT,
          payload: { message: error.response.data.msg, severity: "error" },
        });
      }
    }
  };

  const editEmployee = async (employeeId) => {
    const confirmed = window.confirm(
      `Are you sure you want to set this employee to inactive?`
    );
    if (confirmed) {
      dispatch({ type: EDIT_EMPLOYEE_BEGIN });
      try {
        const { data } = await axios.patch(
          `/api/v1/auth/updateEmployeeStatus/${employeeId}`,
          null,
          {
            withCredentials: true,
          }
        );
        const { msg, isActive } = data;
        dispatch({
          type: EDIT_EMPLOYEE_SUCCESS,
          payload: { message: msg, employeeId, isActive },
        });
      } catch (error) {
        dispatch({
          type: SET_ALERT,
          payload: { message: error.response.data.msg, severity: "error" },
        });
      }
    }
  };

  const createTask = async ({ employeeId, payload }) => {
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/task/createTask/${employeeId}`,
        payload,
        {
          withCredentials: true,
        }
      );
      const { msg, task } = data;
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: { message: msg, task, severity: "success" },
      });
    } catch (error) {
      dispatch({
        type: SET_ALERT,
        payload: { message: error.response.data.msg, severity: "error" },
      });
    }
  };

  const updateTask = async (taskId) => {
    const confirmed = window.confirm(`Are you sure task is completed?`);
    if (confirmed) {
      dispatch({ type: UPDATE_TASK_BEGIN });
      try {
        const { data } = await axios.patch(
          `/api/v1/task/completeTask/${taskId}`,
          null,
          {
            withCredentials: true,
          }
        );
        const { task, msg } = data;
        dispatch({
          type: UPDATE_TASK_SUCCESS,
          payload: { message: msg, task, severity: "success", taskId },
        });
      } catch (error) {
        dispatch({
          type: SET_ALERT,
          payload: { message: error.response.data.msg, severity: "error" },
        });
      }
    }
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        getEmployeeTask,
        logoutUser,
        getCurrentUser,
        getAllTask,
        getSpecificEmployeeTask,
        getAllEmployee,
        removeEmployee,
        editEmployee,
        handleClose,
        displayAlert,
        logOutUserMessage,
        createTask,
        updateTask,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
