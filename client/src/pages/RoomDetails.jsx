import React, { useEffect, useState } from 'react'
import { assets, roomCommonData } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

const RoomDetails = () => {
    const { id } = useParams();
    const { facilityIcons, rooms, getToken, axios, navigate } = useAppContext();

    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
        try {
            if (checkInDate >= checkOutDate) {
                toast.error('Check-In Date should be less than Check-Out Date')
                return;
            }

            const { data } = await axios.post('/api/bookings/check-availability', { room: id, checkInDate, checkOutDate })
            if (data.success) {
                if (data.isAvailable) {
                    setIsAvailable(true)
                    toast.success('Room is available')
                } else {
                    setIsAvailable(false)
                    toast.error('Room is not available')
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            if (!isAvailable) {
                return checkAvailability();
            } else {
                const { data } = await axios.post(
                    '/api/bookings/book',
                    { room: id, checkInDate, checkOutDate, guests, paymentMethod: "Pay At Hotel" },
                    { headers: { Authorization: `Bearer ${await getToken()}` } }
                )
                if (data.success) {
                    toast.success(data.message)
                    navigate('/my-bookings')
                    scrollTo(0, 0)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const room = rooms.find(room => room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [rooms]);

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* Title + Badge */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
                <h1 className='text-3xl md:text-4xl font-playfair tracking-tight'>
                    {room.hotel.name} <span className='font-inter text-base text-gray-500'>({room.roomType})</span>
                </h1>
                <span className='text-xs font-medium py-1.5 px-3 text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow'>
                    20% OFF
                </span>
            </div>

            {/* Rating + Location */}
            <div className='flex items-center gap-2 mt-3'>
                <StarRating />
                <p className='text-gray-600 ml-1'>200+ reviews</p>
            </div>
            <div className='flex items-center gap-2 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt='location-icon' className="w-4 h-4" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Images */}
            <div className='flex flex-col lg:flex-row mt-8 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img className='w-full rounded-2xl shadow-xl object-cover transition duration-300 hover:scale-[1.02]'
                        src={mainImage} alt='Room' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img key={index}
                            onClick={() => setMainImage(image)}
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer transition-all hover:scale-105 ${mainImage === image && ' outline-2 outline-orange-500'}`}
                            src={image}
                            alt='Room thumbnail'
                        />
                    ))}
                </div>
            </div>

            {/* Amenities + Price */}
            <div className='flex flex-col md:flex-row md:justify-between mt-12'>
                <div className='flex flex-col'>
                    <h2 className='text-2xl md:text-3xl font-playfair'>Experience Luxury Like Never Before</h2>
                    <div className='flex flex-wrap items-center mt-4 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-sm text-gray-600'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-2xl font-semibold mt-6 md:mt-0 text-primary'>${room.pricePerNight}/night</p>
            </div>

            {/* Booking Form */}
            <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-xl p-6 rounded-2xl mx-auto mt-16 max-w-6xl border border-gray-100'>
                <div className='flex flex-col md:flex-row flex-wrap items-start md:items-center gap-6 text-gray-600'>
                    <div>
                        <label htmlFor='checkInDate' className='font-medium'>Check-In</label>
                        <input onChange={(e) => setCheckInDate(e.target.value)} id='checkInDate' type='date' min={new Date().toISOString().split('T')[0]} className='w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-primary outline-none' required />
                    </div>
                    <div>
                        <label htmlFor='checkOutDate' className='font-medium'>Check-Out</label>
                        <input onChange={(e) => setCheckOutDate(e.target.value)} id='checkOutDate' type='date' min={checkInDate} disabled={!checkInDate} className='w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60' required />
                    </div>
                    <div>
                        <label htmlFor='guests' className='font-medium'>Guests</label>
                        <input onChange={(e) => setGuests(e.target.value)} value={guests} id='guests' type='number' className='w-20 rounded-lg border border-gray-300 px-3 py-2 mt-1 focus:ring-2 focus:ring-primary outline-none' required />
                    </div>
                </div>
                <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-lg mt-6 md:mt-0 md:px-10 py-3 text-base shadow'>
                    {isAvailable ? "Book Now" : "Check Availability"}
                </button>
            </form>

            {/* Additional Info */}
            <div className='mt-20 space-y-6'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-3'>
                        <img className='w-7 h-7' src={spec.icon} alt={`${spec.title}-icon`} />
                        <div>
                            <p className='text-base font-medium'>{spec.title}</p>
                            <p className='text-gray-600'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Description */}
            <div className='max-w-3xl border-y border-gray-200 my-16 py-10 text-gray-600 leading-relaxed'>
                <p>
                    Guests will be allocated on the ground floor according to availability. This two-bedroom apartment offers the true essence of city living. The price quoted is for two guests; for groups, please update the number of guests to view accurate pricing. 
                </p>
            </div>

            {/* Host Section */}
            <div className='flex flex-col items-start gap-5'>
                <div className='flex gap-4'>
                    <img className='h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg object-cover' src={room.hotel.owner.image} alt='Host' />
                    <div>
                        <p className='text-lg md:text-xl font-medium'>Hosted by {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2 text-gray-500'>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-3 mt-4 rounded-lg text-white bg-primary hover:bg-primary-dull transition-all shadow'>
                    Contact Now
                </button>
            </div>
        </div>
    )
}

export default RoomDetails
