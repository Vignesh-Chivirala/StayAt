import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32'>
      
      {/* Section Header */}
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title 
          align='left' 
          title="Exclusive Offers" 
          subTitle="Take advantage of our limited-time deals and curated packages — designed to make every stay unforgettable." 
        />
        <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12 text-indigo-600 hover:text-indigo-800 transition-all'>
          View All Offers
          <img 
            className='group-hover:translate-x-1 transition-all' 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
          />
        </button>
      </div>

      {/* Offer Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full'>
        {exclusiveOffers.map((item) => (
          <div 
            key={item._id} 
            className='relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500'
          >
            {/* Background with zoom on hover */}
            <div 
              className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110' 
              style={{ backgroundImage: `url(${item.image})` }} 
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />

            {/* Discount Tag */}
            <p className='absolute top-4 left-4 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow'>
              {item.priceOff}% OFF
            </p>

            {/* Card Content */}
            <div className='relative z-10 flex flex-col justify-between h-full p-6 text-white'>
              <div>
                <p className='text-2xl font-bold font-playfair drop-shadow-md'>
                  {item.title}
                </p>
                <p className='mt-2 text-sm text-white/90'>{item.description}</p>
                <p className='mt-3 text-xs text-gray-300'>
                  Expires {item.expiryDate}
                </p>
              </div>

              <button className='mt-6 flex items-center gap-2 font-medium text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-md transition-all'>
                View Offer
                <img 
                  className='invert group-hover:translate-x-1 transition-all' 
                  src={assets.arrowIcon} 
                  alt="arrow-icon" 
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers
