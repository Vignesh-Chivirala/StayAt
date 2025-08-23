import React from 'react'
import { useAppContext } from '../context/AppContext';
import Title from './Title';
import HotelCard from './HotelCard';

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20'>
        
        {/* Section Title */}
        <Title 
          title="Featured Destinations" 
          subTitle="Explore our curated selection of world-class stays, designed to offer unforgettable comfort, luxury, and experiences that last a lifetime." 
        />

        {/* Featured Hotels */}
        <div className='flex flex-wrap items-center justify-center gap-8 mt-16 w-full'>
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => { 
            navigate('/rooms'); 
            scrollTo(0, 0); 
          }} 
          className='mt-16 px-6 py-3 text-sm md:text-base font-semibold rounded-lg 
            bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg 
            transition-all duration-300 cursor-pointer'
        >
          View All Destinations
        </button>
      </div>
    )
  )
}

export default FeaturedDestination
