import React from 'react'
import { useParams } from 'react-router-dom'
import { ProjectsData } from '../../Shared/ListOfProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPerson, faChild, faExpand, faBath,
    faKitchenSet,
    faWifi,
    faCity,
    faPersonSwimming,
    faTv
} from '@fortawesome/free-solid-svg-icons';
// import Carousel from 'react-bootstrap/Carousel';



export default function Detail() {
    const projectName = useParams();
    const projectId = ProjectsData.find(obj => {
        return obj.id === projectName.id;
    });
    let cost = projectId.cost.toLocaleString();
    return (
        <div className='container-detail'>
            <div className='container-item'>
                <div className='container-item-img'>
                    {/* <Carousel>
                        <Carousel.Item>
                            <ExampleCarouselImage text="First slide" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <ExampleCarouselImage text="Second slide" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <ExampleCarouselImage text="Third slide" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}
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