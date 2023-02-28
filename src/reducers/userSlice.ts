import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

// Define a type for the slice state
interface UserState {
  user: UserInfo;
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {} as UserInfo,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    unset: (state) => {
      state.user = {} as UserInfo;
      state.isAuthenticated = false;
    },
  },
});

export const { set, unset } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authenticatedUser = (state: RootState) => state.user;

export default userSlice.reducer;
