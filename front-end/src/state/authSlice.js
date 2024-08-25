import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Register action
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.register(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
