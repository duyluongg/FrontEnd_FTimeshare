import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF, faGooglePlusG
} from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    console.log(loginData);

    const handleLogin = async (e) => {
        e.preventDefault();

        alert("Me");
        if(!loginData.email || !loginData.password) {
            // toast.error("Email/Password is required");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/login', loginData);
            console.log(response);

            console.log('Login successful:', response.data);

            if(response && response.data.token) {
                loginContext(response.data.id, response.data.role, response.data.token);
                if(response.data.role === '[ROLE_ADMIN]') {
                    navigate('/admin');
                } else {
                    navigate('/owner-page');
                }
                
            }
            
        } catch (error) {
            console.error('Registration failed:', error);
            // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)

        }

    }

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
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon icon={faEyeSlash} />
                    </div>
                    <button className="login-button" type="submit">LOGIN</button>
                </form>
                <div className="link-login">
                    <span className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </span>
                    <span className="register-here">
                        <a href="/register">Register here</a>
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
                    <button className="google-login">
                        <span className="google-icon"><FontAwesomeIcon icon={faGooglePlusG} className="icon" /></span>
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
