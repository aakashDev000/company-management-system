import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import employeeReducer from "./employeeSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    employee: employeeReducer,
    dashboard: dashboardReducer,
  },
});
