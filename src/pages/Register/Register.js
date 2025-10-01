// src/pages/Register/Register.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(s => s.auth);
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  useEffect(() => { if (token) navigate("/colleges"); }, [token, navigate]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); dispatch(register(form)); };

  return (
    <main className="auth-wrap">
      <h2>Create Account</h2>
      {error && <div className="err">{typeof error === "string" ? error : JSON.stringify(error)}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
      </form>
    </main>
  );
};

export default Register;
