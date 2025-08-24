import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);

    await axios.post(
      '/api/user/store-recent-search',
      { recentSearchedCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [...prevSearchedCities, destination];
      if (updatedSearchedCities.length > 3) updatedSearchedCities.shift();
      return updatedSearchedCities;
    });
  };

  return (
    <div className='relative h-screen flex items-center justify-start px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/src/assets/heroImage.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative text-white max-w-4xl z-10 mt-20"> {/* widened container */}
        <p className='bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm inline-block'>
          Luxury • Comfort • Elegance
        </p>

        <h1 className='font-playfair text-4xl md:text-6xl font-extrabold leading-tight mt-6 drop-shadow-lg'>
          Your Next Unforgettable Stay Starts Here
        </h1>

        <p className='mt-4 text-sm md:text-lg text-gray-200'>
          Discover breathtaking destinations, world-class amenities, and tailor-made experiences.  
          Whether it’s a romantic escape, a family getaway, or a business retreat — your perfect stay awaits.  
        </p>

        {/* Search Form */}
        <form 
          onSubmit={onSearch} 
          className='mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-2xl 
                     grid grid-cols-1 md:grid-cols-5 gap-6 items-end w-full'  /* full width */
        >
          {/* Destination */}
          <div className="flex flex-col">
            <label htmlFor="destinationInput" className="text-sm font-semibold mb-2 text-gray-700">
              Where to?
            </label>
            <input 
              list='destinations'
              id="destinationInput"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              type="text" 
              placeholder="Search a city or destination"
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 
                         px-4 py-3 text-sm text-gray-900 placeholder-gray-500
                         outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          {/* Check In */}
          <div className="flex flex-col">
            <label htmlFor="checkIn" className="text-sm font-semibold mb-2 text-gray-700">
              Check-in
            </label>
            <input 
              id="checkIn"
              type="date"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 
                         px-4 py-3 text-sm text-gray-900 outline-none 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col">
            <label htmlFor="checkOut" className="text-sm font-semibold mb-2 text-gray-700">
              Check-out
            </label>
            <input 
              id="checkOut"
              type="date"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 
                         px-4 py-3 text-sm text-gray-900 outline-none 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label htmlFor="guests" className="text-sm font-semibold mb-2 text-gray-700">
              Guests
            </label>
            <input 
              id="guests"
              type="number"
              min={1}
              max={4}
              placeholder="2"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 
                         px-4 py-3 text-sm text-gray-900 outline-none 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* Search Button */}
          <div className="flex">
            <button 
              type="submit"
              className='flex items-center justify-center gap-2 rounded-xl 
                         bg-gradient-to-r from-indigo-600 to-indigo-700 
                         hover:from-indigo-700 hover:to-indigo-800 
                         px-6 py-3 text-white font-semibold shadow-md 
                         transition-all duration-200 w-full h-full'
            >
              <img src={assets.searchIcon} alt="searchIcon" className='h-5' />
              <span>Find Stays</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
