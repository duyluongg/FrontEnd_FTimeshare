import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF, faGooglePlusG
} from '@fortawesome/free-brands-svg-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // handle login logic here

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-button" type="submit">LOGIN</button>
                </form>
                <div className="link-login">
                    <span className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </span>
                    <span className="register-here">
                        <a href="#">Register here</a>
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
