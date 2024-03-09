import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import Project from '../../ProjectList/Project.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { ProjectsDataSimilar } from '../../../Shared/ListOfProjectSimilar.js';
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../../UserContext.jsx'


export default function OwnerPage() {

    const { user } = useContext(UserContext);

    const [productListByUserId, setProductListByUserId] = useState([]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

        useEffect(() => {
            const fetchProductByUserId = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/products/${user.id}`);
                    setProductListByUserId(response.data);
                } catch (error) {
                    console.error('Error fetching products by user-id:', error);
                }
            };
            fetchProductByUserId();
        }, [user.id])

    return (
        <>
            <h1>Welcome to Owner Page</h1>
            <a href={'/create-timeshare'}>Post</a>
            <div className='project-owner'>
                <div className='project-owner-header'>
                    <div className='project-owner-title'>My Timeshare</div>
                    <div className='project-view-detail'>
                        <a href={`/view-projects/${user.id}`}>View Detail</a>
                    </div>
                </div>
                <div className='project-owner-detail'>
                    <Slider {...settings}>
                        {productListByUserId.map((product) => (
                            <div key={product.productID}>

                                <div className='card-detail'>
                                    <div className='img-detail'>
                                        {/* <img src={product.productPicture} alt={product.productName} /> */}
                                    </div>
                                    <div className='project-list-detail'>
                                        <div className='project-list-title'>
                                            <h3 className='project-list-name'>{product.productName}</h3>
                                            <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{product.productRating}</h3>
                                        </div>
                                        <h4>Area: {product.productArea}</h4>
                                        <div className='project-list-cost'>
                                            ${product.productPrice} <a>/ night</a>
                                        </div>
                                    </div>
                                    <p>
                                        <Link to={`/detail/${product.productID}`}>
                                            <button
                                                onClick={() => handleProjectClick(product)}
                                                className='project-list-button-view'
                                            >
                                                <a className='project-list-view'>View</a>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="owner-page">
                <Project basePath="/detail" />
            </div>
        </>
    );
}

