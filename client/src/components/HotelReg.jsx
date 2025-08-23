import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets, cities } from "../assets/assets";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(
        `/api/hotels/`,
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-md:mx-4 transition-all"
      >
        {/* Left Image */}
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 object-cover hidden md:block"
        />

        {/* Form Section */}
        <div className="relative flex flex-col items-start md:w-1/2 p-8 md:p-10">
          {/* Close Icon */}
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-5 w-5 cursor-pointer hover:scale-110 transition"
            onClick={() => setShowHotelReg(false)}
          />

          {/* Heading */}
          <p className="text-2xl font-bold text-gray-900 mt-6">
            Register Your Hotel
          </p>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            Add your property details and start welcoming guests.
          </p>

          {/* Hotel Name */}
          <div className="w-full mt-3">
            <label htmlFor="name" className="font-medium text-gray-700 text-sm">
              Hotel Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="e.g. The Grand Palace"
              className="border border-gray-200 rounded-xl w-full px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              type="text"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label
              htmlFor="contact"
              className="font-medium text-gray-700 text-sm"
            >
              Phone
            </label>
            <input
              id="contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              placeholder="e.g. +91 9876543210"
              className="border border-gray-200 rounded-xl w-full px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              type="text"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label
              htmlFor="address"
              className="font-medium text-gray-700 text-sm"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Street, City, Landmark"
              className="border border-gray-200 rounded-xl w-full px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none resize-none transition-all"
              required
            />
          </div>

          {/* City Dropdown */}
          <div className="w-full mt-4 max-w-xs">
            <label
              htmlFor="city"
              className="font-medium text-gray-700 text-sm"
            >
              City
            </label>
            <select
              id="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="border border-gray-200 rounded-xl w-full px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all text-white font-medium px-6 py-2.5 rounded-xl cursor-pointer mt-6 shadow-md">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
