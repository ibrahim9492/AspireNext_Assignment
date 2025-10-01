// authentication slice (register/login/logout)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Async thunks
export const register = createAsyncThunk("auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axios.post("/users/register", payload);
      return resp.data.data || resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  });

export const login = createAsyncThunk("auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axios.post("/users/login", payload);
      return resp.data.data || resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  });

const token = localStorage.getItem("token") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: { token, user: null, loading: false, error: null },
  reducers: {
    logoutLocal: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, a) => {
        s.loading = false;
        // backend should return token and user
        s.token = a.payload.token || a.payload;
        s.user = a.payload.user || null;
        if (a.payload.token) localStorage.setItem("token", a.payload.token);
      })
      .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token || a.payload;
        s.user = a.payload.user || null;
        if (a.payload.token) localStorage.setItem("token", a.payload.token);
      })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  }
});

export const { logoutLocal, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
