import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  langCode: "en",
};

export const langCodeSlice = createSlice({
  name: "langCode",
  initialState: initialState,
  reducers: {
    setLangCode: (state, action) => {
      state.langCode = action.payload;
    },
  },
});
