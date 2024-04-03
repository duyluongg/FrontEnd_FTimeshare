import React, { useState, useEffect } from "react";
import './SuccessPayment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import axios from "axios";
import { Link } from "react-router-dom";

export default function SuccessPayment() {

    const { user } = useContext(UserContext);
    console.log(user.id);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${user.id}`);
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user.id]);

    return (
        <>
            <div className="success-container">
                <div className="success-icon">&#10003;</div>
                <div className="success-message">Your booking is confirmed successfully!</div>
                {userData && (
                    <div className="success-message-addition"><FontAwesomeIcon icon={faCheck} />&nbsp;You’re all set! We sent your confirmation email to {userData.accEmail}</div>
                )}
                <div className="button-container">
                    <Link to="/">
                        <button className="home-button">Back to Home</button>
                    </Link>
                    <Link to="/view-booking-history">
                        <button className="order-history-button">View Booking History</button>
                    </Link>
                </div>
            </div>
        </>
    );
}