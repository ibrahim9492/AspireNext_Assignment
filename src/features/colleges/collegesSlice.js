// src/features/colleges/collegesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Async thunk for fetching colleges with optional filters
export const fetchColleges = createAsyncThunk(
  "colleges/fetchColleges",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const resp = await axios.get(`/colleges${params ? `?${params}` : ""}`);

      // Normalize response
      const data = Array.isArray(resp.data)
        ? resp.data
        : resp.data?.data || [];

      // ✅ If no colleges found → return empty array, not error
      if (!data || data.length === 0) {
        return [];
      }

      return data;
    } catch (err) {
      // Only reject real API/server errors
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch colleges"
      );
    }
  }
);

const collegesSlice = createSlice({
  name: "colleges",
  initialState: {
    list: [],
    loading: false,
    error: null,
    message: null, // for "No colleges found"
  },
  reducers: {
    clearCollegesMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;

        // ✅ If no results, set message
        if (action.payload.length === 0) {
          state.message = "No colleges found for the applied filters.";
        }
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Something went wrong";
      });
  },
});

export const { clearCollegesMessage } = collegesSlice.actions;
export default collegesSlice.reducer;
