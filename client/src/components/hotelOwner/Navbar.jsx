import React from 'react'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-12 py-4 
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
      shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90 transition-all duration-300">
      
      {/* Brand Name */}
      <Link to="/" className="group relative">
        <span className="text-white text-2xl font-extrabold tracking-wide font-sans 
          drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          Stay<span className="text-pink-200">At</span>
        </span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 ring-2 ring-white shadow-md rounded-full hover:scale-110 transition-transform duration-300"
            }
          }}
        />
      </div>
    </div>
  )
}

export default Navbar
