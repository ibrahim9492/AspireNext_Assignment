// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import collegesReducer from "../features/colleges/collegesSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import themeReducer from "../features/theme/themeSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    colleges: collegesReducer,
    theme: themeReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
  },
});
