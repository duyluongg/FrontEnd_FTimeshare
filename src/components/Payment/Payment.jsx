import React, { useState, useEffect } from "react";
import payment from '../../assets/Payment.svg';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import SnackBar from "../SnackBar.jsx";
import { useNavigate } from "react-router-dom";
import ModalCreateBook from "../OwnerRole/CreateBooking/ModalCreateBook.jsx";

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
                // Fetch dự án dựa trên productID
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`);
                // const productData = productResponse.data;
                setProductData(productResponse.data[0]);

                // Lấy thông tin người dùng từ product.accId
                const userResponse = await axios.get(`http://localhost:8080/api/users/viewDetail/${productResponse.data[0].accID}`);
                // const userData = userResponse.data;
                setUserData(userResponse.data);

                // Lấy thông tin loại sản phẩm từ product.productTypeId
                const productTypeResponse = await axios.get('http://localhost:8080/api/productType/customer/viewproductType');
                const productTypeData = productTypeResponse.data;

                // Tìm kiếm thông tin loại sản phẩm dựa trên productTypeId
                const selectedProductType = productTypeData.find(type => type.productTypeID === productData.productTypeID);
                const typeName = selectedProductType ? selectedProductType.productTypeName : 'Unknown';
                setTypeName(typeName);

            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // Bạn có thể xử lý lỗi theo ý của bạn ở đây
            }
        };
        getProductData();
    }, [user.id]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            // Chuyển các ngày thành đối tượng Date
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
            const totalPrice = daysDiff * productData.productPrice;
            setTotalPrice(totalPrice);
        };
    
        calculateTotalPrice();
    }, [startDate, endDate, productData.productPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo một đối tượng Date từ chuỗi ngày tháng đầu vào
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Chuyển đổi thành chuỗi theo định dạng mong muốn "yyyy-MM-ddTHH:mm:ss"
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
            console.error('Lỗi đăng ký người dùng:', error.response.data); // Xử lý lỗi
            setSnackbarMessage('Booking failed :(((');
            setSnackbarColor("error");
            // Thiết lập thông điệp Snackbar
            setSnackbarOpen(true); // Hiển thị Snackbar
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            previewImage(file);
            console.log(file);
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

                    {/* <button onClick={handleSubmit}>Submit</button> */}

                        <ModalCreateBook handleModal={handleSubmit} />
                </div>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

            </div>
        </div>
    );
}
