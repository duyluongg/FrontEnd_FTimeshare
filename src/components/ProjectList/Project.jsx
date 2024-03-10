import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faStar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'

export default function Project() {
  const [project, setProject] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [images, setImages] = useState([]);

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
  }, [user.id]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/staff/active');
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/news/view`);
        const sortedNews = response.data.sort((a, b) => b.newsViewer - a.newsViewer);
        const top3News = sortedNews.slice(0, 3);
        setTopNews(top3News);
      } catch (error) {
        console.error('Error fetching top news:', error);
      }
    };

    fetchTopNews();
  }, []);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pictures/customerview`);

        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching view img:', error);
      }
    };

    fetchImg();
  }, []);

  return (
    <>
      {(user && user.auth === true) && (
        <>
          <a href={'/create-timeshare'}>Post</a>
          <div className='project-owner'>
            <div className='project-owner-header'>
              <div className='project-owner-title'>My Timeshare</div>
              <div className='project-view-detail'>
                <Link to={'/create-timeshare'} className='project-view-detail-button'>
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;Create
                </Link>
                <Link to={'/view-summary'} className='project-view-detail-button'>
                  <FontAwesomeIcon icon={faArrowRight} />
                  &nbsp;More
                </Link>
              </div>
            </div>
            <div className='project-owner-detail'>
              <Slider {...settings}>
                {productListByUserId.map((product) => {
                  const projectImage = images.find(image => image.productID === product.productID);
                  return (
                    <div key={product.productID}>
                      <div className='card-detail'>
                        <div className='img-detail'>
                          {/* <img src={product.productPicture} alt={product.productName} /> */}
                          {projectImage && <img src={projectImage.imgName} />}
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
                  );
                })}
              </Slider>
            </div>
          </div>
        </>
      )}

      <div className='project'>
        <div className='project-header'>
          <FontAwesomeIcon icon={faFire} size='2xl' color='red' />
          <div className='project-title'>Our Most Popular Timeshare</div>
          <FontAwesomeIcon icon={faFire} size='2xl' color='red' />
        </div>
        <div className='project-list'>
          {project.map((projectItem) => {
            const projectImage = images.find(image => image.productID === projectItem.productID);
            return (
              <div className='column' key={projectItem.productID}>
                <div className='card'>
                  <div className='card-item-img'>
                    {projectImage && <img src={projectImage.imgName} />}
                  </div>
                  <div className='project-list-detail'>
                    <div className='project-list-title'>
                      <h3 className='project-list-name'>{projectItem.productName}</h3>
                      <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{projectItem.productViewer}</h3>
                    </div>
                    <h4>{projectItem.productDescription}</h4>
                    <div className='project-list-cost'>${projectItem.productPrice}  <a>/ night</a></div>
                  </div>
                  <p>
                    <Link to={`detail/${projectItem.productID}`}>
                      {/* <Link to={`${props.basePath}/${projectItem.productID}`}> */}
                      <button className='project-list-button-view'>
                        <a className='project-list-view'>View</a>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className='project-learn'>
          <h1>Learn about</h1>
          <div className='project-learn-list'>
            {topNews.map((item) => (
              <div className='column' key={item.newsID}>
                <div className='project-learn-blog'>
                  <img src={item.newsPicture} />
                  <div className='project-learn-detail'>
                    <h2>{item.newsTitle}</h2>
                    <p>{item.newsContent}</p>
                    <div className='project-learn-author'>
                      <div>By {item.accID}</div>
                      <div>{item.newsPost}</div>
                    </div>
                    <p>
                      <Link to={`/view-news/${item.newsID}`}>
                        <button className='project-learn-button'>
                          <a>Read more</a>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}