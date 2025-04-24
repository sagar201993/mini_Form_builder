import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  name: string;
  email: string;
  token: string | null;
  isAuthenticated: boolean;
}

// Initial state when no user is logged in
const initialState: UserState = {
  name: "",
  email: "",
  token: null,
  isAuthenticated: false,
};

// Create a Redux slice for managing user authentication state
const userSlice = createSlice({
  name: "user", // Slice name (used in Redux dev tools and root reducer)
  initialState,

  reducers: {
    // Action to set user details after login or signup
    setUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // Action to clear user details (e.g., on logout)
    clearUser(state) {
      state.name = "";
      state.email = "";
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions to be used in components
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to be included in the root reducer
export default userSlice.reducer;
