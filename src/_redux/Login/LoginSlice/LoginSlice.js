import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  authToken: undefined,
  valid: false
};

export const LoginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.userName;
      state.authToken = action.payload.authToken;
      state.valid = action.payload.valid;
    },
  },
});
