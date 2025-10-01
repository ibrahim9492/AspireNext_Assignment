import React from "react";
import "./index.css";

export default function FilterBar({ filters, setFilters, onSearch }) {
  return (
    <div className="filter-bar">
      <select
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      >
        <option value="">All Locations</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
      </select>

      <select
        value={filters.course}
        onChange={(e) => setFilters({ ...filters, course: e.target.value })}
      >
        <option value="">All Courses</option>
        <option value="Computer Science">CSE</option>
        <option value="Electronics">ECE</option>
        <option value="MBA">MBA</option>
        <option value="MBBS">MBBS</option>
      </select>

      <input
        type="number"
        placeholder="Min Fee"
        value={filters.minFee}
        onChange={(e) => setFilters({ ...filters, minFee: e.target.value })}
      />

      <input
        type="number"
        placeholder="Max Fee"
        value={filters.maxFee}
        onChange={(e) => setFilters({ ...filters, maxFee: e.target.value })}
      />

      <input
        type="text"
        placeholder="Search college"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="">Sort by Fee</option>
        <option value="lowtohigh">Low → High</option>
        <option value="hightolow">High → Low</option>
      </select>

      <button onClick={onSearch}>Apply</button>
    </div>
  );
}
