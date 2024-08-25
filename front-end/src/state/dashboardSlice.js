import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";

export const fetchCompaniesCount = createAsyncThunk(
  "company/fetchCompaniesCount",
  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.getCompaniesCount();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployeesCount = createAsyncThunk(
  "company/fetchEmployeesCount",
  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.getEmployeesCount();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployeesByCompanyCount = createAsyncThunk(
  "company/fetchEmployeesByCompanyCount",
  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.getEmployeesByCompanyCount();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "dashboard",
  initialState: {
    companiesCount: 0,
    employeesCount: 0,
    employeesByCompanyCount: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompaniesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.companiesCount = action.payload;
      })
      .addCase(fetchCompaniesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployeesCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.employeesCount = action.payload;
      })
      .addCase(fetchEmployeesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployeesByCompanyCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeesByCompanyCount.fulfilled, (state, action) => {
        state.loading = false;
        state.employeesByCompanyCount = action.payload;
      })
      .addCase(fetchEmployeesByCompanyCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
