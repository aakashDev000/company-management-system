import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (companyId, thunkAPI) => {
    try {
      const response = await employeeService.getEmployees(companyId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData, thunkAPI) => {
    try {
      const response = await employeeService.createEmployee(employeeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employeeData, thunkAPI) => {
    try {
      console.log("employeeData****", employeeData);
      const response = await employeeService.updateEmployee(employeeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, thunkAPI) => {
    try {
      await employeeService.deleteEmployee(employeeId);
      return employeeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployeeHierarchy = createAsyncThunk(
  "employee/fetchEmployeeHierarchy",
  async (employeeId, thunkAPI) => {
    try {
      const response = await employeeService.getEmployeeHierarchy(employeeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(fetchEmployeeHierarchy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeHierarchy.fulfilled, (state, action) => {
        state.loading = false;
        state.hierarchy = action.payload;
      })
      .addCase(fetchEmployeeHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
