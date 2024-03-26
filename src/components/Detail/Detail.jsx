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
import { format } from 'date-fns';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [productDetail, setProductDetail] = useState([]);
    const [showBookingButton, setShowBookingButton] = useState(false);
    const productId = useParams();
    // console.log(productId.id);
    const [activeContentIndex, setActiveContentIndex] = useState('');
    const [images, setImages] = useState([]);
    const [imagesSimilar, setImagesSimilar] = useState([]);
    const { user } = useContext(UserContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);


    useEffect(() => {

        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/viewById/${productId.id}`);
                const productData = response.data[0];
                const startDate = new Date(productData.availableStartDate[0], productData.availableStartDate[1] - 1, productData.availableStartDate[2], productData.availableStartDate[3], productData.availableStartDate[4]);
                const endDate = new Date(productData.availableEndDate[0], productData.availableEndDate[1] - 1, productData.availableEndDate[2], productData.availableEndDate[3], productData.availableEndDate[4]);
                const formattedStartDate = format(startDate, 'dd/MM/yyyy');
                const formattedEndDate = format(endDate, 'dd/MM/yyyy');
                productData.availableStartDate = formattedStartDate;
                productData.availableEndDate = formattedEndDate;
                setProductDetail(productData);
                setActiveContentIndex(productData.productDescription);

                const activeProductsResponse = await axios.get('http://localhost:8080/api/products/staff/active');
                const activeProducts = activeProductsResponse.data;

                // Lọc ra các sản phẩm có productTypeID giống với productDetail.productTypeID
                const filteredProducts = activeProducts.filter(product => product.productTypeID === productData.productTypeID);
                const updatedProjects = await Promise.all(filteredProducts.map(async (filteredProduct) => {
                    const feedbackResponse = await axios.get(`http://localhost:8080/api/feedback/average-feedback-rating/${filteredProduct.productID}`);
                    const rating = feedbackResponse.data;

                    return { ...filteredProduct, rating };
                }));
                setFilteredProducts(updatedProjects);

                const bestProjects = await Promise.all(activeProducts.map(async (activeProduct) => {
                    const feedbackResponse = await axios.get(`http://localhost:8080/api/feedback/average-feedback-rating/${activeProduct.productID}`);
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
        console.log("productDetail:", productDetail.accID);
        console.log("user:", user.id);
        if (productDetail.accID == user.id) {
            setShowBookingButton(false); // Nếu là chủ sở hữu, không hiển thị nút booking
        } else {
            setShowBookingButton(true);
        }
    }, [productDetail, user]);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pictures/viewPicture/${productId.id}`);
                setImages(response.data);
                // console.log(images);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };

        fetchImg();
    }, []);

    useEffect(() => {
        const fetchImageSimilar = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pictures/customerview`);
                setImagesSimilar(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };
        fetchImageSimilar();
    }, []);

    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        if (user && user.auth === true) {
            navigate('/create-booking', {
                state: {
                    productID: productId.id,
                    availableStartDate: productDetail.availableStartDate,
                    availableEndDate: productDetail.availableEndDate
                }
            });
        } else {
            alert('You need to login to create booking!');
            navigate('/login');
        }
    };

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
                                    <FontAwesomeIcon icon={faPerson} size={'2xl'} /> <a>2 Adults</a>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faChild} size={'2xl'} /> <a>1 Child</a>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faExpand} size={'2xl'} /> <a>Room 20m²</a>
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
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faPersonSwimming} size={'2xl'} /> <a>Pool</a>

                                    </div>
                                </div>


                                <div className='container-item-service-flex'>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faKitchenSet} size={'2xl'} /> <a>Kitchen</a>
                                    </div>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faCity} size={'2xl'} /> <a>City view</a>
                                    </div>
                                    <div className='container-item-service-item'>
                                        <FontAwesomeIcon icon={faTv} size={'2xl'} /> <a>Television</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form'>
                            <h1 className='form-border-bottom'>Booking Information</h1>
                            <h1 className='form-cost'>${productDetail.productPrice}/Day</h1>
                            <p className="form-time"><FontAwesomeIcon className="icon-calendar" icon={faCalendarDay} size={'2xl'} /> {productDetail.availableStartDate} - {productDetail.availableEndDate}</p>
                            {showBookingButton && (
                                <form className='form-item' onSubmit={handleBooking}>
                                    <div className='column-form column-2'>
                                        <button type="submit">Booking</button>
                                    </div>
                                </form>
                            )}
                        </div>
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
                                                            <a href={`/detail/${prjsimi.productID}`}>
                                                                <button
                                                                    // onClick={() => handleProjectClick(prjsimi)}
                                                                    className='project-list-button-view'
                                                                >
                                                                    <span className='project-list-view'>View</span>
                                                                </button>
                                                            </a>
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
                                                <a href={`/detail/${room.productID}`}>
                                                    <div className='room-detail'>
                                                        <h2>{room.productName}</h2>
                                                        <p>${room.productPrice}</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}