import React from 'react';
import { useEffect } from 'react';


import Slider from "react-slick";
import Project from '../../ProjectList/Project.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { ProjectsDataSimilar } from '../../../Shared/ListOfProjectSimilar.js';

import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

function SampleNextArrowSt2({ onClick }) {

    return (
        <div className='arrowst arrowst-right' onClick={onClick}>
            <MdArrowForwardIos color='white' />
        </div>

    );
}

function SamplePrevArrowSt2({ onClick }) {

    return (
        <div className='arrowst arrowst-left' onClick={onClick}>
            <MdArrowBackIosNew color='white' />
        </div>

    );
}

export default function OwnerPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        nextArrow: <SampleNextArrowSt2 />,
        prevArrow: < SamplePrevArrowSt2 />
    };


    return (
        <>
            <h1>Welcome to Owner Page</h1>
            <a href="/api/create-timeshare">Post</a>
            <div className='project-owner'>
                <div className='project-owner-header'>
                    <div className='project-owner-title'>My Projects</div>
                    <div className='project-view-detail'>
                        <a href='view-projects'>View Detail</a>
                    </div>
                </div>
                <div className='project-owner-detail'>
                    <Slider {...settings}>
                        {ProjectsDataSimilar.map((prjsimi) => (
                            <div key={prjsimi.id}>

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
                        ))}
                    </Slider>
                </div>


            </div>

            <div className="owner-page">
                {/* Hiển thị phần Project */}
                <Project />
            </div>
        </>
    );
}

