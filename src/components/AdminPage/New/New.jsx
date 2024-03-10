import React, { useState } from 'react';
import axios from 'axios';
import SnackBar from "../../SnackBar.jsx";
function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [news, setNews] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success'); 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const formattedBirthday = formatDate(birthday);
            const formData = new FormData();
            formData.append('news', news);
            formData.append('newsTitle', title);
            formData.append('newsContent', content);
            formData.append('newsViewer', 100);
            formData.append('newsStatus', "Active");
            formData.append('accID', 2);


            const response = await axios.post('http://localhost:8080/api/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            setSnackbarMessage('Create a new successfully !!!')
            setSnackbarColor("success"); 
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Lỗi tạo new :', error.response.data); 
            setSnackbarMessage("Create a new failed :(((");
            setSnackbarColor("error"); 
            setSnackbarOpen(true); 
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNews(file);
            previewImage(file);
            console.log(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setNewPicture(reader.result);
        };
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); 
    };


    return (
        <div className="create-news">
            <h1>Create News</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                            type="text"
                            placeholder="TITLE"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label>Content:</label>
                    {/* <textarea name="newsContent" value={formData.newsContent} onChange={handleChange} required /> */}
                    <textarea
                            type="text"
                            placeholder="CONTENT"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={handleAvatarChange}
                    />
                    {newPicture && (
                        <div className="input-container">
                            <label>New Preview:</label>
                            <img src={newPicture} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-button">Submit</button>

            </form>
            <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

        </div>
    );
}

export default CreateNews;


// =================================================================================================================

// import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
// import axios from 'axios';
// // import SnackBar from "../SnackBar.jsx";

// export default function Register() {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [news, setNews] = useState('');
//     const [newPicture, setNewPicture] = useState(null);


//     const formatDate = (date) => {
//         const d = new Date(date);
//         const year = d.getFullYear();
//         const month = ('0' + (d.getMonth() + 1)).slice(-2);
//         const day = ('0' + d.getDate()).slice(-2);
//         return `${year}-${month}-${day}`;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // const formattedBirthday = formatDate(birthday);
//             const formData = new FormData();
//             formData.append('news', news);
//             formData.append('newsTitle', title);
//             formData.append('newsContent', content);
//             formData.append('newsViewer', 100);
//             formData.append('newsStatus', "Active");
//             formData.append('accID', 2);


//             const response = await axios.post('http://localhost:8080/api/news', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log(response.data);


//         } catch (error) {
//             console.error('Lỗi đăng ký người dùng:', error.response.data); // Xử lý lỗi

//         }
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setNews(file);
//             previewImage(file);
//             console.log(file);
//         }
//     };

//     const previewImage = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setNewPicture(reader.result);
//         };
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <div className="register-container">
//             <div className="register-form">
//                 <form onSubmit={handleSubmit}>
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
//                         />
//                         {newPicture && (
//                             <div className="input-container">
//                                 <label>New Preview:</label>
//                                 <img src={newPicture} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
//                             </div>
//                         )}
//                     </div>

//                     <div className="input-container">
//                         <input
//                             type="text"
//                             placeholder="TITLE"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                     </div>

//                     <div className="input-container">
//                         <input
//                             type="text"
//                             placeholder="CONTENT"
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                         />
//                     </div>


//                     <button className="register-button" type="submit">Create new</button>
//                 </form>
//                 {/* <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} /> */}

//             </div>
//         </div>
//     );
// }
