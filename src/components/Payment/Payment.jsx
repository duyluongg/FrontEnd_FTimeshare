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
    const [totalDay, setTotalDay] = useState('');
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
    const [images, setImages] = useState([]);


    const location = useLocation();
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [showCreatePayment, setShowCreatePayment] = useState(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { startDate, endDate, bookingPerson, productID, name, phone } = location.state;

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${day}/${month}/${year}`;
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
            // const servicePrice = totalPrice * 0.1;
            setTotalDay(daysDiff);
            setTotalPrice(totalPrice);
            // setServicePrice(servicePrice);
            // setFinalTotalPrice(totalPrice + servicePrice);
        };

        calculateTotalPrice();
    }, [startDate, endDate, productData.productPrice]);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pictures/customerview`);
                setImages(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };
        fetchImg();
    }, []);

    useEffect(() => {
        const fetchBankAccount = async () => {
            try {
                const bankAccountResponse = await axios.get(`http://localhost:8080/api/payment/payment/${user.id}`);
                const bankAccount = bankAccountResponse.data;

                if (bankAccount.length === 0) {
                    setHasBankAccount(false);
                    setShowPaymentMethod(false);
                    setShowPaymentConfirmation(false);
                    // setShowCreatePayment(true);
                } else {
                    setHasBankAccount(true);
                    setShowPaymentMethod(true);
                    setShowPaymentConfirmation(true);
                }

            } catch (error) {
                console.error('Error fetching bank account:', error);
            }
        };
        fetchBankAccount();
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasBankAccount) {
            setSnackbarMessage('You must create payment first !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
            return;
        }

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
        const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

        setIsLoading(true);

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
            setSnackbarMessage('Booking successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);
            setTimeout(() => navigate('/view-booking-history'), 1000);

        } catch (error) {
            console.error('Error creating booking:', error.response.data);
            setSnackbarMessage('Booking failed !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
            setIsLoading(false);
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

    const projectImage = images.find(image => image.productID === productData.productID);

    return (

        <>
            <div className="nApIIM">
                <div className="iAQnc1">
                    <div class="iAQnc1-container">
                        <div class="tfMaBS">
                            <a class="fQqDFE" href="/" previewlistener="true">
                                <h1 class="cE_Tbx">Payment</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="HYmUPs-container">
                <div className="HYmUPs">
                    {/* <img src={payment} alt="payment" className="payment-image" /> */}
                    <div className="payment-create">
                        {/* <CreatePayment getID={user.id} hideCreatePayment={() => setShowCreatePayment(false)} /> */}
                        <CreatePayment getID={user.id} />
                    </div>
                    <div className="payment-details">
                        <div class="booking-item">
                            <div className="UWJJw6">
                                <div className="kvWjhK">
                                    <div class="iSSCtq">
                                        <div class="k7UefF l0wK0t">
                                            <h2 class="zgWBzz">Homestay Owner</h2>
                                        </div>
                                        <div class="k7UefF zQOVG9"></div>
                                        <div class="k7UefF">Price($/day)</div>
                                        <div class="k7UefF">People</div>
                                        <div class="k7UefF J2gurn">Time</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="QroV_K">
                                        <div>
                                            <div className="A3VoHf">
                                                <div className="v1pNKv">
                                                    <h3 class="_eH_h0">{userData.accName}</h3>
                                                </div>
                                                <div className="_MbENL">
                                                    <div className="CZ00qG gTUoYD">
                                                        <div className="FisIRS ysaw0G">
                                                            {projectImage && <img src={projectImage.imgName} class="Yzo0tI" alt="product image" width="40" height="40" />}
                                                            <span className="dUcW_h">
                                                                <span className="TvB7XR">{productData.productName}</span>
                                                            </span>
                                                        </div>
                                                        <div className="FisIRS ri4hV6"></div>
                                                        <div class="FisIRS">${productData.productPrice}</div>
                                                        <div class="FisIRS">{bookingPerson}</div>
                                                        <div class="FisIRS BeMjeR">{formatDate(startDate)} to {formatDate(endDate)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="vhebLm"></div>
                                            <div className="IyTouc">
                                                <div class="TSU9pp">
                                                    <h3 class="o13Lc4 hERTPn ZAZB4U">
                                                        <div>Total Price:</div>
                                                    </h3>
                                                    <div class="o13Lc4 X9R_0O ZAZB4U pAqjyR sJTpuC">${totalPrice}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="N02iLl">
                                {/* <div className="aSiS8B">
                                    <div class="IN_fAG">
                                        <div class="UPSKhT wp5W5e">Payment Method</div>
                                        <div class="LhNuge">Online Payment</div>
                                        <button class="BM_J3y div-style">Thay đổi</button>
                                    </div>
                                </div> */}
                                {showPaymentMethod && (
                                    <div className="aSiS8B">
                                        <div className="IN_fAG">
                                            <div className="UPSKhT wp5W5e">Payment Method</div>
                                            <div className="LhNuge">Online Payment</div>
                                            {/* <button className="BM_J3y div-style">Thay đổi</button> */}
                                        </div>
                                    </div>
                                )}

                                {showPaymentConfirmation && (
                                    <div class="yHG0SE" aria-live="polite">
                                        <div className="yHG0SE-grid-3">
                                            <div className="qr-code">
                                                <h2>Bank Account QR Code</h2>
                                                {/* <img src= './image/QR.png' alt="bankAccountQRCode" style="width: 100px; height: auto;"/> */}
                                                <div className="qr-code-image">
                                                    <img src="./image/QR.png" alt="bankAccountQRCode" style={{ width: "100px", height: "auto" }} />
                                                </div>
                                            </div>
                                            <div className="upload-section">
                                                <h2>Upload Payment Confirmation</h2>
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                                <div className="payment-image-container">
                                                    {imagePreview && (
                                                        <div className="input-container">
                                                            {/* <label>Image Preview:</label> */}
                                                            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="yHG0SE-grid-9">
                                            <h2 class="a11y-visually-hidden"></h2>
                                            <div class="payment-flex">
                                                <h3 class="o13Lc4 hERTPn cFXdGN">Price($/day)</h3>
                                                <div class="o13Lc4 X9R_0O cFXdGN">${productData.productPrice}</div>
                                            </div>
                                            <div class="payment-flex">
                                                <h3 class="o13Lc4 hERTPn fwPZIN">Total Day</h3>
                                                <div class="o13Lc4 X9R_0O fwPZIN">${totalDay}</div>
                                            </div>
                                            <div class="payment-flex">
                                                <h3 class="o13Lc4 hERTPn cNgneA">Total Price</h3>
                                                <div class="o13Lc4 fYeyE4 X9R_0O cNgneA">${totalPrice}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div class="s7CqeD">
                                    <div class="sQArKu">
                                        <div class="xINqui">Clicking "Boooking" means you agree to abide by
                                            <a href="https://help.shopee.vn/portal/article/77242" target="_blank" rel="noopener noreferrer" previewlistener="true" className="payment-term"> P-Timeshare's Terms</a>
                                        </div>
                                    </div>
                                    <button
                                        className={`stardust-button stardust-button--CD9A2B stardust-button--large LtH6tW ${isLoading ? 'disabled' : ''}`}
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Booking...' : 'Booking'}
                                    </button>
                                </div>
                                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
