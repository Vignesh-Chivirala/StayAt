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
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets/heroImage.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative text-white max-w-2xl z-10 mt-20">
        <p className='bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm inline-block'>
          Luxury • Comfort • Elegance
        </p>

        <h1 className='font-playfair text-3xl md:text-6xl font-extrabold leading-tight mt-6 drop-shadow-lg'>
          Your Next Unforgettable Stay Starts Here
        </h1>

        <p className='mt-4 text-sm md:text-lg text-gray-200'>
          Discover breathtaking destinations, world-class amenities, and tailor-made experiences.  
          Whether it’s a romantic escape, a family getaway, or a business retreat — your perfect stay awaits.  
        </p>

        {/* Search Form */}
        <form 
          onSubmit={onSearch} 
          className='mt-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-lg'
        >
          {/* Destination */}
          <div className="flex-1">
            <label htmlFor="destinationInput" className="flex items-center gap-2 text-sm font-medium mb-2">
              <img src={assets.calenderIcon} alt="" className='h-4' />
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          {/* Check In */}
          <div>
            <label htmlFor="checkIn" className="flex items-center gap-2 text-sm font-medium mb-2">
              <img src={assets.calenderIcon} alt="" className='h-4' />
              Check-in
            </label>
            <input 
              id="checkIn"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Check Out */}
          <div>
            <label htmlFor="checkOut" className="flex items-center gap-2 text-sm font-medium mb-2">
              <img src={assets.calenderIcon} alt="" className='h-4' />
              Check-out
            </label>
            <input 
              id="checkOut"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium mb-2">
              Guests
            </label>
            <input 
              id="guests"
              type="number"
              min={1}
              max={4}
              placeholder="2"
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button 
              type="submit"
              className='flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
              px-6 py-3 text-white font-semibold shadow-md transition-all duration-300 w-full md:w-auto'
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
