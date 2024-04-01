import React, { useState } from 'react';
import './ConfirmRegister.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from 'react-router-dom';

const ConfirmRegister = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const location = useLocation();
    const { email } = location.state;
    const [randomCode, setRandomCode] = useState('');
    // const [isCodeComplete, setIsCodeComplete] = useState(false);
    const [sendAttempts, setSendAttempts] = useState(0);
    const [remainingAttempts, setRemainingAttempts] = useState(5);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const [isLoading, setIsLoading] = useState(false);

    const generateRandomCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        setRandomCode(randomCode.toString());
        return randomCode;
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (code === randomCode) {
            try {
                const response = await axios.put(`https://bookinghomestayswp.azurewebsites.net/api/users/verify/active/${email}`);
                console.log('Email verified:', response.data);
                // setIsCodeComplete(true);
                setSendAttempts(0);
                setRemainingAttempts(5);
                setErrorMessage('');
                setSnackbarMessage('Your email has been verified successfully!')
                setSnackbarColor("success");
                setSnackbarOpen(true);
                setTimeout(() => navigate('/login'), 1000);
            } catch (error) {
                console.error('Verify email failed', error.response.data);
                setErrorMessage('');
                setSnackbarMessage('Failed to verify your email!')
                setSnackbarColor("error");
                setSnackbarOpen(true);
            }
        } else {
            setSendAttempts(sendAttempts + 1);
            const remaining = 5 - sendAttempts;
            setRemainingAttempts(remaining);
            setErrorMessage(`Sending verification code failed. You have ${remaining} attempts left.`);
            if (sendAttempts >= 5) {
                try {
                    const response = await axios.delete(`https://bookinghomestayswp.azurewebsites.net/api/users/deleteByEmail/${email}`);
                    console.log('Email deletion response:', response.data);
                    // setErrorMessage('Email verification failed. Please register with a new email.');
                    setErrorMessage('');
                    setSnackbarMessage('Email verification failed! Please register with a new email')
                    setSnackbarColor("error");
                    setSnackbarOpen(true);
                    setTimeout(() => navigate('/register'), 1000);
                } catch (error) {
                    console.error('Delete email failed', error.response.data);
                }
            }
        }
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const randomCode = generateRandomCode();
            const formData = new FormData();
            formData.append('getOTP', randomCode.toString());
            formData.append('email', email);
            const response = await axios.post('https://bookinghomestayswp.azurewebsites.net/api/users/sendOTP/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Code sent successfully:', response.data);
            // setIsCodeComplete(true);
            setSnackbarMessage('A verification code has been sent to your email, please check your email!')
            setSnackbarColor("success");
            setSnackbarOpen(true);
            setIsSent(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Send email failed', error.response.data);
            setIsLoading(false);
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        // setIsCodeComplete(e.target.value.length === 6);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="confirm-register-container">
            <form className="confirm-register-form">
                <h2>EMAIL VERIFICATION</h2>
                <div className="line-container line-header">
                    <div className="line-login"></div>
                </div>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    readOnly
                />
                <label>Verification Code:</label>
                <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="button-container">
                    {/* {!isSent && <button type="button" onClick={handleSendCode} disabled={isLoading}>Send Code</button>} */}
                    {!isSent && <button type="button" onClick={handleSendCode} disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Code'}</button>}
                    {isSent && <button type="button" onClick={handleSendCode} disabled={isLoading}>{isLoading ? 'Sending...' : 'Resend Code'}</button>}
                    {isSent && <button type="button" onClick={handleVerify}>Verify</button>}
                </div> 
            </form>
            <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
        </div>
    );
};

export default ConfirmRegister;
