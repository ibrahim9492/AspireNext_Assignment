import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColleges } from "./collegesSlice";
import { fetchFavorites, addFavorite, removeFavorite } from "../favorites/favoritesSlice";
import CollegeCard from "../../components/CollegeCard";
import Loader from "../../components/Loader";
import "./colleges.css";

const Colleges = () => {
  const dispatch = useDispatch();
  const { list: colleges, loading, error } = useSelector(s => s.colleges);
  const { list: favorites } = useSelector(s => s.favorites);
  const token = useSelector(s => s.auth.token);

  const [filters, setFilters] = useState({ search:"", location:"", course:"", minFee:"", maxFee:"", sort:"" });

  const load = useCallback(() => {
    const payload = {};
    if (filters.search) payload.search = filters.search;
    if (filters.location) payload.location = filters.location;
    if (filters.course) payload.course = filters.course;
    if (filters.minFee) payload.minFee = filters.minFee;
    if (filters.maxFee) payload.maxFee = filters.maxFee;
    if (filters.sort) payload.sort = filters.sort;

    dispatch(fetchColleges(payload));
    if (token) dispatch(fetchFavorites());
  }, [dispatch, filters, token]);

  useEffect(() => { load(); }, [load]);

  const handleChange = (e) => setFilters(p => ({...p, [e.target.name]: e.target.value}));
  const handleReset = () => setFilters({ search:"", location:"", course:"", minFee:"", maxFee:"", sort:"" });

  const isFavorite = (collegeId) => favorites.some(f => f.collegeId?._id === collegeId);

  const handleFavorite = (collegeId) => {
    if (!token) {
      if (window.confirm("You need an account to add favorites. Create an account now?")) 
        window.location.href="/register";
      return;
    }

    const fav = favorites.find(f => f.collegeId?._id === collegeId);
    if (fav) dispatch(removeFavorite(fav._id));  // Remove favorite by its id
    else dispatch(addFavorite(collegeId));       // Add to favorites
  };

  return (
    <main className="page-wrap">
      <h2>Colleges</h2>

      {/* Filters */}
      <section className="filters">
        <input name="search" value={filters.search} onChange={handleChange} placeholder="Search college name" />
        <select name="location" value={filters.location} onChange={handleChange}>
          <option value="">All locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
        </select>
        <select name="course" value={filters.course} onChange={handleChange}>
          <option value="">All courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electronics">Electronics</option>
          <option value="MBA">MBA</option>
          <option value="MBBS">MBBS</option>
        </select>
        <input name="minFee" value={filters.minFee} onChange={handleChange} placeholder="Min Fee" type="number" />
        <input name="maxFee" value={filters.maxFee} onChange={handleChange} placeholder="Max Fee" type="number" />
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="">Sort</option>
          <option value="lowtohigh">Fee: Low → High</option>
          <option value="hightolow">Fee: High → Low</option>
        </select>
        <button className="reset" onClick={handleReset}>Reset</button>
      </section>

      {/* Colleges */}
      {loading ? <Loader /> : error ? <div className="err">{error}</div> : (
        <>
          {colleges.length === 0 ? <div className="no-data">No colleges found.</div> : (
            <section className="grid">
              {colleges.map(c => (
                <CollegeCard 
                  key={c._id} 
                  college={c} 
                  onFavorite={handleFavorite} 
                  isFavorite={isFavorite(c._id)} 
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Colleges;
