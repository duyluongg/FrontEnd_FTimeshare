import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

const Booking = () => {
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [numPeople, setNumPeople] = useState(1);
    const [phone, setPhone] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");

    const location = useLocation();
    const { productID, productPrice } = location.state;

    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState({
        startDate: '',
        endDate: '',
        bookingPerson: numPeople,
        bookingStatus: 'Pending',
        imgName: null,
        imgData: null,
        accID: user.id,
        productID: productID,
        // paymentID: 2
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedStartDate = new Date(bookingData.startDate).toISOString();
        const formattedEndDate = new Date(bookingData.endDate).toISOString();

        const bookingDataToSend = {
            ...bookingData,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        };

        try {
            const response = await axios.post('http://localhost:8080/api/bookings/customer/createbooking', bookingDataToSend);
            console.log('Booking created:', response.data);
            console.log('Response status:', response.status);
            console.log('Response status text:', response.statusText);
            console.log(response.data.bookingID);
            // Xử lý sau khi tạo booking thành công, ví dụ: chuyển hướng hoặc hiển thị thông báo thành công
            navigate('/booking-stage', {
                state: {
                    bookingID: response.data.bookingID,
                    productID: response.data.productID
                }
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        }
    };

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
                                                            value={name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="startDate">Start Date *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <div className="form-booking-icon"></div>
                                                        <div className="form-booking-date">
                                                            <input
                                                                type="date" //type="text" dùng datepicker
                                                                id="startDate"
                                                                name="startDate"
                                                                value={bookingData.startDate}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="bookingPerson">Number of People</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <input
                                                            type="number"
                                                            id="bookingPerson"
                                                            name="bookingPerson"
                                                            value={bookingData.bookingPerson}
                                                            onChange={handleChange}
                                                            min="1"
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
                                                            value={phone}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="endDate">End Date *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <div className="form-booking-icon"></div>
                                                        <div className="form-booking-date">
                                                            <input
                                                                type="date"
                                                                id="endDate"
                                                                name="endDate"
                                                                value={bookingData.endDate}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div class="margin-bottom-5">
                                                    <div className="text-left">
                                                        <label htmlFor="roomType">Chọn phòng *</label>
                                                    </div>
                                                    <div className="form-booking">
                                                        <select
                                                            id="roomType"
                                                            name="roomType"
                                                            value={roomType}
                                                            onChange={(e) => setRoomType(e.target.value)}
                                                        >
                                                            <option value="standard">Phòng đơn tiêu chuẩn</option>
                                                            
                                                        </select>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="booking-button-col-12">
                                            <div class="div-tem-price">
                                                <button type="submit" className="create-booking-button">Đặt Phòng</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='form'>
                <h1 className='form-cost'>${productDetail.productPrice}/Day</h1>

                <form className='form-item' onSubmit={handleBooking}>
                    <div className='column-form column-1'>
                        {/* <label for="fullName">First and last name:</label>
                                <input type="text" id="fullName" name="fullName" required /> */}

            {/* <label for="phoneNumber">Phone number:</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" required /> */}

            {/* <label for="person">Person:</label>
                                <input type="number" id="person" name="person" min="1" required />
                                <button type="submit">Provisional Price</button> 
                        <button type="button" onClick={calculateTotal}>Calculate Total</button>

                        <div>
                            Total Days: {totalDays}
                        </div>
                        <div>
                            Total Cost: ${totalCost}
                        </div>

                    </div>
                    <div className='column-form column-2'>
                        <label htmlFor="startDate">Check-In Date:</label>
                        <input type="date" id="startDate" name="startDate" value={bookingData.startDate} onChange={handleChange} required />

                        <label htmlFor="endDate">Check-Out Date:</label>
                        <input type="date" id="endDate" name="endDate" value={bookingData.endDate} onChange={handleChange} required />

                        {/* <label for="children">Child:</label>
                                <input type="number" id="children" name="children" min="0" required /> 
                        <button type="submit">Booking</button>

                    </div>
                </form>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Họ và tên *</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="checkInDate">Ngày nhận *</label>
                <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />

                <label htmlFor="numPeople">Số người</label>
                <input
                    type="number"
                    id="numPeople"
                    value={numPeople}
                    onChange={(e) => setNumPeople(e.target.value)}
                />

                <label htmlFor="phone">Số điện thoại *</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label htmlFor="checkOutDate">Ngày trả *</label>
                <input
                    type="date"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />

                <label htmlFor="roomType">Chọn phòng *</label>
                <select
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                >
                    <option value="standard">Phòng đơn tiêu chuẩn</option>
                    {/* Add more room types here 
                </select>

                <button type="submit">Đặt Phòng</button>
            </form> */}
        </>
    );
};

export default Booking;