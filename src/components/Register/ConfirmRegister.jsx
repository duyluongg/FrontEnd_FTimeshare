import React, { useState } from 'react';
import './ConfirmRegister.css';
import { useLocation } from 'react-router-dom';

const ConfirmRegister = () => {
    // const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const location = useLocation();
    const { email } = location.state;

    // const handleVerify = () => {
    //     // Xử lý logic xác thực email
    //     console.log('Verifying email:', email, 'with code:', code);
    // };

    // const handleSendCode = () => {
    //     // Xử lý logic gửi mã xác thực
    //     console.log('Sending code to email:', email);
    // };

    return (
        <div className="confirm-register-container">
            <form className="confirm-register-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                />
                <label>Verification Code:</label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div className="button-container">
                    <button type="button" onClick={handleVerify}>Verify</button>
                    <button type="button" onClick={handleSendCode}>Send Code</button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmRegister;
