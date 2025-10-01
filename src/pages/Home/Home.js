// src/pages/Home/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const nav = useNavigate();
  return (
    <main className="home-wrap">
      <h1>Welcome to College Dashboard</h1>
      <p>Browse colleges, add favorites and share reviews — sign up to participate.</p>
      <button onClick={() => nav("/colleges")}>Get Started</button>
    </main>
  );
};

export default Home;
