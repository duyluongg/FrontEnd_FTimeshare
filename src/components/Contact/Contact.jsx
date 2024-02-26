import React from 'react';
import { useState } from "react";
import { contactInfo } from '../../Shared/ContactInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faMapMarkerAlt
// } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <>
            <div className="container">
                <div className="contact-container">
                    <div className="contact-form">
                        <p>CONTACT INFORMATION</p>
                        <p>
                            Please fill in the message content in the form below and send it to us. We will reply to you after receiving it.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Content *"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></input>
                            <button type="submit">SEND CONTACT</button>
                        </form>
                    </div>
                    <div className="yellow-background"></div>
                    <div className="contact-info">
                        <h3>Information</h3>
                        <p>
                            {/* <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                            <span>{contactInfo.address}</span> */}
                            <p>{contactInfo.name}</p>
                        </p>
                        <p>{contactInfo.email}</p>
                        <p>{contactInfo.phone}</p>
                        <p>{contactInfo.status}</p>
                    </div>   
                </div>
                <div className="map-container">
                    <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=L%C3%B4%20E2a-7,%20%C4%90%C6%B0%E1%BB%9Dng%20D1,%20%C4%90.%20D1,%20Long%20Th%E1%BA%A1nh%20M%E1%BB%B9,%20Th%C3%A0nh%20Ph%E1%BB%91%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c,%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000+(Tr%C6%B0%E1%BB%9Dng%20%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20FPT%20TP.%20HCM)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population Estimator map</a></iframe>
                </div>
            </div>
        </>
    );
};
