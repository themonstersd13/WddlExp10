import React from 'react'

export default function CommentList({ comments }) {
  return (
    <div className="mt-4 space-y-2">
      {comments.map((c) => (
        <div key={c._id} className="border border-gray-700 p-3 rounded-xl bg-gray-800">
          <p className="text-sm text-gray-300">{c.text}</p>
          <p className="text-xs text-gray-500 mt-1">— {c.author.username}</p>
        </div>
      ))}
    </div>
  )
}