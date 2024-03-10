import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import SnackBar from "../../SnackBar.jsx";
import { useContext } from 'react';
import { UserContext } from '../../UserContext';


const Booking = () => {
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [numPeople, setNumPeople] = useState(1);
    const [checkOutDate, setCheckOutDate] = useState("");
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');

    const location = useLocation();
    const { productID } = location.state;

    const navigate = useNavigate();

    const [accInfo, setAccInfo] = useState([]);

    // const [bookingData, setBookingData] = useState({
    //     startDate: '',
    //     endDate: '',
    //     bookingPerson: numPeople,
    //     bookingStatus: 'Pending',
    //     imgName: null,
    //     imgData: null,
    //     accID: user.id,
    //     productID: productID,
    //     // paymentID: 2
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setBookingData({
    //         ...bookingData,
    //         [name]: value,
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formattedStartDate = new Date(bookingData.startDate).toISOString();
    //     const formattedEndDate = new Date(bookingData.endDate).toISOString();

    //     const bookingDataToSend = {
    //         ...bookingData,
    //         startDate: formattedStartDate,
    //         endDate: formattedEndDate
    //     };

    //     try {
    //         const response = await axios.post('http://localhost:8080/api/bookings/customer/createbooking', bookingDataToSend);
    //         console.log('Booking created:', response.data);
    //         console.log('Response status:', response.status);
    //         console.log('Response status text:', response.statusText);
    //         console.log(response.data.bookingID);
    //         // Xử lý sau khi tạo booking thành công, ví dụ: chuyển hướng hoặc hiển thị thông báo thành công
    //         navigate('/booking-stage', {
    //             state: {
    //                 bookingID: response.data.bookingID,
    //                 productID: response.data.productID
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error creating booking:', error);
    //         // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
    //     }
    // };

    useEffect(() => {
        const fetchAccInfoAPI = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/viewDetail/${user.id}`);
                setAccInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching account information: ', error);
            }
        };

        fetchAccInfoAPI();
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            navigate('/payment', {
                state: {
                    startDate: checkInDate,
                    endDate: checkOutDate,
                    bookingPerson: numPeople,
                    productID: productID,
                    name: accInfo.accName,
                    phone: accInfo.accPhone
                }
            })
            setOpenModal(true);
        } catch (error) {
            console.error('Error booking:', error);
        }
    }

    return (
        <>
            <div className="create-booking-page">
                <div className="create-booking-container">
                    <div className="padding-top-15">
                        <div className="booking-col-12">
                            <div className="create-booking-page-title">
                                <h1 className="title-head"><p>Booking</p></h1>
                            </div>
                            <div className="create-booking-page-content">
                                <div className="content-column">
                                    <div className="banner-booking">
                                        <img src="//bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner_booking.jpg?1706510122820" alt="Bean Hotel" />
                                    </div>
                                </div>
                                <div className="content-column create-booking-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="pad-room">
                                            <div className="content-column-left">
                                                <div className="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="name">Name *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={accInfo.accName}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="checkInDate">Start Date *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <div className="form-booking-icon"></div>
                                                        <div className="form-booking-date">
                                                            <input
                                                                type="date" //type="text" dùng datepicker
                                                                id="checkInDate"
                                                                name="checkInDate"
                                                                value={checkInDate}
                                                                onChange={(e) => setCheckInDate(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="numPeople">Number of People</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <input
                                                            type="number"
                                                            id="numPeople"
                                                            name="numPeople"
                                                            value={numPeople}
                                                            onChange={(e) => setNumPeople(e.target.value)}
                                                            min="1"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content-column-right">
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="phone">Phone *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <input
                                                            type="tel"
                                                            id="phone"
                                                            name="phone"
                                                            value={accInfo.accPhone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="checkOutDate">End Date *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <div className="form-booking-icon"></div>
                                                        <div className="form-booking-date">
                                                            <input
                                                                type="date"
                                                                id="checkOutDate"
                                                                name="checkOutDate"
                                                                value={checkOutDate}
                                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="booking-button-col-12">
                                            <div class="div-tem-price">
                                                <button type="submit" className="create-booking-button">Booking</button>
                                            </div>
                                        </div>
                                    
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Booking;