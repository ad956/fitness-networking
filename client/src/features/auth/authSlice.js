import { createSlice } from "@reduxjs/toolkit";

const storedAuthData = JSON.parse(localStorage.getItem("authData"));
const initialState = storedAuthData
  ? {
      accessToken: storedAuthData.accessToken,
      userRole: storedAuthData.userRole,
    }
  : {
      auth: {
        accessToken: null,
        userRole: null,
      },
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      const { accessToken, userRole } = action.payload;
      state.accessToken = accessToken;
      state.userRole = userRole;
      localStorage.setItem(
        "authData",
        JSON.stringify({ accessToken, userRole })
      );
    },
    removeAuthData(state) {
      state.accessToken = null;
      state.userRole = null;
      localStorage.removeItem("authData");
    },
  },
});

export const { setAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
