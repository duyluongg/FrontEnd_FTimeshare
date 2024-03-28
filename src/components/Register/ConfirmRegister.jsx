import React, { useState } from 'react';
import './ConfirmRegister.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ConfirmRegister = () => {
    const [code, setCode] = useState('');
    const location = useLocation();
    const { email } = location.state;

    // const handleVerify = () => {
    //     // Xử lý logic xác thực email
    //     console.log('Verifying email:', email, 'with code:', code);
    // };

    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            const randomCode = generateRandomCode();
            const formData = new FormData();
            formData.append('getOTP', randomCode.toString());
            formData.append('email', email);
            const response = await axios.post('http://localhost:8080/api/users/sendOTP/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Send email failed', error.response.data);
        }
    };

    return (
        <div className="confirm-register-container">
            <form className="confirm-register-form">
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                />
                <label>Verification Code:</label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div className="button-container">
                    <button type="submit">Verify</button>
                    <button type="submit" onClick={handleSendCode}>Send Code</button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmRegister;
