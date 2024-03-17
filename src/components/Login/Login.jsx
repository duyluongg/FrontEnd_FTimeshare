import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF, faGooglePlusG
} from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';
import SnackBar from "../SnackBar.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            setSnackbarMessage('Email or Password are incorrect !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
            return;
        }
        setLoadingAPI(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', loginData);

            if (response && response.data.token) {
                loginContext(response.data.id, response.data.role, response.data.token);
                if (response.data.role === '[ROLE_ADMIN]') {
                    setSnackbarMessage('Login successfully !!!')
                    setSnackbarColor("success");
                    setSnackbarOpen(true);
                    setTimeout(() => navigate('/admin'), 1000);
                } else if (response.data.role === '[ROLE_STAFF]') {
                    setSnackbarMessage('Login successfully !!!')
                    setSnackbarColor("success");
                    setSnackbarOpen(true);
                    setTimeout(() => navigate('/admin'), 1000);
                } else {
                    setSnackbarMessage('Login successfully !!!')
                    setSnackbarColor("success");
                    setSnackbarOpen(true);
                    setTimeout(() => navigate('/'), 1000);
                }
            } else {
                if (response && response.status === 400) {
                    setSnackbarMessage('Login failed !!!');
                    setSnackbarColor("error");
                    setSnackbarOpen(true);
                }
            }
            setLoadingAPI(false);
        } catch (error) {
            console.error('Login failed:', error);
            setSnackbarMessage('Email or Password are incorrect !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get(
                    "https://googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h2>LOGIN</h2>
                    <div className="line-container line-header">
                        <div className="line-login"></div>
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type={isShowPassword === true ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="eye-slash"
                            icon={isShowPassword ? faEye : faEyeSlash}
                        />
                    </div>
                    <button className="login-button" type="submit">
                        {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />}
                        &nbsp;LOGIN
                    </button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                <div className="link-login">
                    <span className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </span>
                    <span className="register-here">
                        <Link to="/register">Register here</Link>
                    </span>
                </div>
                <div className="line-container">
                    <div className="line"></div>
                    <div className="or">Or login with</div>
                    <div className="line"></div>
                </div>
                <div className="social-login">
                    <button className="facebook-login">
                        <span className="facebook-icon"><FontAwesomeIcon icon={faFacebookF} className="icon" /></span>
                        <span>Facebook</span>
                    </button>
                    <button className="google-login" onClick={() => loginGoogle()}>
                        <span className="google-icon"><FontAwesomeIcon icon={faGooglePlusG} className="icon" /></span>
                        <span>Google</span>
                    </button>
                    {/* <GoogleLogin
                        onSuccess={credetialResponse => {
                            const credetialResponseDecoded = jwtDecode(credetialResponse.credential);
                            console.log(credetialResponseDecoded);
                        }}
                        onError={() => {
                            console.log("Login failed");
                        }}
                    /> */}
                </div>
            </div>
        </div>
    );
}
