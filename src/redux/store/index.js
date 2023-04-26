import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import indexReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, indexReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
