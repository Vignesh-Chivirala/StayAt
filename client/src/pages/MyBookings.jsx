import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const { axios, getToken, user } = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings/user', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePayment = async (bookingId) => {
        try {
            const { data } = await axios.post(
                '/api/bookings/stripe-payment',
                { bookingId },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );
            if (data.success) {
                window.location.href = data.url;
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserBookings();
        }
    }, [user]);

    return (
        <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
            <Title
                title="My Bookings"
                subTitle="Track and manage your past, current, and upcoming stays effortlessly."
                align="left"
            />

            <div className="max-w-6xl mt-10 w-full text-gray-800">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-semibold text-sm uppercase tracking-wide text-gray-600 py-3">
                    <div>Hotel</div>
                    <div>Date</div>
                    <div>Status</div>
                </div>

                {/* Booking Cards */}
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 w-full border-b border-gray-200 py-6 first:border-t bg-white/70 rounded-xl shadow-sm hover:shadow-md transition-all px-4 md:px-6 my-4"
                    >
                        {/* Hotel Info */}
                        <div className="flex flex-col md:flex-row">
                            <img
                                className="min-md:w-44 rounded-xl shadow-md object-cover"
                                src={booking.room.images[0]}
                                alt="hotel-img"
                            />
                            <div className="flex flex-col gap-2 max-md:mt-3 md:ml-5">
                                <p className="font-playfair text-xl font-semibold text-gray-900">
                                    {booking.hotel.name}
                                    <span className="font-inter text-sm text-gray-500">
                                        {" "}
                                        ({booking.room.roomType})
                                    </span>
                                </p>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.locationIcon} alt="location-icon" className="w-4" />
                                    <span>{booking.hotel.address}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.guestsIcon} alt="guests-icon" className="w-4" />
                                    <span>Guests: {booking.guests}</span>
                                </div>
                                <p className="text-base font-medium text-gray-700">
                                    Total: <span className="text-indigo-600 font-semibold">${booking.totalPrice}</span>
                                </p>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="flex flex-row md:flex-col md:justify-center md:gap-3 gap-6 items-start">
                            <div>
                                <p className="font-medium text-sm text-gray-600">Check-In</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkInDate).toDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-600">Check-Out</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkOutDate).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="flex flex-col items-start md:items-center justify-center">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-3 w-3 rounded-full ${
                                        booking.isPaid ? "bg-green-500" : "bg-red-500"
                                    }`}
                                ></span>
                                <p
                                    className={`text-sm font-medium ${
                                        booking.isPaid ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {booking.isPaid ? "Paid" : "Unpaid"}
                                </p>
                            </div>
                            {!booking.isPaid && (
                                <button
                                    onClick={() => handlePayment(booking._id)}
                                    className="px-5 py-2 mt-4 text-xs font-medium border border-indigo-500 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
