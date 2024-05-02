import { createStore } from 'redux'
import { rootReducer } from './_redux/rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: rootReducer,
},
composeWithDevTools()
);
export default store