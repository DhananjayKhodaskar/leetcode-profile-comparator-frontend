import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/slices/userSlice";
import groupReducer from "@/slices/groupSlice";
import { authApi } from "@/services/auth";
import { groupApi } from "@/services/group";
import { userApi } from "@/services/user";
import { challengeApi } from "@/services/challenge";

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
    [groupApi.reducerPath]: groupApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [challengeApi.reducerPath]: challengeApi.reducer,
    user: persistedUserReducer,
    group: groupReducer,
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
    }).concat(
      authApi.middleware,
      groupApi.middleware,
      userApi.middleware,
      challengeApi.middleware
    ), // Add groupApi middleware here
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
