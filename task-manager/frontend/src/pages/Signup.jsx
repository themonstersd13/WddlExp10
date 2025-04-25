// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input name="name" type="text" placeholder="Name" value={form.name}
          onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400" required />
        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400" required />
        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-green-600 hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
