import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListRoom = () => {
  const { axios, getToken, user } = useAppContext()
  const [rooms, setRooms] = useState([])

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      if (data.success) {
        setRooms(data.rooms)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (roomId) => {
    const { data } = await axios.post(
      '/api/rooms/toggle-availability',
      { roomId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    )
    if (data.success) {
      toast.success(data.message)
      fetchRooms()
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRooms()
    }
  }, [user])

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="Easily manage your listed rooms. Update availability and pricing to maximize your revenue potential."
      />

      <p className="text-gray-500 mt-8 text-sm font-medium">Total Rooms: {rooms.length}</p>

      <div className="w-full max-w-4xl mt-3">
        {rooms.length === 0 ? (
          <div className="text-center py-12 border rounded-lg text-gray-500 bg-gray-50">
            No rooms listed yet. Start by adding your first room 🚪✨
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-semibold">Name</th>
                  <th className="py-3 px-4 text-gray-800 font-semibold max-sm:hidden">Facility</th>
                  <th className="py-3 px-4 text-gray-800 font-semibold">Price / Night</th>
                  <th className="py-3 px-4 text-gray-800 font-semibold text-center">Availability</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {rooms.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-gray-700">{item.roomType}</td>
                    <td className="py-3 px-4 text-gray-500 max-sm:hidden">
                      {item.amenities.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">₹{item.pricePerNight}</td>
                    <td className="py-3 px-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          onChange={() => toggleAvailability(item._id)}
                          checked={item.isAvailable}
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListRoom
