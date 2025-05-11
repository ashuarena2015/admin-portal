import { combineReducers } from "redux";

import accountsReducer from "./accounts";
import globalReducer from "./global";

// Define the RootState type (infer types from reducers)
const appReducer = combineReducers({
  accounts: accountsReducer,
  global: globalReducer,
});

// Define RootState type for TypeScript
export type RootState = ReturnType<typeof appReducer>;

// Root reducer with action and state types
const rootReducer = (state: RootState | undefined, action: any): RootState => {
  return appReducer(state, action);
};

export default rootReducer;
