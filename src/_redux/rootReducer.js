import { combineReducers } from "@reduxjs/toolkit";
import { langCodeSlice } from "./Language/languageSlice";
import { LoginSlice } from "./Login/LoginSlice/LoginSlice";

export const rootReducer = combineReducers({
  auth: LoginSlice.reducer,
  langCode: langCodeSlice.reducer,
});