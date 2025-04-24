import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import formReducer from "./formState/formSlice";
import userReducer from "./authuserState/userSlice";
import { formApi } from "../services/publishFormApi";
import { authApi } from "../services/authApi";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  [formApi.reducerPath]: formApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form", "user"], // persist user too
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(formApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
