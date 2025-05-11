import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for User and Expense
interface User {
  id?: string;
  password?: string;
  email?: string;
  [key: string]: any;
}

interface UsersState {
  account: object;
  isLoading: boolean;
  loginUser: User;
}

// Initial state with TypeScript
const initialState: UsersState = {
  account: {},
  isLoading: true,
  loginUser: {},
};

// Create slice with TypeScript
const accountsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    accountCreation: (state, action: PayloadAction<{ user: User }>) => {
      state.account = action.payload.user;
    },
    getLoginDetails: (state, action: PayloadAction<{ user: User }>) => {
      state.loginUser = action.payload.user;
    },
    isLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = action.payload.loading;
    },
  },
});

// Export actions & reducer
export const { accountCreation, isLoading, getLoginDetails } =
accountsSlice.actions;
export default accountsSlice.reducer;
