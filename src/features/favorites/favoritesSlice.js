// src/features/favorites/favoritesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchFavorites = createAsyncThunk("favorites/fetchFavorites", async (_, { rejectWithValue }) => {
  try {
    const resp = await axios.get("/favorites");
    const data = resp.data.data || resp.data || [];
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addFavorite = createAsyncThunk("favorites/addFavorite", async (collegeId, { rejectWithValue }) => {
  try {
    const resp = await axios.post("/favorites", { collegeId });
    const data = resp.data.data || resp.data;
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const removeFavorite = createAsyncThunk("favorites/removeFavorite", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/favorites/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const slice = createSlice({
  name: "favorites",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchFavorites.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchFavorites.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
     .addCase(fetchFavorites.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error?.message; })

     .addCase(addFavorite.fulfilled, (s, a) => { s.list.push(a.payload); })
     .addCase(removeFavorite.fulfilled, (s, a) => { s.list = s.list.filter(i => i._id !== a.payload); });
  }
});

export default slice.reducer;
