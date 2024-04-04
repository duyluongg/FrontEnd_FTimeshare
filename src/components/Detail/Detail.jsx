import React from 'react'
import { useState } from "react";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Review from '../Review/Review.jsx'
import FormFeedback from '../FormFeedback/FormFeedback.jsx'
import FormReport from '../FormReport/FormReport.jsx'
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import { ProjectsDataSimilar } from '../../Shared/ListOfProjectSimilar';
import { RoomData } from '../../Shared/Room';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { addDays } from 'date-fns';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import ReviewCustomer from './ReviewCustomer.jsx'
// import ViewFeedback from './ViewFeedback.jsx';
import {
    faPerson, faChild, faExpand, faBath,
    faKitchenSet,
    faWifi,
    faCity,
    faPersonSwimming,
    faTv
} from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import CustomDatePicker from '../OwnerRole/CreateBooking/CustomDatePicker.jsx';



function SampleNextArrow({ onClick }) {

    return (
        <div className='arrow-detail arrow-right' onClick={onClick}>
            <MdArrowForwardIos />
        </div>

    );
}

function SamplePrevArrow({ onClick }) {

    return (
        <div className='arrow-detail arrow-left' onClick={onClick}>
            <MdArrowBackIosNew />
        </div>

    );
}

function SampleNextArrowSt2({ onClick }) {

    return (
        <div className='arrowst-detail arrowst-right-detail' onClick={onClick}>
            <MdArrowForwardIos color='white' />
        </div>

    );
}

function SamplePrevArrowSt2({ onClick }) {

    return (
        <div className='arrowst-detail arrowst-left-detail' onClick={onClick}>
            <MdArrowBackIosNew color='white' />
        </div>

    );
}

