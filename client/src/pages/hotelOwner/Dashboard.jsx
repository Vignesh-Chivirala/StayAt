import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
    const { currency, user, getToken, toast, axios } = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) fetchDashboardData();
    }, [user]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency || "INR",
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div>
            <Title 
                align='left' 
                font='outfit' 
                title='Dashboard' 
                subTitle='Monitor your rooms, track bookings, and analyze revenue in one place. Stay updated with real-time insights.' 
            />

            {/* Summary Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 my-8'>
                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center hover:shadow-md transition'>
                    <img className='h-10' src={assets.totalBookingIcon} alt="Bookings" />
                    <div className='ml-4'>
                        <p className='text-blue-600 font-medium'>Total Bookings</p>
                        <p className='text-gray-800 text-xl font-semibold'>{dashboardData.totalBookings}</p>
                    </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center hover:shadow-md transition'>
                    <img className='h-10' src={assets.totalRevenueIcon} alt="Revenue" />
                    <div className='ml-4'>
                        <p className='text-blue-600 font-medium'>Total Revenue</p>
                        <p className='text-gray-800 text-xl font-semibold'>{formatCurrency(dashboardData.totalRevenue)}</p>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <h2 className='text-xl text-blue-950/80 font-semibold mb-5'>Recent Bookings</h2>

            {dashboardData.bookings.length === 0 ? (
                <div className='text-center text-gray-500 py-10 border rounded-lg'>
                    <p>No bookings yet. 📭</p>
                </div>
            ) : (
                <div className='w-full max-w-4xl text-left border border-gray-200 rounded-lg shadow-sm max-h-96 overflow-y-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='py-3 px-4 text-gray-700 font-medium'>User</th>
                                <th className='py-3 px-4 text-gray-700 font-medium max-sm:hidden'>Room</th>
                                <th className='py-3 px-4 text-gray-700 font-medium text-center'>Amount</th>
                                <th className='py-3 px-4 text-gray-700 font-medium text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {dashboardData.bookings.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition'>
                                    <td className='py-3 px-4 text-gray-800 border-t'>{item.user.username}</td>
                                    <td className='py-3 px-4 text-gray-500 border-t max-sm:hidden'>{item.room.roomType}</td>
                                    <td className='py-3 px-4 text-gray-700 border-t text-center'>
                                        {formatCurrency(item.totalPrice)}
                                    </td>
                                    <td className='py-3 px-4 border-t text-center'>
                                        <span className={`inline-flex items-center gap-1 py-1 px-3 text-xs font-medium rounded-full
                                            ${item.isPaid 
                                                ? "bg-green-100 text-green-700" 
                                                : "bg-yellow-100 text-yellow-700"}`}>
                                            <span className='h-2 w-2 rounded-full bg-current'></span>
                                            {item.isPaid ? "Completed" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
