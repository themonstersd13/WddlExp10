import React, { useState, useContext } from 'react'
import api from '../services/api'
import AuthContext from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      const res = await api.post('/auth/signup', { username: form.username, password: form.password })
      login(res.data.token)
      nav('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-6 bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-center text-2xl font-bold">Signup</h2>
      {error && <p className="text-red-400 text-center">{error}</p>}
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg placeholder-gray-400 text-gray-100"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg placeholder-gray-400 text-gray-100"
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg placeholder-gray-400 text-gray-100"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-2xl font-semibold transition"
      >
        Signup
      </button>
    </form>
  )
}
