import React, { useState, useEffect } from 'react';
import StaffPage from './StaffNavbar.jsx'
import axios from 'axios';
import './StaffView.css'
import Year from './SelectYear/Year.jsx';
export default function StaffView() {
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings/admin/total_Price_For_Done_Bookings');
                setTotalPrice(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='staff-page'>
            <StaffPage />


            <div className='card-item'>
                <div className='card-item-detail'>
                    Total Price For Done Booking: {totalPrice}
                </div>
            </div>

            <div className='card-item'>
                <div className='card-item-year'>
                    <Year />
                </div>
            </div>



        </div>
    )
}
