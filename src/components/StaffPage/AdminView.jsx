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
import './AdminView.css';
import Year from './SelectYear/Year.jsx';
import RegisterStaff from './RegisterStaff.jsx';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import TotalUserAd from './TotalUserAd.jsx';

export default function StaffView() {
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/admin/total_Price_For_Done_Bookings');
                setTotalPrice(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            <div className='staff-page'>


                <div className='user-admin'>

                    <div className='user-admin-item'>
                     <h1>User Account</h1>
                        <TotalUserAd />
                    </div>

                </div>
                <div>
                    <div className='card-item-total'>
                        <div className='card-item-detail'>
                            Total Price For Done Booking: {totalPrice}
                        </div>
                    </div>
                    <div className='admin-option'>

                        <div>
                            <Link to="/admin/view-account-staff">
                                <div className='card-item'>
                                    <div className='card-item-detail'>
                                        View Account Staff
                                    </div>
                                </div>
                            </Link>


                        </div>

                        <div>
                            <Link to="/admin/register">
                                <div className='card-item'>
                                    <div className='card-item-detail'>
                                        Create Account Staff
                                    </div>
                                </div>
                            </Link>


                        </div>
                    </div>
                    <div className='card-item-total-year'>
                        <div className='card-item-year'>
                            <Year />
                        </div>
                    </div>


                </div>




            </div >

        </>
    );
}