export default function Detail() {

    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrowSt2 />,
        prevArrow: < SamplePrevArrowSt2 />
    };

    const [productDetail, setProductDetail] = useState([]);
    const [showBookingButton, setShowBookingButton] = useState(false);
    const productId = useParams();
    const [activeContentIndex, setActiveContentIndex] = useState('');
    const [images, setImages] = useState([]);
    const [imagesSimilar, setImagesSimilar] = useState([]);
    const { user } = useContext(UserContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [checkAvailableProducts, setCheckAvailableProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [numberOfPerson, setNumberOfPerson] = useState(1);
    const [bookedDate, setBookedDate] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedNumberOfPerson, setSelectedNumberOfPerson] = useState(1);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [availabilityMessage, setAvailabiltyMessage] = useState("");

    const token = sessionStorage.getItem('token');
    console.log(token);

    const handleFindAvailability = async (e) => {
        e.preventDefault();

        const validationErrors = {}
        if (!checkInDate) {
            validationErrors.checkInDate = "Start date is required";
        }

        if (!checkOutDate) {
            validationErrors.checkOutDate = "End date is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const startDateObj = new Date(checkInDate);
            const endDateObj = new Date(checkOutDate);
            const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
            const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

            const formData = new FormData();
            formData.append('productID', productId.id);
            formData.append('booking_person', numberOfPerson);
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);


            const response = await axios.post('https://bookinghomestayswp.azurewebsites.net/api/bookings/customer/checkbooking', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setCheckAvailableProducts(response.data);
            setFormSubmitted(true);
            setSelectedNumberOfPerson(numberOfPerson);
        } catch (error) {
            console.error('Check availability failed', error.response.data);
            setFormSubmitted(true);
            setCheckAvailableProducts([]);
            setAvailabiltyMessage(error.response.data);
            // console.log(checkAvailableProducts);
        }
    }

    useEffect(() => {

        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/viewById/${productId.id}`);
                console.log(response.data[0]);
                const productData = response.data[0];
                // const startDate = new Date(productData.availableStartDate[0], productData.availableStartDate[1] - 1, productData.availableStartDate[2], productData.availableStartDate[3], productData.availableStartDate[4]);
                // const endDate = new Date(productData.availableEndDate[0], productData.availableEndDate[1] - 1, productData.availableEndDate[2], productData.availableEndDate[3], productData.availableEndDate[4]);
                // const formattedStartDate = format(startDate, 'dd/MM/yyyy');
                // const formattedEndDate = format(endDate, 'dd/MM/yyyy');
                // productData.availableStartDate = formattedStartDate;
                // productData.availableEndDate = formattedEndDate;
                setProductDetail(productData);
                setActiveContentIndex(productData.productDescription);

                const activeProductsResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/active');
                const activeProducts = activeProductsResponse.data;

                // Lọc ra các sản phẩm có productTypeID giống với productDetail.productTypeID
                const filteredProducts = activeProducts.filter(product => product.productTypeID === productData.productTypeID);
                const updatedProjects = await Promise.all(filteredProducts.map(async (filteredProduct) => {
                    const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${filteredProduct.productID}`);
                    const rating = feedbackResponse.data;

                    return { ...filteredProduct, rating };
                }));
                setFilteredProducts(updatedProjects);

                const bestProjects = await Promise.all(activeProducts.map(async (activeProduct) => {
                    const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${activeProduct.productID}`);
                    const rating = feedbackResponse.data;

                    return { ...activeProduct, rating };
                }));

                bestProjects.sort((a, b) => b.rating - a.rating);

                const top4Projects = bestProjects.slice(0, 4);
                setBestProducts(top4Projects);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductDetail();
    }, [productId.id, setActiveContentIndex]);

    useEffect(() => {
        // console.log("productDetail:", productDetail.accID);
        // console.log("user:", user.id);
        if (productDetail.accID == user.id) {
            setShowBookingButton(false);
        } else {
            setShowBookingButton(true);
        }
    }, [productDetail, user]);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/pictures/viewPicture/${productId.id}`);
                setImages(response.data);
                // console.log(images);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };

        fetchImg();
    }, [productId.id]);

    useEffect(() => {
        const fetchImageSimilar = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview`);
                setImagesSimilar(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };
        fetchImageSimilar();
    }, [productId.id]);

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/view/bookedDate/${productId.id}`);
                console.log(response.data);
                setBookedDate(response.data);

            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, []);

    const convertDate = (dateArray) => {
        const formattedDates = dateArray.map(date => {
            const year = date[0];
            const month = String(date[1]).padStart(2, '0');
            const day = String(date[2]).padStart(2, '0');
            return `${day}/${month}/${year}`;
        });
        return formattedDates;
    };

    const formattedBookedDates = convertDate(bookedDate);
    // console.log(formattedBookedDates);

    const navigate = useNavigate();

    const handleReserve = async (e) => {
        e.preventDefault();
        if (user && user.auth === true) {
            navigate('/payment', {
                state: {
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    bookingPerson: numberOfPerson,
                    productID: productId.id,
                }
            });
        } else {
            alert('You need to login to create booking!');
            navigate('/login');
        }
    };

    // const handleReserve = async (e) => {
    //     e.preventDefault();
    //     if (user && user.auth === true) {
    //         navigate('/create-booking', {
    //             state: {
    //                 productID: productId.id,
    //                 availableStartDate: productDetail.availableStartDate,
    //                 availableEndDate: productDetail.availableEndDate
    //             }
    //         });
    //     } else {
    //         alert('You need to login to create booking!');
    //         navigate('/login');
    //     }
    // };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId.id]);

    return (
        <>
            <div className='container-detail'>
                <div className='container-item'>
                    <div className='container-item-img'>
                        <div>
                            <Slider {...settings}>
                                <div className='container-item-img-item'>
                                    {images.length > 0 && <img src={images[0].imgName} />}
                                </div>
                                <div className='container-item-img-item'>
                                    {images.length > 0 && <img src={images[1].imgName} />}
                                </div>
                                <div className='container-item-img-item'>
                                    {images.length > 0 && <img src={images[3].imgName} />}
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className='grid-body'>
                        <div>
                            <div className='container-title'>{productDetail.productName}</div>
                            <div className='container-icon'>
                                <div>
                                    <FontAwesomeIcon icon={faPerson} size={'2xl'} /> <a>{productDetail.productPerson} people</a>
                                </div>
                                {/* <div>
                                    <FontAwesomeIcon icon={faChild} size={'2xl'} /> <a>1 Child</a>
                                </div> */}
                                <div>
                                    <FontAwesomeIcon icon={faExpand} size={'2xl'} /> <a>{productDetail.productArea}m²</a>
                                </div>

                            </div>
                            <div className='container-item-service-title'>
                                Service
                            </div>
                            <div className='container-item-service'>
                                <div className='container-item-service-flex'>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faBath} size={'2xl'} /> <a>Bathtub</a>

                                    </div>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faWifi} size={'2xl'} /> <a>Wifi</a>

                                    </div>
                                    {/* <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faPersonSwimming} size={'2xl'} /> <a>Pool</a>
                                    </div> */}
                                </div>


                                <div className='container-item-service-flex'>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faKitchenSet} size={'2xl'} /> <a>Kitchen</a>
                                    </div>
                                    {/* <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faCity} size={'2xl'} /> <a>City view</a>
                                    </div> */}
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faTv} size={'2xl'} /> <a>Television</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form'>
                            <form className='availability-form' onSubmit={handleFindAvailability}>
                                <div data-testid="searchbox-layout-wide" className='ffb9c3d6a3 c9a7790c31 e691439f9a'>
                                    <div className='availability-item'>
                                        <div tabindex="-1" className='a1139161bf'>
                                            <div className='f73e6603bf'>
                                                <div>
                                                    <CustomDatePicker
                                                        bookedDates={formattedBookedDates}
                                                        // selectedDate={checkInDate}
                                                        selectedStartDate={selectedStartDate}

                                                        onChange={(date) => setCheckInDate(date)}
                                                        label="Check-in date"
                                                        error={errors.checkInDate}
                                                    />
                                                    {errors.checkInDate && <span style={{ color: 'red' }}>{errors.checkInDate}</span>}
                                                </div>
                                                <div>
                                                    <CustomDatePicker
                                                        bookedDates={formattedBookedDates}
                                                        // selectedDate={checkOutDate}
                                                        selectedStartDate={checkInDate} 

                                                        onChange={(date) => setCheckOutDate(date)}
                                                        label="Check-out date"
                                                        error={errors.checkOutDate}
                                                    />
                                                    {errors.checkOutDate && <span style={{ color: 'red' }}>{errors.checkOutDate}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='availability-item'>
                                        <div tabindex="-1" className='d777d2b248'>
                                            <button aria-expanded="false" type="button" className='a83ed08757 ebbedaf8ac ada2387af8'>
                                                <span className='a8887b152e'>
                                                    <span className="fcd9eec8fb a6a399739a c2cc050fb8 c696a7d242" aria-hidden="true">
                                                        <FontAwesomeIcon className='filter-icon' icon={faUser} />
                                                    </span>
                                                </span>
                                                <input
                                                    className='a83ed08757 ebbedaf8ac ada2387af8 input-filter-outline'
                                                    type="number"
                                                    value={numberOfPerson}
                                                    onChange={(e) => setNumberOfPerson(e.target.value)}
                                                    aria-label="Number of People"
                                                    min={1}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='availability-item d12ff5f5bf'>
                                        <button type="submit" className="a83ed08757 c21c56c305 a4c1805887 f671049264 d2529514af c082d89982 cceeb8986b">
                                            <span className="e4adce92df e4adce92df-text-size">Check availability</span>
                                        </button>
                                    </div>
                                </div>
                            </form >
                            {formSubmitted && checkAvailableProducts === 'Your booking is acceptable' ? (
                                <>
                                    <h1 className='form-cost'><FontAwesomeIcon className="icon-calendar" icon={faDollarSign} />&nbsp;{productDetail.productPrice}/Day</h1>
                                    <p className="form-time"><FontAwesomeIcon className="icon-calendar" icon={faCalendarDays} />&nbsp;{format((checkInDate), 'MMMM d, yyyy')} to {format((checkOutDate), 'MMMM d, yyyy')}</p>
                                    <p className="form-time"><FontAwesomeIcon className="icon-calendar" icon={faUser} />&nbsp;{selectedNumberOfPerson}</p>
                                    <p className="form-rule"><FontAwesomeIcon icon={faCheck} />&nbsp;100% refund if canceled before {format(addDays(checkInDate, -1), 'MMMM d, yyyy')}</p>
                                    <p className="form-rule"><FontAwesomeIcon icon={faCheck} />&nbsp;80% refund if canceled on {format(addDays(checkInDate, -1), 'MMMM d, yyyy')}</p>
                                    {showBookingButton && (
                                        <form className='form-item' onSubmit={handleReserve}>
                                            <div className='column-form column-2'>
                                                <button type="submit">Reserve</button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            ) : (
                                formSubmitted && checkAvailableProducts.length === 0 ? (
                                    <p className="form-noAvailability"><FontAwesomeIcon icon={faXmark} />&nbsp;{availabilityMessage}</p>
                                ) : null
                            )}

                        </div>
                    </div>

                    <div id='tabs'>
                        <menu>
                            <button
                                className={`custom-button ${activeContentIndex === productDetail.productDescription ? "active" : ""}`}
                                onClick={() => {
                                    setActiveContentIndex(productDetail.productDescription);
                                    setProductDetail(productDetail);
                                }}
                            >
                                Popular
                            </button>
                            <button
                                className={`custom-button ${activeContentIndex === productDetail.productConvenience ? "active" : ""}`}
                                onClick={() => {
                                    setActiveContentIndex(productDetail.productConvenience);
                                    setProductDetail(productDetail);
                                }}
                            >
                                Core Features
                            </button>
                        </menu>

                        <div id="tab-content">

                            <div>
                                {activeContentIndex === productDetail.productDescription && (
                                    <div>
                                        <p>{productDetail.productDescription}</p>
                                        <p>Free services: {productDetail.productConvenience}</p>
                                        <p>Check-out time: {productDetail.availableEndDate}</p>
                                        <p>Payment method: {productDetail.productDescription}</p>
                                    </div>
                                )}
                                {activeContentIndex === productDetail.productConvenience && (
                                    <p>{productDetail.productConvenience}</p>
                                )}
                            </div>

                        </div>
                        {/* <FormFeedback getID={productId.id}/> */}
                        {/* <FormReport getID={productId.id}/> */}
                        {/* <ViewFeedback /> */}

                        <ReviewCustomer getID={productId.id} />

                        <div>

                            <div className='project-similar'>
                                <div>
                                    <div className='project-simi-title'>Similar Rooms</div>

                                    <div className='project-detail'>
                                        <Slider {...settings2}>
                                            {filteredProducts.map((prjsimi) => {
                                                const productSimilarImage = imagesSimilar.find(imageSimilar => imageSimilar.productID === prjsimi.productID);

                                                return (
                                                    <div key={prjsimi.productID}>
                                                        <div className='card-detail'>
                                                            <div className='img-detail'>
                                                                {productSimilarImage && <img src={productSimilarImage.imgName} />}
                                                            </div>
                                                            <div className='project-list-detail'>
                                                                <div className='project-list-title'>
                                                                    <h3 className='project-list-name'>{prjsimi.productName}</h3>
                                                                    <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{prjsimi.rating}</h3>
                                                                </div>
                                                                <h4 className='project-list-description'>{prjsimi.productDescription}</h4>
                                                                <div className='project-list-cost'>
                                                                    ${prjsimi.productPrice} <a>/ night</a>
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {/* <a href={`/detail/${prjsimi.productID}`}>
                                                                    <button
                                                                        // onClick={() => handleProjectClick(prjsimi)}
                                                                        className='project-list-button-view'
                                                                    >
                                                                        <span className='project-list-view'>View</span>
                                                                    </button>
                                                                </a> */}

                                                                <Link to={`/detail/${prjsimi.productID}`}>
                                                                    <button className='project-list-button-view'>
                                                                        <span className='project-list-view'>View</span>
                                                                    </button>
                                                                </Link>

                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </Slider>
                                    </div>

                                </div>

                                <div>
                                    <div className='room-title'>Best Room</div>
                                    <div className='room-item'>
                                        {bestProducts.map((room) => (
                                            <div key={room.id}>
                                                <div className='room-card'>
                                                    <div className='img-room'>
                                                        {imagesSimilar.map((imageSimilar) => {
                                                            if (imageSimilar.productID === room.productID) {
                                                                return <img src={imageSimilar.imgName} />;
                                                            }
                                                            return null;
                                                        })}
                                                    </div>
                                                    {/* <a href={`/detail/${room.productID}`}>
                                                        <div className='room-detail'>
                                                            <h2>{room.productName}</h2>
                                                            <p>${room.productPrice}</p>
                                                        </div>
                                                    </a> */}
                                                    <Link to={`/detail/${room.productID}`}>
                                                        <div className='room-detail'>
                                                            <h2>{room.productName}</h2>
                                                            <p>${room.productPrice}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )

}