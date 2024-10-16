import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import { authApi } from "@/services/auth";
import storage from "redux-persist/lib/storage";
import userReducer from "@/slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
        ],
      },
    }).concat(authApi.middleware),
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
