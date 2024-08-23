import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: localStorage.getItem("userRole") || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user.role = action.payload.role;
      state.user.isAuthenticated = true;
      localStorage.setItem("userRole", action.payload.role);
      localStorage.setItem("isAuthenticated", "true");
    },
    clearUser(state) {
      state.user.role = null;
      state.user.isAuthenticated = false;
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { loginUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
