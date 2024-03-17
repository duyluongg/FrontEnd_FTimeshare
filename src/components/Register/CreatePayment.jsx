
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from "react-router";

export default function CreatePayment({ getID, hideCreatePayment }) {
    const [accountName, setAccountName] = useState('');
    const [bank, setBank] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accountBank, setAccountBank] = useState('');
    const [birthday, setBirthday] = useState('');
    // const [imgBank, setImgBank] = useState('');
    const [imgBankPreview, setImgBankPreview] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');

    // console.log(hideCreatePayment);
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const navigate = useNavigate();

    const handleCreatePayment = async (e) => {
        e.preventDefault();
        console.log(getID);
        try {

            const formData = new FormData();
            // formData.append('ImgBanking', new File([''], { type: 'text/plain' }));
            formData.append('ImgBanking', new File([''], ''));

            formData.append('accountName', accountName);
            formData.append('banking', bank);
            formData.append('accountNumber', accountBank);
            formData.append('accID', getID);


            const response = await axios.post('http://localhost:8080/api/payment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // hideCreatePayment();
            // console.log(hideCreatePayment());
            console.log(response.data);
            setSnackbarMessage('Create payment successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);
            window.location.reload();

        } catch (error) {
            console.error('Lỗi tạo tk:', error.response.data);
            setSnackbarMessage('Create payment failed :(((');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
    }

    // const handleImgBankChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImgBank(file);
    //         previewImage(file);
    //         console.log(file);
    //     }
    // };

    // const previewImage = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImgBankPreview(reader.result);
    //     };
    // };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="payment-container">

            <div className="register-form payment-form">
                <h1>Please provide a payment account to be able to book</h1>
                <h3>If you already have a payment account, skip this step</h3>
                <form onSubmit={handleCreatePayment}>
                    <h2>CREATE PAYMENT</h2>
                    <div className="line-container line-header">
                        <div className="line-register"></div>
                    </div>

                    {/* <div className="input-container">
                        <label htmlFor="avatar">Image Banking</label>
                        <input
                            type="file"
                            id="avatar"
                            onChange={handleImgBankChange}
                        />
                        {imgBankPreview && (
                            <div className="input-container">
                                <label>Avatar Preview:</label>
                                <img src={imgBankPreview} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                            </div>
                        )}
                    </div> */}

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type="Bank"
                            placeholder="Bank"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type="Account Number"
                            placeholder="Account Number"
                            value={accountBank}
                            onChange={(e) => setAccountBank(e.target.value)}
                        />
                    </div>


                    <button className="register-button" type="submit">Create</button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

            </div>
        </div>
    );
}