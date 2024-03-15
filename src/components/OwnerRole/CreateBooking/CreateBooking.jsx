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
    const { productID, availableStartDate, availableEndDate } = location.state;


    const navigate = useNavigate();

    const [accInfo, setAccInfo] = useState([]);

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
            const startDateObj = new Date(checkInDate);
            const endDateObj = new Date(checkOutDate);
            const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
            const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

            const formData = new FormData();
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);
            formData.append('productID', productID);

            console.log(formData)

            const response = await axios.post('http://localhost:8080/api/bookings/customer/checkbooking', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 202) {
                navigate('/payment', {
                    state: {
                        startDate: checkInDate,
                        endDate: checkOutDate,
                        bookingPerson: numPeople,
                        productID: productID,
                        name: accInfo.accName,
                        phone: accInfo.accPhone
                    }
                });
            }
        } catch (error) {
            console.error('Error booking:', error);
            if (error.response && error.response.data) {
                setSnackbarMessage(error.response.data);
                setSnackbarColor("error");
                setSnackbarOpen(true);
            }
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                                    <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
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