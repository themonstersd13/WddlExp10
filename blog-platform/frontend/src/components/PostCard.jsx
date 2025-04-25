import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightCircle } from 'lucide-react'

export default function PostCard({ post }) {
  return (
    <div className="border border-gray-700 p-4 rounded-2xl shadow hover:shadow-2xl transition ease-in-out duration-300 bg-gray-800">
      <h2 className="text-2xl font-semibold mb-2">
        <Link to={`/posts/${post._id}`} className="hover:text-indigo-400 flex items-center">
          {post.title} <ArrowRightCircle className="ml-2" size={20} />
        </Link>
      </h2>
      <p className="text-gray-400 text-sm">By {post.author.username}</p>
    </div>
  )
}