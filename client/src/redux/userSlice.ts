import { UserInfoTypes } from "../types/userType";
import axiosInstance from "../axiosConfig/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTypes = {
  user: UserInfoTypes | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  success: boolean;
  message: string | null;
};

const initialState: InitialStateTypes = {
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  success: false,
  message: null,
};

export const getUserData = createAsyncThunk<UserInfoTypes, void>(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data[0];
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);
export const register = createAsyncThunk(
  "register",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/register", values);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", values);
      localStorage.setItem("token", response.data.access_token);
      return response.data;

    } catch (error: any) {
      console.error("Err", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfoTypes | null>) => {
      state.user = action.payload;
    },

    resetUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
