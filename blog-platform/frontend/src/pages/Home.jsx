import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import PostCard from '../components/PostCard'
import { Link } from 'react-router-dom'
import { PlusCircle, LogIn, UserPlus } from 'lucide-react'
import AuthContext from '../contexts/AuthContext'

export default function Home() {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data))
  }, [])

  return (
    <>
      <div className="flex justify-center space-x-4 mb-6">
        <Link to="/create" className="flex items-center space-x-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition">
          <PlusCircle /> <span>Create Post</span>
        </Link>
        {!user && (
          <>
            <Link to="/login" className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition">
              <LogIn /> <span>Login</span>
            </Link>
            <Link to="/signup" className="flex items-center space-x-1 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition">
              <UserPlus /> <span>Signup</span>
            </Link>
          </>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}