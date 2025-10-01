// src/features/reviews/Reviews.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addReview } from "./reviewsSlice";
import { fetchColleges } from "../colleges/collegesSlice";
import Loader from "../../components/Loader";

const Reviews = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(s => s.reviews);
  const { list: colleges } = useSelector(s => s.colleges);
  const token = useSelector(s => s.auth.token);

  const [form, setForm] = useState({ college: "", rating: 5, comment: "" });

  useEffect(() => {
    dispatch(fetchReviews());
    if (colleges.length === 0) dispatch(fetchColleges());
  }, [  dispatch, colleges.length]);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      if (window.confirm("You need an account to add reviews. Create account now?")) window.location.href="/register";
      return;
    }
    if (!form.college) return alert("Select a college");
    dispatch(addReview(form));
    setForm({ college:"", rating:5, comment:"" });
  };

  return (
    <main style={{ maxWidth:1100, margin:"1rem auto", padding:"0 1rem" }}>
      <h2>Reviews</h2>

      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        <select name="college" value={form.college} onChange={handleChange} required>
          <option value="">Select College</option>
          {colleges.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} />
        <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Comment (optional)" />
        <button type="submit" style={{ width:160, padding:8, background:"#0d6efd", color:"#fff", border:"none", borderRadius:6 }}>Submit Review</button>
      </form>

      {loading ? <Loader /> : error ? <div style={{color:"#c23"}}>{error}</div> : (
        <section style={{ display:"grid", gap:12 }}>
          {list.length === 0 ? <div className="no-data">No reviews yet.</div> : list.map(r => (
            <article key={r._id} style={{ border:"1px solid #eee", padding:12, borderRadius:8 }}>
              <div style={{ fontWeight:700 }}>{r.college?.name || r.college}</div>
              <div>Rating: {r.rating} ⭐</div>
              <div style={{ color:"#444" }}>{r.comment}</div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Reviews;
