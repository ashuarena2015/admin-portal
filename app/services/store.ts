import { configureStore, Middleware } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import api from "./middlewares/apiRequest";
// import error from "./middlewares/apiRequest"; // Ensure this points to the correct middleware file

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api as Middleware),
});

// ✅ Define TypeScript types for the Redux store
export type RootState = ReturnType<typeof store.getState>; // State type
export type AppDispatch = typeof store.dispatch; // ✅ Define AppDispatch

export default store;
