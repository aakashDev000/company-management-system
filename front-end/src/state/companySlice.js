import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "../services/companyService";

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, thunkAPI) => {
    try {
      const response = await companyService.getCompanies();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyData, thunkAPI) => {
    try {
      const response = await companyService.createCompany(companyData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (companyData, thunkAPI) => {
    try {
      const response = await companyService.updateCompany(companyData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyId, thunkAPI) => {
    try {
      await companyService.deleteCompany(companyId);
      return companyId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company._id === action.payload._id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload
        );
      });
  },
});

export default companySlice.reducer;
