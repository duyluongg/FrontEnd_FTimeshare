import React, { useState, useEffect, useContext } from "react";
import payment from '../../assets/Payment.svg';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { UserContext } from '../UserContext';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from "react-router-dom";
import ModalCreateBook from "../OwnerRole/CreateBooking/ModalCreateBook.jsx";
import CreatePayment from "../Register/CreatePayment.jsx";

export default function Payment() {
    const [orderSummary, setOrderSummary] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [bankAccountQRCode, setBankAccountQRCode] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const { user } = useContext(UserContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const [productData, setProductData] = useState('');
    const [userData, setUserData] = useState('');
    const [typeName, setTypeName] = useState('');
    const location = useLocation();
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [showCreatePayment, setShowCreatePayment] = useState(false);

    const { startDate, endDate, bookingPerson, productID, name, phone } = location.state;

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const getProductData = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`);
                setProductData(productResponse.data[0]);

                const userResponse = await axios.get(`http://localhost:8080/api/users/viewDetail/${productResponse.data[0].accID}`);
                setUserData(userResponse.data);

                const productTypeResponse = await axios.get('http://localhost:8080/api/productType/customer/viewproductType');
                const productTypeData = productTypeResponse.data;

                const selectedProductType = productTypeData.find(type => type.productTypeID === productData.productTypeID);
                const typeName = selectedProductType ? selectedProductType.productTypeName : 'Unknown';
                setTypeName(typeName);

            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        getProductData();
    }, [user.id]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
            const totalPrice = daysDiff * productData.productPrice;
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [startDate, endDate, productData.productPrice]);

    useEffect(() => {
        const fetchBankAccount = async () => {
            try {
                const bankAccountResponse = await axios.get(`http://localhost:8080/api/payment/payment/${user.id}`);
                const bankAccount = bankAccountResponse.data;

                if (bankAccount.length === 0) {
                    // setHasBankAccount(true);
                    setShowCreatePayment(true);
                }

            } catch (error) {
                console.error('Error fetching bank account:', error);
            }
        };
        fetchBankAccount();
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
        const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

        try {
            const formData = new FormData();
            formData.append('bill', image);
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);
            formData.append('booking_person', bookingPerson);
            formData.append('acc_id', user.id);
            formData.append('productID', productID);

            const response = await axios.post('http://localhost:8080/api/bookings/customer/createbooking', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/view-booking-history');
            setSnackbarMessage('Booking successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error creating booking:', error.response.data);
            setSnackbarMessage('Booking failed :(((');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            previewImage(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="payment-container">
            <img src={payment} alt="payment" className="payment-image" />
            <div className="payment-details">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ width: '10%' }}>Customer Name</TableCell>
                                <TableCell align="left" style={{ width: '20%' }}>Phone</TableCell>
                                <TableCell align="left" style={{ width: '20%' }}>Product Name - Product Owner</TableCell>
                                <TableCell align="left" style={{ width: '10%' }}>Product Type</TableCell>
                                <TableCell align="left" style={{ width: '10%' }}>Number of People</TableCell>
                                <TableCell align="left" style={{ width: '15%' }}>StartDate</TableCell>
                                <TableCell align="left" style={{ width: '15%' }}>EndDate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{phone}</TableCell>
                                <TableCell align="left">{userData.accName} - </TableCell>
                                <TableCell align="left">{typeName}</TableCell>
                                <TableCell align="left">{bookingPerson}</TableCell>
                                <TableCell align="left">{startDate}</TableCell>
                                <TableCell align="left">{endDate}</TableCell>
                            </TableRow>
                            <TableRow style={{ height: '30px' }}></TableRow>
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Price ($/per-day)</TableCell>
                                <TableCell>${productData.productPrice}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell>${totalPrice}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="qr-code">
                    <h2>Bank Account QR Code</h2>
                    <img src={bankAccountQRCode} alt="bankAccountQRCode" />
                </div>
                <div className="upload-section">
                    <h2>Upload Payment Confirmation</h2>
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="input-container">
                            <label>Image Preview:</label>
                            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        </div>
                    )}
                </div>

                <div className="submit-section">
                    {showCreatePayment ? (
                        <CreatePayment getID={user.id} hideCreatePayment={() => setShowCreatePayment(false)} />
                    ) : (
                        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                    )}
                </div>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
            </div>
        </div>
    );
}
