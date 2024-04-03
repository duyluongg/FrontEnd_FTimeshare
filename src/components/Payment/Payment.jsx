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
import ModalTerm from "../Register/ModalTerm.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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

    // const { startDate, endDate, bookingPerson, productID, name, phone } = location.state;
    const { checkInDate, checkOutDate, bookingPerson, productID } = location.state;
    // console.log(checkInDate);
    // console.log(bookingPerson);
    // console.log(productID);

    // const formatDate = (date) => {
    //     const d = new Date(date);
    //     const year = d.getFullYear();
    //     const month = ('0' + (d.getMonth() + 1)).slice(-2);
    //     const day = ('0' + d.getDate()).slice(-2);
    //     return `${day}/${month}/${year}`;
    // };

    // const navigate = useNavigate();

    // useEffect(() => {
    //     const getProductData = async () => {
    //         try {
    //             const productResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/viewById/${productID}`);
    //             setProductData(productResponse.data[0]);

    //             const userResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${productResponse.data[0].accID}`);
    //             setUserData(userResponse.data);

    //             const productTypeResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/productType/customer/viewproductType');
    //             const productTypeData = productTypeResponse.data;

    //             const selectedProductType = productTypeData.find(type => type.productTypeID === productData.productTypeID);
    //             const typeName = selectedProductType ? selectedProductType.productTypeName : 'Unknown';
    //             setTypeName(typeName);

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             throw error;
    //         }
    //     };
    //     getProductData();
    // }, [user.id]);

    // useEffect(() => {
    //     const calculateTotalPrice = () => {
    //         const startDateObj = new Date(checkInDate);
    //         const endDateObj = new Date(checkOutDate);
    //         const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    //         const totalPrice = daysDiff * productData.productPrice;
    //         setTotalDay(daysDiff);
    //         setTotalPrice(totalPrice);
    //     };

    //     calculateTotalPrice();
    // }, [checkInDate, checkOutDate, productData.productPrice]);

    // useEffect(() => {
    //     const fetchImg = async () => {
    //         try {
    //             const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview`);
    //             setImages(response.data);
    //             // console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching view img:', error);
    //         }
    //     };
    //     fetchImg();
    // }, []);

    // useEffect(() => {
    //     const fetchBankAccount = async () => {
    //         try {
    //             const bankAccountResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/payment/payment/${user.id}`);
    //             const bankAccount = bankAccountResponse.data;

    //             if (bankAccount.length === 0) {
    //                 setHasBankAccount(false);
    //                 setShowPaymentMethod(false);
    //                 setShowPaymentConfirmation(false);
    //                 // setShowCreatePayment(true);
    //             } else {
    //                 setHasBankAccount(true);
    //                 setShowPaymentMethod(true);
    //                 setShowPaymentConfirmation(true);
    //             }

    //         } catch (error) {
    //             console.error('Error fetching bank account:', error);
    //         }
    //     };
    //     fetchBankAccount();
    // }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasBankAccount) {
            setSnackbarMessage('You must create payment first !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
            return;
        }

        const startDateObj = new Date(checkInDate);
        const endDateObj = new Date(checkOutDate);
        const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
        const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('bill', new File([''], ''));
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);
            formData.append('booking_person', bookingPerson);
            formData.append('acc_id', user.id);
            formData.append('productID', productID);

            const response = await axios.post('https://bookinghomestayswp.azurewebsites.net/api/bookings/customer/createbooking', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.href = response.data;
            // setSnackbarMessage('Booking successfully !!!')
            // setSnackbarColor("success");
            // setSnackbarOpen(true);
            // setTimeout(() => navigate('/view-booking-history'), 1000);

        } catch (error) {
            console.error('Error creating booking:', error.response);
            setSnackbarMessage('Booking failed !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
            setIsLoading(false);
        }
    };

    // const handleSnackbarClose = () => {
    //     setSnackbarOpen(false);
    // };

    // const projectImage = images.find(image => image.productID === productData.productID);

    return (

        <>
            {/* <div className="nApIIM">
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

                    <div className="payment-create">

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
                                                    <h3 class="_eH_h0">accName</h3>
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
                                                        <div className="FisIRS BeMjeR">{checkInDate} - {checkOutDate}</div>
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

                                {showPaymentMethod && (
                                    <div className="aSiS8B">
                                        <div className="IN_fAG">
                                            <div className="UPSKhT wp5W5e">Payment Method</div>
                                            <div className="LhNuge">Online Payment</div>

                                        </div>
                                    </div>
                                )}

                                {showPaymentConfirmation && (
                                    <div class="yHG0SE" aria-live="polite">
                                        <div className="yHG0SE-grid-3">

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
                                        <div class="xINqui">Click "Boooking" means you agree to abide by
                                            <a target="_blank" rel="noopener noreferrer" previewlistener="true" className="payment-term"><ModalTerm /></a>
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
            </div> */}


            <div id="bodyconstraint">
                <div id="bodyconstraint-inner">
                    <div className="bui-container booking-process__container js-booking-process__container js-booking-process__container--stage-2 e2e-stage-container">
                        <div className="bui-grid">
                            <aside className="bui-grid__column bui-grid__column-4@medium">
                                <div className="bui-group bui-group--large">
                                    <div className="bp-mfe-container--property-details">
                                        <div>
                                            <div className="c82435a4b8 a178069f51 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 b68dc84f99">
                                                <div className="c624d7469d a0e60936ad e8f9ae2be9 a3214e5942">
                                                    <div className="c624d7469d f034cf5568 e8f9ae2be9 a937b09340 a3214e5942">
                                                        <div className="dc5041d860 c72df67c95">
                                                            <div className="c624d7469d a0e60936ad a3214e5942">
                                                                <div className="c624d7469d dbf03e5db3 a3214e5942">
                                                                    <div class="">
                                                                        <h1 class="e1eebb6a1e">T Zone Hostel</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="c624d7469d a0e60936ad a3214e5942">
                                                                    <div className="c624d7469d a0e60936ad a3214e5942">
                                                                        <span className="f419a93f12">
                                                                            <button aria-expanded="false" type="button" className="a83ed08757 a9377ef817">
                                                                                <div className="a53cbfa6de">684/28 Đường Trần Hưng Đạo, District 5, Ho Chi Minh City, Vietnam</div>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="c624d7469d f034cf5568 dab7c5c6fa a937b09340 a3214e5942 cbf4befc54">
                                                                            <div className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                                                <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />&nbsp;4.5</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="bui-card bp-card--booking-summary bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-card__header bui-spacer--large ">
                                                <h2 class="bui-card__title">Your booking details</h2>
                                            </header>
                                            <div className="bui-group bui-group--large">
                                                <div className="bui-group bui-group--large">
                                                    <div className="bui-group__item">
                                                        <div className="bui-date-range bui-date-range--large bp-date-range">
                                                            <div className="bui-date-range__item">
                                                                <div id="bp-checkin-date__label" className="bui-date__label">Check-in</div>
                                                                <time className="bui-date bui-date--large">
                                                                    <span className="bui-date__title">Wed, Apr 3, 2024</span>
                                                                </time>
                                                            </div>
                                                            <div className="bui-date-range__item">
                                                                <div id="bp-checkout-date__label" className="bui-date__label">Check-out</div>
                                                                <time className="bui-date bui-date--large">
                                                                    <span className="bui-date__title">Wed, Apr 3, 2024</span>
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bui-group__item bui-group bui-group--small">
                                                        <div class="bui-group__item bui-f-font-emphasized">Total length of stay:</div>
                                                        <div class="bui-group__item bui-f-font-strong">
                                                            1 night
                                                        </div>
                                                    </div>
                                                    <div className="bui-card__text bp-price-details__total bp-price-details__total--discount-breakdown bp-price-details__total--discount-breakdown-with-bg bp-price-details__total--discount-breakdown-with-discount ">
                                                        <div className="bui-group bui-group--large">
                                                            <div className="bui-group__item">
                                                                <div className="bui-group bui-group--medium">
                                                                    <div className="bui-group__item">
                                                                        <div className="bp-price-details__total-line bp-price-details__total-line--user js-price-details__total-line--user e2e-price-details__total-line--user bp-price-details__total-line--v-align-end">
                                                                            <div className="bp-price-details__charge-type">
                                                                                <div class="bp-price-details__total-price bui-u-padding-end--8">
                                                                                    Total
                                                                                </div>
                                                                            </div>
                                                                            <div className="bui-u-text-right">
                                                                                <div class="bp-price-details__total-price --wrap-nowrap e2e-price-details__total-charge--user" data-price="154880" data-currency-code="VND" data-pd-total-usercurrency="">
                                                                                    <span className="" style={{ display: "inline-block" }}>
                                                                                        VND&nbsp;154,880
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="bui-u-text-right">
                                                                            <div class="bp-price-details__total--taxes-and-charges-info">
                                                                                Includes taxes and fees
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </aside>
                            <main id="content" className="bui-grid__column bui-grid__column-8@medium booking-process__content">
                                <div id="bookForm" className="book-form">
                                    <section className="bui-card bp-card--user-details bui-spacer--large  bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-inline-container">
                                                <div class="bui-inline-container__main">
                                                    <h2 class="bui-text--variant-headline_3">
                                                        Your information details
                                                    </h2>
                                                </div>
                                            </header>
                                            <div className="bui-card__text">
                                                <div className="bp-personal-details-form">
                                                    <div className="bui-grid bui-grid--size-small">
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="name" className="bp_form__field__label">
                                                                    Name
                                                                </label>
                                                                <input type="text" name="name" id="name" className="bp_input_text bp_form__field__input" value="Nguyễn Thị Ngọc Hân" size="20"></input>
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="email" className="bp_form__field__label">
                                                                    Email Address
                                                                </label>
                                                                <input type="text" name="email" id="email" className="bp_input_text bp_form__field__input" value="Nguyễn Thị Ngọc Hân" size="20"></input>
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="phone" className="bp_form__field__label">
                                                                    Mobile Number
                                                                </label>
                                                                <input type="text" name="phone" id="phone" className="bp_input_text bp_form__field__input" value="Nguyễn Thị Ngọc Hân" size="20"></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="bui-card bp-card--user-details bui-spacer--large  bui-u-bleed@small">
                                        <div className="bui-card__content">
                                            <header class="bui-inline-container">
                                                <div class="bui-inline-container__main">
                                                    <h2 class="bui-text--variant-headline_3">
                                                        Payment Details
                                                    </h2>
                                                </div>
                                                <div class="x9mw82OGJDdT97ho7Wyc H6lzDEPPhc6rnad4mB7d A1lmouXAu10vISnnmR2M">Securely add your payment methods to make it easier when you book.</div>
                                            </header>
                                            <div className="my-settings-row my-settings-edit-row--editing">
                                                <div className="my-settings-row">
                                                    <div className="my-settings-edit-row">
                                                        <div className="my-settings-col-shrink my-settings-cell-spacing">
                                                            <h2 id="1e980cc2-21c6-4425-ad21-9f1c127fe541_title" className="x9mw82OGJDdT97ho7Wyc my-settings-title bui-f-font-featured bui-spacer--large">
                                                                Payment cards
                                                            </h2>
                                                        </div>
                                                        <div className="my-settings-col-grow my-settings-cell-spacing">
                                                            <div className="my-settings-flex-by-row my-settings-flex-by-row--reverse">
                                                                <div className="my-settings-flex-grow">
                                                                    <div className="pc-pm-section">
                                                                        <div className="PaymentMethodSelectorstyles__PaymentMethodButtonsContainer-sc-2csqpk-1 dnrAFC single-payment-method desktop-mode">
                                                                            <h3 className="PaymentMethodSelectorstyles__PaymentMethodTitle-sc-2csqpk-4 cnZRHr">
                                                                                <div class="dFDboCg6ONrjf7Ra7Mvq"></div>
                                                                                <span>
                                                                                    <div className="AvailablePaymentMethods__AvailablePaymentMethodsContainer-sc-1pb77ap-0 ikbMPt bui-spacer--large pc-available-payment-methods-container">
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/amex.svg" alt="American Express" title="American Express" aria-hidden="false" height="18" width="30" className="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg" alt="MasterCard" title="MasterCard" aria-hidden="false" height="18" width="30" className="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/cartebancaire.svg" alt="Carte Bancaire" title="Carte Bancaire" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg" alt="JCB" title="JCB" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/diners.svg" alt="Diners Club" title="Diners Club" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg" alt="Discover" title="Discover" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg" alt="Visa" title="Visa" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                        <div className="PaymentMethodLogo__IconItem-sc-1y6kfmc-1 fsVPjJ payment-method-icon with-margin inlined">
                                                                                            <img src="//t-ec.bstatic.com/static/img/payments/payment_icons_redesign/unionpay.svg" alt="China UnionPay" title="China UnionPay" aria-hidden="false" height="18" width="30" class="PaymentMethodLogo__PaymentMethodImg-sc-1y6kfmc-0 croNNM" />
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </h3>
                                                                        </div>
                                                                        <div className="bui-spacer--large">
                                                                            <CreatePayment getID={user.id} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div class="s7CqeD">
                                        <div class="sQArKu">
                                            <div class="xINqui">Click "Boooking" means you agree to abide by
                                                <a target="_blank" rel="noopener noreferrer" previewlistener="true" className="payment-term"><ModalTerm /></a>
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
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
