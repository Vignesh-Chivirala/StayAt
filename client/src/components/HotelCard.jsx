import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const HotelCard = ({ room, index }) => {
  const { currency } = useAppContext()

  return (
    <Link 
      to={'/rooms/' + room._id} 
      onClick={() => scrollTo(0, 0)} 
      key={room._id}
      className="relative max-w-72 w-full rounded-2xl overflow-hidden bg-white text-gray-600 shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img 
          src={room.images[0]} 
          alt="hotel-img" 
          draggable="false" 
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Badge */}
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
          Best Seller
        </p>
      )}

      {/* Card Body */}
      <div className="p-4 pt-5">
        
        {/* Hotel Name + Rating */}
        <div className="flex items-center justify-between">
          <p className="font-playfair text-lg font-semibold text-gray-900 line-clamp-1">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" /> 
            {room.rating || "4.5"}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm mt-1 text-gray-500">
          <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
          <span className="truncate">{room.hotel.address}</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl font-semibold text-gray-900">
              {currency}{room.pricePerNight}
            </span>
            <span className="text-sm text-gray-500"> /night</span>
          </p>
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
