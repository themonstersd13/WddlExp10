import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AuthContext from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { fade } from '../animations/fade'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      variants={fade}
      initial="hidden"
      animate="show"
      className="bg-gray-800 text-gray-100 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">
          MyBlog
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
        <div className={`md:flex space-x-4 ${open ? 'block' : 'hidden'}`}>
          {user ? (
            <>
              <span className="px-2">Hello, {user.user.username}</span>
              <button onClick={logout} className="underline px-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400 px-2">
                Login
              </Link>
              <Link to="/signup" className="hover:text-indigo-400 px-2">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}