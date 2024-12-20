import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: localStorage.getItem("fullName") || "", // Load full name from storage
  authToken: localStorage.getItem("authToken") || null, // Load token from storage
  isVerified: localStorage.getItem("isVerified") === "true" || false, // Convert to boolean
  // Password reset state
  loading: false,
  success: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { fullName, authToken, isVerified } = action.payload;
      state.fullName = fullName;
      state.authToken = authToken;
      state.isVerified = isVerified;

      // Persist to localStorage
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("isVerified", isVerified.toString());
    },
    resetUser(state) {
      state.fullName = "";
      state.authToken = null;
      state.isVerified = false;

      // Clear localStorage
      localStorage.removeItem("fullName");
      localStorage.removeItem("authToken");
      localStorage.removeItem("isVerified");
    },
    setVerified(state, action) {
      state.isVerified = action.payload;
      localStorage.setItem("isVerified", action.payload.toString()); // Persist verification status
    },
    // Password reset actions
    resetPasswordRequest(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    resetPasswordFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  setUser,
  resetUser,
  setVerified,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = userSlice.actions;

export default userSlice.reducer;
