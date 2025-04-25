import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import AuthContext from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const [form, setForm] = useState({ title: '', content: '' })
  const nav = useNavigate()

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setForm({ title: res.data.title, content: res.data.content }))
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    await api.put(`/posts/${id}`, form, { headers: { 'x-auth-token': token } })
    nav(`/posts/${id}`)
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto space-y-4">
      <input name="title" value={form.title} onChange={onChange} className="w-full border p-2 rounded" />
      <textarea name="content" value={form.content} onChange={onChange} rows="6" className="w-full border p-2 rounded"></textarea>
      <button type="submit" className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition">
        Save
      </button>
    </form>
  )
}
