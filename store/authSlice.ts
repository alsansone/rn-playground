import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  user: null,
  status: "idle",
};

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async ({ email, password }) => {
  // await your real API...
  // return the user object on success
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { id: 1, name: "Adam" };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
