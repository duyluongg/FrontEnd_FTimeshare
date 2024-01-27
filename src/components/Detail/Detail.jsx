import React from 'react'
import { useParams } from 'react-router-dom'
import { ProjectsData } from '../../Shared/ListOfProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Slider from "react-slick";

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
import { MdArrowForwardIos, MdArrowBackIosNew  } from "react-icons/md";


function SampleNextArrow({onClick}) {
    
    return (
    <div className='arrow arrow-right' onClick={onClick}>
<MdArrowForwardIos/>
    </div>
      
    );
  }

  function SamplePrevArrow({onClick}) {
   
    return (
    <div className='arrow arrow-left' onClick={onClick}>
        <MdArrowBackIosNew/>
    </div>
      
    );
  }
export default function Detail() {
    const projectName = useParams();
    const projectId = ProjectsData.find(obj => {
        return obj.id === projectName.id;
    });
    let cost = projectId.cost.toLocaleString();
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
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
                                <img src={`../${projectId.imgCarousel3}`} />

                            </div>
                            <div className='container-item-img-item'>
                                <img src={`../${projectId.imgCarouse2}`} />
                            </div>

                        </Slider>
                    </div>
                </div>
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



        </div>
    )
}