import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarUrl: null,
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload.avatarUrl;
    },
    clearAvatar: () => initialState,
  },
});

export const { setAvatar, clearAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;
