import React from 'react'
import { useState } from "react";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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
    // const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const productId = useParams();
    console.log(productId.id);
    const [activeContentIndex, setActiveContentIndex] = useState('');
    const [images, setImages] = useState([]);

    const { user } = useContext(UserContext);


    useEffect(() => {

        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/viewById/${productId.id}`);
                setProductDetail(response.data[0]);

                const defaultContentIndex = productDetail.productDescription;
                // setActiveContentIndex(defaultContentIndex);
                setActiveContentIndex(response.data[0].productDescription);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductDetail();
    }, [productId.id]);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pictures/viewPicture/${productId.id}`);
                setImages(response.data);
                console.log(images);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };

        fetchImg();
    }, []);

    // const [totalDays, setTotalDays] = useState(0);
    // const [totalCost, setTotalCost] = useState(0);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setBookingData({
    //         ...bookingData,
    //         [name]: value,
    //     });
    // };

    // const calculateTotal = () => {
    //     const start = new Date(bookingData.startDate);
    //     const end = new Date(bookingData.endDate);
    //     const diffTime = Math.abs(end - start);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     setTotalDays(diffDays);
    //     // Giả sử price là 1000 đơn vị tiền tệ mỗi ngày
    //     const pricePerDay = productDetail.productPrice;
    //     const totalCost = diffDays * pricePerDay;
    //     setTotalCost(totalCost);
    // };

    const navigate = useNavigate();

    console.log(productDetail.availableStartDate);

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

    // if (!productDetail) {
    //     return <div>Loading...</div>;
    // }

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

                                {/* {images.length >= 3 && (
                                    <>
                                        <div className='container-item-img-item'>
                                            <img src={images[0].imgName} />
                                        </div>
                                        <div className='container-item-img-item'>
                                            <img src={images[1].imgName} />
                                        </div>
                                        <div className='container-item-img-item'>
                                            <img src={images[2].imgName} />
                                        </div>
                                    </>
                                )}
                                {images.length < 3 && (
                                    <>
                                        {images.map((image, index) => (
                                            <div className='container-item-img-item' key={index}>
                                                <img src={images[index % images.length].imgName} />
                                            </div>
                                        ))}
                                    </>
                                )} */}
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
                            <h1 className='form-cost'>${productDetail.productPrice}/Day</h1>

                            <form className='form-item' onSubmit={handleBooking}>
                                <div className='column-form column-1'>
                                </div>
                                <div className='column-form column-2'>
                                    <button type="submit">Booking</button>
                                </div>
                            </form>
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
                                        {ProjectsDataSimilar.map((prjsimi) => (
                                            <div key={prjsimi.id}>
                                                <div className='column'>
                                                    <div className='card-detail'>
                                                        <div className='img-detail'>
                                                            <img src={prjsimi.img} alt={prjsimi.name} />
                                                        </div>
                                                        <div className='project-list-detail'>
                                                            <div className='project-list-title'>
                                                                <h3 className='project-list-name'>{prjsimi.name}</h3>
                                                                <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{prjsimi.feedback}</h3>

                                                            </div>
                                                            <h4>{prjsimi.adr}</h4>
                                                            <div className='project-list-cost'>
                                                                ${prjsimi.cost} <a>/ night</a>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            <Link to={`detail/${prjsimi.id}`}>
                                                                <button
                                                                    onClick={() => handleProjectClick(prjsimi)}
                                                                    className='project-list-button-view'
                                                                >
                                                                    <a className='project-list-view'>View</a>
                                                                </button>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>

                                </div>
                            </div>

                            <div>
                                <div className='room-title'>Best Room</div>
                                <div className='room-item'>

                                    {RoomData.map((room) => (

                                        <div key={room.id}>
                                            <div className='room-card'>
                                                <div className='img-room'>
                                                    <img src={room.imgRoom} alt={room.titleRoom} />

                                                </div>
                                                <div className='room-detail'>
                                                    <h2>{room.titleRoom}</h2>
                                                    <p>${room.costRoom}</p>
                                                </div>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </>
    )

}