import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for User and Expense
interface Global {
  message: string;
  type: string;
  branches: [{
    branch: string;
  }]
}

interface GlobalState {
  message: string;
  type?: string;
  branches: Array<Global>;
}

const initialState: GlobalState = {
  message: "",
  type: "",
  branches: []
};

// Create slice with TypeScript
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalMessage: (
      state,
      action: PayloadAction<{ users: Global[]; message: string; type: string }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    }
  },
});

// Export actions & reducer
export const { globalMessage } = globalSlice.actions;
export default globalSlice.reducer;
