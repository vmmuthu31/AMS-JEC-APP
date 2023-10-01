import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for the web
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuration for redux-persist
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "role", "email", "department"], // specify which state pieces to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
