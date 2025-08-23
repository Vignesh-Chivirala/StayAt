import React, { useEffect, useState } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner, navigate } = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simulate auth check delay
    if (isOwner !== undefined) {
      if (!isOwner) {
        navigate('/')
      }
      setLoading(false)
    }
  }, [isOwner, navigate])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Checking access...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (can make collapsible for mobile) */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
