// src/features/favorites/Favorites.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "./favoritesSlice";
import Loader from "../../components/Loader";
import CollegeCard from "../../components/CollegeCard";

const Favorites = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(s => s.favorites);
  const token = useSelector(s => s.auth.token);

  useEffect(() => {
    if (token) dispatch(fetchFavorites());
  }, [dispatch, token]);

  if (!token) {
    return (
      <main style={{ maxWidth:1100, margin:"1rem auto", padding:"0 1rem" }}>
        <h2>Your Favorites</h2>
        <div className="no-data">You need to create an account to add favorites. <a href="/register">Create account</a></div>
      </main>
    );
  }

  if (loading) return <Loader />;
  if (error) return <div className="err" style={{padding:"1rem"}}>{error}</div>;

  return (
    <main style={{ maxWidth:1100, margin:"1rem auto", padding:"0 1rem" }}>
      <h2>Your Favorites</h2>
      {list.length === 0 ? <div className="no-data">No favorites yet.</div> : (
        <section style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
          {list.map(f => <CollegeCard key={f._id} college={f.collegeId} onFavorite={() => dispatch(removeFavorite(f._id))} favoriteMode />)}
        </section>
      )}
    </main>
  );
};

export default Favorites;
