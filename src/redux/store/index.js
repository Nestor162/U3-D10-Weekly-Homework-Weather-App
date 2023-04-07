import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "../reducers";

const store = configureStore({
  reducer: coordinatesReducer
});

export default store;
