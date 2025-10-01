// src/components/CollegeCard.js
import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const CollegeCard = ({ college, onFavorite, isFavorite }) => {
  // ✅ Access theme safely
  const theme = useSelector((state) => state.theme?.theme || "light");

  return (
    <div className={`college-card ${theme}`}>
      <h3>{college.name}</h3>
      <p><b>Location:</b> {college.location}</p>
      <p><b>Course:</b> {college.course}</p>
      <p><b>Fee:</b> ₹{college.fee}</p>

      <button onClick={() => onFavorite(college._id)}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
};

export default CollegeCard;
