// src/components/Loader/index.js
import React from "react";
import "./index.css";

const Loader = () => (
  <div className="loader-wrap" role="status" aria-live="polite">
    <div className="spinner" />
  </div>
);

export default Loader;
