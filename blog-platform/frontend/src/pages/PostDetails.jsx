import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import AuthContext from '../contexts/AuthContext'
import { useParams, Link } from 'react-router-dom'
import CommentList from '../components/CommentList'

export default function PostDetails() {
  const { id } = useParams()
  const { token, user } = useContext(AuthContext)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data))
    api.get(`/comments/${id}`).then((res) => setComments(res.data))
  }, [id])

  const addComment = async () => {
    await api.post(`/comments/${id}`, { text }, { headers: { 'x-auth-token': token } })
    const res = await api.get(`/comments/${id}`)
    setComments(res.data)
    setText('')
  }

  if (!post) return <div className="text-center p-10">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-gray-800 p-6 rounded-2xl shadow">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-400">By {post.author.username}</p>
      <p className="text-gray-100 whitespace-pre-line">{post.content}</p>
      {user && user.user.id === post.author._id && (
        <Link to={`/edit/${id}`} className="inline-block text-indigo-400 underline">
          Edit Post
        </Link>
      )}
      <hr className="border-gray-700" />
      <div>
        <h2 className="text-2xl font-semibold">Comments</h2>
        {user && (
          <div className="space-y-4 py-4">
            <textarea
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 border p-3 rounded-lg text-gray-100"
            />
            <button onClick={addComment} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-2xl transition">
              Add Comment
            </button>
          </div>
        )}
        <CommentList comments={comments} />
      </div>
    </div>
  )
}
