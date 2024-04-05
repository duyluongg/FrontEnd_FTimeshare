import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import SnackBar from "../SnackBar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../UserContext.jsx';

export default function UpdateProfile({ getData }) {
    // const { user } = useContext(UserContext);
    // const { accID } = useParams();
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
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';


    useEffect(() => {
        if (getData) {
            fetchDataUser(getData);
        }
    }, [getData]);

    const fetchDataUser = async (getData) => {
        try {
            const response = await axios.get(`${apiUrl}/api/users/viewDetail/${getData}`);
            console.log(response.data);
            const { accName, accEmail, accPhone, accBirthday, imgName } = response.data;
            setFirstName(accName);
            setEmail(accEmail);
            setPhoneNumber(accPhone);
            setBirthday(format(new Date(accBirthday), 'yyyy-MM-dd'));

            if (imgName) {
                setAvatarPreview(imgName);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
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

            const response = await axios.put(`${apiUrl}/api/users/edit/${getData}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // console.log(response.data);
            setSnackbarMessage('Update successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
            setSnackbarMessage('Update failed :(((');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            previewImage(file);
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

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="update-profile-container">
            <div className="update-profile-form">
                <form onSubmit={handleUpdateProfile}>
                    <h2>UPDATE</h2>
                    <div className="line-container line-header">
                        <div className="line-register"></div>
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
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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

                    <div className="input-container">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <button className="register-button" type="submit">UPDATE</button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
            </div>
        </div>
    );
}
