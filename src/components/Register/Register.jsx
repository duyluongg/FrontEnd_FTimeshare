
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import SnackBar from "../SnackBar.jsx";

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

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleRegister = async (e) => {
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
            formData.append('roleID', '2');
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
            console.error('Lỗi đăng ký người dùng:', error.response.data); // Xử lý lỗi
            setSnackbarMessage('Registration failed :(((');
            setSnackbarColor("error"); 
             // Thiết lập thông điệp Snackbar
            setSnackbarOpen(true); // Hiển thị Snackbar
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
                            type="date"
                            placeholder="Date of Birth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
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



// import React, { useState } from "react";
// import axios from 'axios';

// export default function Register() {
//     const [avatars, setAvatars] = useState([]);
//     const [avatarPreviews, setAvatarPreviews] = useState([]);

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();
//             avatars.forEach((avatar) => {
//                 formData.append('pictures', avatar);
//             });

//             const response = await axios.post('http://localhost:8080/api/pictures/19', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log(response.data);
           
//         } catch (error) {
//             console.error('Lỗi up ảnh người dùng:', error.response.data); 
      
//         }
//     };

//     const handleAvatarChange = (e) => {
//         const files = Array.from(e.target.files);
//         const previews = files.map((file) => URL.createObjectURL(file));

//         setAvatars([...avatars, ...files]);
//         setAvatarPreviews([...avatarPreviews, ...previews]);
//     };

//     const handleDeselect = (index) => {
//         const newAvatars = [...avatars];
//         const newAvatarPreviews = [...avatarPreviews];

//         newAvatars.splice(index, 1);
//         newAvatarPreviews.splice(index, 1);

//         setAvatars(newAvatars);
//         setAvatarPreviews(newAvatarPreviews);
//     };

//     return (
//         <div className="register-container">
//             <div className="register-form">
//                 <form onSubmit={handleRegister}>
//                     <h2>REGISTER</h2>
//                     <div className="line-container line-header">
//                         <div className="line-register"></div>
//                     </div>
//                     <div className="login-here">
//                         <span>
//                             Already have an account? <a href="/login">Login here</a>
//                         </span>
//                     </div>

//                     <div className="input-container">
//                         <label htmlFor="avatar">Avatar</label>
//                         <input
//                             type="file"
//                             id="avatar"
//                             onChange={handleAvatarChange}
//                             multiple 
//                             value={avatarPreviews.length === 0 ? '' : undefined} 
//                         />
//                         {avatarPreviews.map((preview, index) => (
//                             <div className="input-container" key={index}>                          
//                                 <img src={preview} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
//                                 <button type="button" onClick={() => handleDeselect(index)}>Remove</button>
//                             </div>
//                         ))}
//                     </div>

//                     <button className="register-button" type="submit">REGISTER</button>
//                 </form>
    
//             </div>
//         </div>
//     );
// }
