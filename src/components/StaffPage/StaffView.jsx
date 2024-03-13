// import React, { useState, useEffect } from 'react';
// import StaffNavbar from './StaffNavbar.jsx';
// import axios from 'axios';
// import './StaffView.css';
// import Year from './SelectYear/Year.jsx';
// import RegisterStaff from './RegisterStaff.jsx';
// import { Link, Outlet } from 'react-router-dom';

// export default function StaffView() {
//     const [totalPrice, setTotalPrice] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/bookings/admin/total_Price_For_Done_Bookings');
//                 setTotalPrice(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <>
//             <StaffNavbar />
//             <div className='staff-page'>
//                 <div className='card-item'>
//                     <div className='card-item-detail'>
//                         Total Price For Done Booking: {totalPrice}
//                     </div>
//                 </div>

//                 <div className='card-item'>
//                     <div className='card-item-year'>
//                         <Year />
//                     </div>
//                 </div>

//                 <div className='card-item'>
//                     <div className='card-item-year'>
//                         {/* Tạo liên kết đến trang đăng ký nhân viên */}
//                         <Link to="/staff/register">Create Account Staff</Link>
//                     </div>
//                 </div>

//                 {/* Đây là nơi sẽ render nội dung của RegisterStaff */}
//                 <div className="register-staff-container">
//                     <Outlet />

//                 </div>
//             </div>
//         </>
//     );
// }



import React, { useState, useEffect } from 'react';
import StaffNavbar from './StaffNavbar.jsx';
import axios from 'axios';
import './StaffView.css';
import Year from './SelectYear/Year.jsx';
import RegisterStaff from './RegisterStaff.jsx';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

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
        <>
            <StaffNavbar />
            <div className='staff-page'>
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

                <Link to="/staff/register">
                    <div className='card-item'>
                        <div className='card-item-detail'>
                            Create Account Staff
                        </div>
                    </div>
                </Link>

                <Link to="/staff/view-account-staff">
                    <div className='card-item'>
                        <div className='card-item-detail'>
                            View Account Staff
                        </div>
                    </div>
                </Link>

                {/* <div className="register-staff-container">
                    <Outlet />
                </div> */}
            </div >
            {/* <Routes>
                <Route path="/staff/register" element={<RegisterStaff />} />
            </Routes> */}
        </>
    );
}

