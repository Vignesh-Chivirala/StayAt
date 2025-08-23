import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const AddRoom = () => {
  const { axios, getToken } = useAppContext()

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
  const [loading, setLoading] = useState(false)

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error('Please fill in all the details')
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('roomType', inputs.roomType)
      formData.append('pricePerNight', inputs.pricePerNight)

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      )
      formData.append('amenities', JSON.stringify(amenities))

      Object.keys(images).forEach((key) => {
        images[key] && formData.append('images', images[key])
      })

      const { data } = await axios.post('/api/rooms/', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      if (data.success) {
        toast.success(data.message)
        setInputs({
          roomType: '',
          pricePerNight: 0,
          amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
          },
        })
        setImages({ 1: null, 2: null, 3: null, 4: null })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white shadow-lg rounded-2xl p-8 w-full"
    >
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Carefully provide room details, pricing, and amenities to help guests make confident booking decisions."
      />

      {/* Images Upload */}
      <p className="text-gray-900 font-medium mt-10 mb-2">Upload Room Images</p>
      <div className="grid grid-cols-2 sm:flex gap-5 flex-wrap">
        {Object.keys(images).map((key) => (
          <label
            key={key}
            htmlFor={`roomImage${key}`}
            className="cursor-pointer w-32 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-primary transition-all bg-gray-50"
          >
            <img
              className="max-h-20 object-cover"
              src={
                images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Details */}
      <div className="w-full flex max-sm:flex-col sm:gap-6 mt-8">
        <div className="flex-1 max-w-64">
          <label className="text-gray-800 font-medium">Room Type</label>
          <select
            className="border border-gray-300 mt-2 rounded-lg p-2 w-full text-gray-700 focus:ring-2 focus:ring-primary outline-none"
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <label className="text-gray-800 font-medium">
            Price <span className="text-xs text-gray-500">/night</span>
          </label>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-2 rounded-lg p-2 w-28 text-gray-700 focus:ring-2 focus:ring-primary outline-none"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-900 font-medium mt-8 mb-2">Amenities</p>
      <div className="flex flex-col flex-wrap gap-2 text-gray-600 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <label
            key={index}
            htmlFor={`amenities${index + 1}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              className="accent-primary"
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            {amenity}
          </label>
        ))}
      </div>

      {/* Submit */}
      <button
        className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-xl mt-10 cursor-pointer transition-all shadow-md disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Room'}
      </button>
    </form>
  )
}

export default AddRoom
