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
import * as Yup from 'yup';

export default function Login() {
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        let hasError = false; // Biến cờ để kiểm tra có lỗi từ Yup không

        try {
            await schema.validate({
                email,
                password
            }, { abortEarly: false });

            // Nếu không có lỗi từ Yup, đặt hasError thành false
            setErrors({});
            hasError = false;

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const yupErrors = {};
                error.inner.forEach((e) => {
                    yupErrors[e.path] = e.message;
                });
                setErrors(yupErrors);
                hasError = true; // Nếu có lỗi từ Yup, đặt hasError thành true
            }
        }

        // Kiểm tra biến cờ để gọi API chỉ khi không có lỗi từ Yup
        if (!hasError) {
            try {
                setLoadingAPI(true);

                const response = await axios.post('https://bookinghomestayswp.azurewebsites.net/auth/login', {
                    email,
                    password
                });

                if (response && response.data.token) {
                    loginContext(response.data.id, response.data.role, response.data.token);
                    if (response.data.role === '[ROLE_ADMIN]' || response.data.role === '[ROLE_STAFF]') {
                        setSnackbarMessage('Login successfully !!!')
                        setSnackbarColor("success");
                        setSnackbarOpen(true);
                        setTimeout(() => navigate('/staff'), 1000);
                    } else {
                        setSnackbarMessage('Login successfully !!!')
                        setSnackbarColor("success");
                        setSnackbarOpen(true);
                        setTimeout(() => navigate('/'), 1000);
                    }
                }
            } catch (error) {
                // console.error('Login failed:', error);
                // setSnackbarMessage('Email or Password are incorrect !!!');
                // setSnackbarColor("error");
                // setSnackbarOpen(true);
                console.error('Login failed:', error);
                if (error.response && error.response.status === 401 && error.response.data && error.response.data.message === "Your account blocked") {
                    setSnackbarMessage(error.response.data.message);
                } else {
                    setSnackbarMessage('Email or Password are incorrect !!!');
                }
                setSnackbarColor("error");
                setSnackbarOpen(true);
            } finally {
                setLoadingAPI(false);
            }
        }
    }


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h2>LOGIN</h2>
                    <div className="line-container line-header">
                        <div className="line-login"></div>
                    </div>
                    <div className="login-here">
                        <span>
                            Don't have an account yet?
                            <Link to="/register">&nbsp;Register here</Link>
                        </span>
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderColor: errors.email ? 'red' : null }}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div className="input-container">
                        <input
                            type={isShowPassword === true ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderColor: errors.password ? 'red' : null }}
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                        <FontAwesomeIcon
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="eye-slash"
                            icon={isShowPassword ? faEye : faEyeSlash}
                        />
                    </div>
                    {/* <div className="link-login">
                        <span className="forgot-password">
                            <a href="#">Forgot your password?</a>
                        </span> */}
                        {/* <span className="register-here">
                            <Link to="/register">Register here</Link>
                        </span> */}
                    {/* </div> */}
                    <button className="login-button" type="submit">
                        {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />}
                        &nbsp;LOGIN
                    </button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                {/* <div className="link-login">
                    <span className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </span>
                    <span className="register-here">
                        <Link to="/register">Register here</Link>
                    </span>
                </div> */}
                {/* <div className="line-container">
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
                </div> */}
            </div>
        </div>
    );
}
