import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import Title from "./Title";
import HotelCard from "./HotelCard";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();

  // Compute recommendations only when dependencies change
  const recommended = useMemo(() => {
    if (!rooms || !searchedCities?.length) return [];
    return rooms.filter((room) => searchedCities.includes(room.hotel.city));
  }, [rooms, searchedCities]);

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      {recommended.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <div
              key={room._id}
              className="animate-fadeInUp transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <HotelCard room={room} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-12 text-center">
          No recommended hotels found. Try searching in another city 🌍
        </p>
      )}
    </div>
  );
};

export default RecommendedHotels;
