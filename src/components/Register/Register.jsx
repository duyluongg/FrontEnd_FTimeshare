
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const [errors, setErrors] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const schema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits').required('Phone Number is required'),
        password: Yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
        birthday: Yup.date().required('Birthday is required'),
        avatar: Yup.mixed().required('Avatar is required')
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true); 
        try {

            await schema.validate({
                firstName,
                email,
                phoneNumber,
                password,
                birthday,
                avatar
            }, { abortEarly: false });
            const formattedBirthday = formatDate(birthday);
            const formData = new FormData();
            formData.append('Avatar', avatar);
            formData.append('accName', firstName);
            formData.append('accEmail', email);
            formData.append('accPhone', phoneNumber);
            formData.append('accPassword', password);
            formData.append('accStatus', 'active');
            formData.append('roleID', '3');
            formData.append('accBirthday', formattedBirthday);

            const response = await axios.post('http://localhost:8080/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            setSnackbarMessage('Registration successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);


        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const yupErrors = {};
                error.inner.forEach((e) => {
                    yupErrors[e.path] = e.message;
                });
                setErrors(yupErrors);
            } else {
                console.error('Registration failed :(((', error.response.data);
                setSnackbarMessage('Registration failed :(((');
                setSnackbarColor("error");
                setSnackbarOpen(true);
            }
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            previewImage(file);
            console.log(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleRegister}>
                    <h2>REGISTER</h2>
                    <div className="line-container line-header">
                        <div className="line-register"></div>
                    </div>
                    <div className="login-here">
                        <span>
                            Already have an account? <a href="/login">Login here</a>
                        </span>
                    </div>

                    <div className="input-container">
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            onChange={handleAvatarChange}
                        />
                        {avatarPreview && (
                            <div className="input-container">
                                <label>Avatar Preview:</label>
                                <img src={avatarPreview} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                            </div>
                        )}
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                      {errors.email && <p className="error-message">{errors.email}</p>}

                    </div>
                    <div className="input-container">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                           {errors.password && <p className="error-message">{errors.password}</p>}

                    </div>

                    <div className="input-container">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                       {submitAttempted && !birthday && <p className="error-message">Birthday is required</p>}
                    </div>

                    <button className="register-button" type="submit">REGISTER</button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                <div className="line-container">
                    <div className="line"></div>
                    <div className="or">Or login with</div>
                    <div className="line"></div>
                </div>
                <div className="social-register">
                    <button className="facebook-register">
                        <span className="facebook-icon"><FontAwesomeIcon icon={faFacebookF} className="icon" /></span>
                        <span>Facebook</span>
                    </button>
                    <button className="google-register">
                        <span className="google-icon"><FontAwesomeIcon icon={faGooglePlusG} className="icon" /></span>
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}