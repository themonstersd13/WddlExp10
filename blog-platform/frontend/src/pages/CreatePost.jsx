import React, { useState, useContext, useEffect } from 'react'
import api from '../services/api'
import AuthContext from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function PostForm({ edit }) {
  const { token } = useContext(AuthContext)
  const [form, setForm] = useState({ title: '', content: '' })
  const nav = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (edit) api.get(`/posts/${id}`).then((res) => setForm({ title: res.data.title, content: res.data.content }))
  }, [edit, id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    if (edit) await api.put(`/posts/${id}`, form, { headers: { 'x-auth-token': token } })
    else await api.post('/posts', form, { headers: { 'x-auth-token': token } })
    nav(edit ? `/posts/${id}` : '/')
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto space-y-6 bg-gray-800 p-6 rounded-2xl shadow">
      <input name="title" value={form.title} onChange={onChange} placeholder="Title" className="w-full bg-gray-700 border-gray-600 border p-3 rounded-lg text-gray-100" />
      <textarea name="content" value={form.content} onChange={onChange} rows="8" placeholder="Content" className="w-full bg-gray-700 border-gray-600 border p-3 rounded-lg text-gray-100"></textarea>
      <button type="submit" className={`${edit ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500'} text-white py-3 rounded-2xl font-semibold transition w-full`}>        
        {edit ? 'Save Changes' : 'Create Post'}
      </button>
    </form>
  )
}