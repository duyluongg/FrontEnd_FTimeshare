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
    const [rating, setRating] = useState('');

    const location = useLocation();
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [showCreatePayment, setShowCreatePayment] = useState(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const { startDate, endDate, bookingPerson, productID, name, phone } = location.state;
    const { checkInDate, checkOutDate, bookingPerson, productID } = location.state;
    console.log(checkInDate);

    const parsedStartDate = new Date(checkInDate);
    const parsedEndDate = new Date(checkOutDate);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formattedCheckInDate = `${weekdays[parsedStartDate.getDay()]}, ${months[parsedStartDate.getMonth()]} ${parsedStartDate.getDate()}, ${parsedStartDate.getFullYear()}`;
    const formattedCheckOutDate = `${weekdays[parsedEndDate.getDay()]}, ${months[parsedEndDate.getMonth()]} ${parsedEndDate.getDate()}, ${parsedEndDate.getFullYear()}`;

    // const navigate = useNavigate();

    useEffect(() => {
        const getProductData = async () => {
            try {
                const productResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/viewById/${productID}`);
                setProductData(productResponse.data[0]);

                const updatedProjects = await (async () => {
                    const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${productResponse.data[0].productID}`);
                    const rating = feedbackResponse.data;

                    return { rating };
                })();
                setRating(updatedProjects);
                console.log(updatedProjects);

                const userResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${productResponse.data[0].accID}`);
                setUserData(userResponse.data);

                const productTypeResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/productType/customer/viewproductType');
                const productTypeData = productTypeResponse.data;

                // const selectedProductType = productTypeData.find(type => type.productTypeID === productData.productTypeID);
                // const typeName = selectedProductType ? selectedProductType.productTypeName : 'Unknown';
                // setTypeName(typeName);

            } catch (error) {
                console.error('Error fetching data:', error.response);
            }
        };
        getProductData();
    }, [user.id]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const startDateObj = new Date(checkInDate);
            const endDateObj = new Date(checkOutDate);
            const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
            const totalPrice = daysDiff * productData.productPrice;
            setTotalDay(daysDiff);
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [checkInDate, checkOutDate, productData.productPrice]);

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

    useEffect(() => {
        const fetchBankAccount = async () => {
            try {
                const bankAccountResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/payment/payment/${user.id}`);
                const bankAccount = bankAccountResponse.data;
                console.log(bankAccount);

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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // const projectImage = images.find(image => image.productID === productData.productID);

    return (
        <>
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
                                                                        <h1 class="e1eebb6a1e">{productData.productName}</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="c624d7469d a0e60936ad a3214e5942">
                                                                    <div className="c624d7469d a0e60936ad a3214e5942">
                                                                        <span className="f419a93f12">
                                                                            <button aria-expanded="false" type="button" className="a83ed08757 a9377ef817">
                                                                                <div className="a53cbfa6de">{productData.productAddress}</div>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="c624d7469d f034cf5568 dab7c5c6fa a937b09340 a3214e5942 cbf4befc54">
                                                                            <div className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                                                <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />&nbsp;{rating.rating}</h3>
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
                                                                    <span className="bui-date__title">{formattedCheckInDate}</span>
                                                                </time>
                                                            </div>
                                                            <div className="bui-date-range__item">
                                                                <div id="bp-checkout-date__label" className="bui-date__label">Check-out</div>
                                                                <time className="bui-date bui-date--large">
                                                                    <span className="bui-date__title">{formattedCheckOutDate}</span>
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bui-group__item bui-group bui-group--small">
                                                        <div class="bui-group__item bui-f-font-emphasized">Total length of stay:</div>
                                                        <div class="bui-group__item bui-f-font-strong">
                                                            {totalDay} night
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
                                                                                        VND&nbsp;{totalPrice}
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
                                                                <div class="bui-group__item payment-user-info">{userData.accName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="email" className="bp_form__field__label">
                                                                    Email Address
                                                                </label>
                                                                <div class="bui-group__item payment-user-info">{userData.accEmail}</div>
                                                                {/* <input type="text" name="email" id="email" className="bp_input_text bp_form__field__input" value="Nguyễn Thị Ngọc Hân" size="20"></input> */}
                                                            </div>
                                                        </div>
                                                        <div className="bui-grid__column bui-grid__column-6@medium bui-grid__column-6@large">
                                                            <div className="bp_form__field bp_form__field--firstname">
                                                                <label for="phone" className="bp_form__field__label">
                                                                    Mobile Number
                                                                </label>
                                                                <div class="bui-group__item payment-user-info">{userData.accPhone}</div>
                                                                {/* <input type="text" name="phone" id="phone" className="bp_input_text bp_form__field__input" value="Nguyễn Thị Ngọc Hân" size="20"></input> */}
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
                                                        Payment Method
                                                    </h2>
                                                </div>
                                                <div class="x9mw82OGJDdT97ho7Wyc H6lzDEPPhc6rnad4mB7d A1lmouXAu10vISnnmR2M">Online Payment</div>
                                                {/* <div class="x9mw82OGJDdT97ho7Wyc H6lzDEPPhc6rnad4mB7d A1lmouXAu10vISnnmR2M">Securely add your payment methods to make it easier when you book.</div> */}
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
                                                                            {/* <CreatePayment getID={user.id} /> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="s7CqeD">
                                                        <div class="sQArKu">
                                                            <div class="xINqui">Click "Book" means you agree to abide by
                                                                <a target="_blank" rel="noopener noreferrer" previewlistener="true" className="payment-term"><ModalTerm /></a>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={`stardust-button stardust-button--CD9A2B stardust-button--large LtH6tW ${isLoading ? 'disabled' : ''}`}
                                                            onClick={handleSubmit}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? 'Booking...' : 'Book'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

        </>
    );
}
