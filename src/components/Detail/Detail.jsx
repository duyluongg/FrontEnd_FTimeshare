import React from 'react'
import { useState } from "react";
import { useParams } from 'react-router-dom'
import { ProjectsData } from '../../Shared/ListOfProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import { ProjectsDataSimilar } from '../../Shared/ListOfProjectSimilar';
import { RoomData } from '../../Shared/Room';
import { useEffect } from 'react';
import Review from '../Review/Review.jsx'
import FormFeedback from '../FormFeedback/FormFeedback.jsx'


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
export default function Detail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const projectName = useParams();
    const projectId = ProjectsData.find(obj => {
        return obj.id === projectName.id;
    });
    let cost = projectId.cost.toLocaleString();
    const [activeContentIndex, setActiveContentIndex] = useState(projectId.desribe0);
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
    return (
        <div className='container-detail'>
            <div className='container-item'>
                <div className='container-item-img'>
                    <div>

                        <Slider {...settings}>
                            <div className='container-item-img-item'>
                                <img src={`../${projectId.imgCarousel}`} />
                            </div>
                            <div className='container-item-img-item'>
                                <img src={`../${projectId.imgCarousel2}`} />

                            </div>
                            <div className='container-item-img-item'>
                                <img src={`../${projectId.imgCarousel3}`} />
                            </div>

                        </Slider>
                    </div>
                </div>
                <div className='grid-body'>
                    <div>
                        <div className='container-title'>{projectId.name}</div>
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
                        <h1 className='form-cost'>${projectId.cost}/Day</h1>

                        <form className='form-item'>
                            <div className='column-form column-1'>
                                <label for="fullName">First and last name:</label>
                                <input type="text" id="fullName" name="fullName" required />

                                <label for="phoneNumber">Phone number:</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" required />

                                <label for="adults">Adult:</label>
                                <input type="number" id="adults" name="adults" min="1" required />
                                <button type="submit">Provisional Price</button>

                            </div>
                            <div className='column-form column-2'>
                                <label for="checkInDate">Check-In Date:</label>
                                <input type="date" id="checkInDate" name="checkInDate" required />

                                <label for="checkOutDate">Check-Out Date:</label>
                                <input type="date" id="checkOutDate" name="checkOutDate" required />

                                <label for="children">Child:</label>
                                <input type="number" id="children" name="children" min="0" required />
                                <button type="submit">Booking</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id='tabs'>
                <menu>
                    <button
                        className={`custom-button ${activeContentIndex === projectId.desribe0 ? "active" : ""}`}
                        onClick={() => setActiveContentIndex(projectId.desribe0)}

                    >
                        Why React?
                    </button>

                    <button
                        className={`custom-button ${activeContentIndex === projectId.desribe1 ? "active" : ""}`}
                        onClick={() => setActiveContentIndex(projectId.desribe1)}
                    >
                        Core Features
                    </button>
                </menu>

                <div id="tab-content">

                    <div>
                        {activeContentIndex === projectId.desribe0 &&
                            <div>

                                <p>{projectId.desribe0}</p>
                                <p>Free services:{projectId.describe0service}</p>
                                <p>Check-out time:{projectId.describe0chkout}</p>
                                <p>Payment method:{projectId.desribe0pay}</p>
                            </div>

                        }
                        {activeContentIndex === projectId.desribe1 && <p>{projectId.desribe1}</p>}
                    </div>

                </div>
                {/* REVIEW OF CUSTOMER */}
                <Review />
                <FormFeedback/>
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

    )

}