import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";
import userReducer from "@/slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
setupListeners(store.dispatch);
