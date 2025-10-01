// src/features/reviews/reviewsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, { rejectWithValue }) => {
  try {
    const resp = await axios.get("/reviews");
    const data = resp.data.data || resp.data || [];
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addReview = createAsyncThunk("reviews/addReview", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axios.post("/reviews", payload);
    const data = resp.data.data || resp.data;
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const slice = createSlice({
  name: "reviews",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchReviews.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchReviews.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
     .addCase(fetchReviews.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error?.message; })
     .addCase(addReview.fulfilled, (s, a) => { s.list.unshift(a.payload); });
  }
});

export default slice.reducer;
