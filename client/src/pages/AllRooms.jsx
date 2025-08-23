import { useState, useMemo } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import StarRating from '../components/StarRating'
import { useSearchParams } from 'react-router-dom'

const CheckBox = ({ label, selected = true, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm hover:text-indigo-600 transition-colors">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="accent-indigo-600"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = true, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm hover:text-indigo-600 transition-colors">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
      className="accent-indigo-600"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { facilityIcons, navigate, rooms, currency } = useAppContext();
  const [openFilters, setOpenFilters] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('');

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[type].push(value);
      } else {
        updated[type] = updated[type].filter((item) => item !== value);
      }
      return updated;
    });
  };

  const handleSortChange = (option) => setSelectedSort(option);

  const matchesRoomType = (room) =>
    selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);

  const matchesPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });

  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High') return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'Price High to Low') return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({ roomType: [], priceRange: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-10">
      {/* Left Section - Rooms */}
      <div className="flex-1">
        <div className="flex flex-col items-start text-left mb-8">
          <h1 className="text-4xl md:text-[40px] font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
            Hotel Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Discover stays that blend comfort, luxury, and convenience — carefully curated to make your trip unforgettable.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-8 gap-6 border-b border-gray-200 last:border-0 transition-transform hover:-translate-y-1 hover:shadow-lg rounded-xl"
          >
            <img
              title="View Room Details"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              className="max-h-65 md:w-1/2 rounded-xl shadow-md object-cover cursor-pointer"
            />
            <div className="md:w-1/2 flex flex-col gap-3">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-900 text-2xl font-semibold font-playfair cursor-pointer hover:text-indigo-600 transition-colors"
                title="View Room Details"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-1 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>

              <div className="flex flex-wrap items-center mt-3 mb-4 gap-3">
                {room.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition"
                  >
                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-semibold text-indigo-700">${room.pricePerNight} / night</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Filters */}
      <div className="bg-white/70 backdrop-blur-lg w-80 border border-gray-200 rounded-2xl shadow-md text-gray-700 max-lg:mb-8">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-semibold text-gray-800">Filters</p>
          <div className="text-xs cursor-pointer">
            <span onClick={() => setOpenFilters(!openFilters)} className="lg:hidden text-indigo-600 font-medium">
              {openFilters ? "Hide" : "Show"}
            </span>
            <span onClick={clearFilters} className="hidden lg:block text-indigo-600 font-medium hover:underline">
              Clear All
            </span>
          </div>
        </div>

        <div className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Room Type</p>
            {roomTypes.map((room, i) => (
              <CheckBox
                key={i}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, 'roomType')}
              />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, i) => (
              <CheckBox
                key={i}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
              />
            ))}
          </div>

          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, i) => (
              <RadioButton key={i} label={option} selected={selectedSort === option} onChange={handleSortChange} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
