
import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from "react-router";
import * as Yup from 'yup';

export default function CreatePayment({ getID }) {
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
    const [errors, setErrors] = useState({});
    const [bankList, setBankList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(hideCreatePayment);
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const navigate = useNavigate();

    const schema = Yup.object().shape({
        accountName: Yup.string().required('Account Name is required'),
        bank: Yup.string().required('Bank is required'),
        accountBank: Yup.string().required('Account Bank is required')
    });

    const handleCreatePayment = async (e) => {
        e.preventDefault();
        let hasError = false;

        try {
            await schema.validate({
                accountName,
                bank,
                accountBank
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

        if (!hasError) {
            setIsLoading(true);
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
                setIsLoading(false);
            }
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

    useEffect(() => {
        const fetchBankName = async () => {
            try {
                const response = await axios.get(`https://api.vietqr.io/v2/banks`);

                setBankList(response.data.data);
                // console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };
        fetchBankName();
    }, []);

    const handleBankChange = (e) => {
        setBank(e.target.value);
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
                            style={{ borderColor: errors.accountName ? 'red' : null }}
                        />
                        {errors.accountName && <p style={{ color: 'red' }}>{errors.accountName}</p>}
                    </div>

                    {/* <div className="input-container">
                        <input
                            type="Bank"
                            placeholder="Bank"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            style={{ borderColor: errors.bank ? 'red' : null }}
                        />
                        {errors.bank && <p style={{ color: 'red' }}>{errors.bank}</p>}
                    </div> */}

                    <div className="input-container">
                        <select
                            value={bank}
                            onChange={handleBankChange}
                            style={{ borderColor: errors.bank ? 'red' : null }}
                        >
                            <option value="">Select a bank</option>
                            {bankList.map(bankItem => (
                                <option key={bankItem.id} value={bankItem.name}>{bankItem.name} - {bankItem.shortName}</option>
                            ))}
                        </select>
                        {errors.bank && <p style={{ color: 'red' }}>{errors.bank}</p>}
                    </div>

                    <div className="input-container">
                        <input
                            type="Account Number"
                            placeholder="Account Number"
                            value={accountBank}
                            onChange={(e) => setAccountBank(e.target.value)}
                            style={{ borderColor: errors.accountBank ? 'red' : null }}
                        />
                        {errors.accountBank && <p style={{ color: 'red' }}>{errors.accountBank}</p>}
                    </div>


                    {/* <button className="register-button" type="submit">Create</button> */}
                    <button
                        className={`register-button ${isLoading ? 'disabled' : ''}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create'}
                    </button>
                </form>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

            </div>
        </div>
    );
}