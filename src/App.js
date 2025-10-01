// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./app/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Colleges from "./features/colleges/Colleges";
import Favorites from "./features/favorites/Favorites";
import Reviews from "./features/reviews/Reviews";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
