import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
setupListeners(store.dispatch);
