import {
  CLEAR_ALERT,
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
  LOGOUT_USER,
  REMOVE_EMPLOYEE_BEGIN,
  REMOVE_EMPLOYEE_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SET_ALERT,
  UPDATE_TASK_BEGIN,
  UPDATE_TASK_SUCCESS,
} from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT: {
      const { message, severity } = action.payload;
      return { ...state, message, severity, open: true, isLoading: false };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        message: "",
        severity: "success",
        open: false,
        isLoading: false,
      };
    }
    case SETUP_USER_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SETUP_USER_SUCCESS: {
      const { user, role, message, severity } = action.payload;
      return {
        ...state,
        user,
        role,
        message,
        severity,
        isLoading: false,
        open: true,
      };
    }
    case LOGOUT_USER: {
      return {
        ...initialState,
        isLoading: false,
        userLoading: false,
        message: action.payload.message,
        severity: action.payload.severity,
        open: true,
      };
    }
    case GET_CURRENT_USER_BEGIN: {
      return {
        ...state,
        userLoading: true,
        showAlert: false,
      };
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        userLoading: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    }
    case GET_EMPLOYEE_TASK_BEGIN: {
      return {
        ...state,
        showAlert: false,
        isLoading: true,
      };
    }
    case GET_EMPLOYEE_TASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
        user: action.payload.user,
      };
    }
    case GET_EMPLOYEE_SPECIFIC_TASK_BEGIN: {
      return {
        ...state,
        showAlert: false,
        isLoading: true,
      };
    }
    case GET_EMPLOYEE_SPECIFIC_TASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
        user: action.payload.user,
      };
    }
    case GET_EMPLOYEE_BEGIN: {
      return {
        ...state,
        showAlert: false,
        isLoading: true,
      };
    }
    case GET_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        employees: action.payload.employees,
      };
    }
    case REMOVE_EMPLOYEE_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REMOVE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload.employeeId
        ),
        message: action.payload.message,
        open: true,
        severity: "success",
      };
    }
    case EDIT_EMPLOYEE_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EDIT_EMPLOYEE_SUCCESS: {
      const updatedEmployees = state.employees.map((employee) =>
        employee._id === action.payload.employeeId
          ? { ...employee, isActive: action.payload.isActive }
          : employee
      );
      return {
        ...state,
        isLoading: false,
        employees: updatedEmployees,
        message: action.payload.message,
        open: true,
        severity: "info",
      };
    }
    case CREATE_TASK_BEGIN: {
      return {
        ...state,
        isLoading: true,
        message: "",
      };
    }
    case CREATE_TASK_SUCCESS: {
      const { task, message } = action.payload;
      return {
        ...state,
        tasks: [...state.tasks, task],
        isLoading: false,
        message,
        severity: action.payload.severity,
        open: true,
      };
    }
    case UPDATE_TASK_BEGIN: {
      return {
        ...state,
        isLoading: true,
        message: "",
      };
    }
    case UPDATE_TASK_SUCCESS: {
      const { message, taskId } = action.payload;
      const updatedTask = state.tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: action.payload.task.status,
              completedDate: action.payload.task.completedDate,
            }
          : task
      );
      return {
        ...state,
        tasks: updatedTask,
        isLoading: false,
        message,
        severity: action.payload.severity,
        open: true,
      };
    }
    default:
      throw new Error(`no such action ${action.type}`);
  }
};

export default reducer;
