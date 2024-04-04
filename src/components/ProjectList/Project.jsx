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
import { Button } from '@mui/material';

export default function Project() {
  const [project, setProject] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [images, setImages] = useState([]);

  const { user } = useContext(UserContext);

  const [productListByUserId, setProductListByUserId] = useState([]);
  const token = sessionStorage.getItem('token');
  console.log(token);
  const headers = { headers: { 'Authorization': `Bearer ${token}` } };

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

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchProductByUserId = async () => {
      try {
        const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/${user.id}`);
        const products = response.data;

        const updatedProducts = await Promise.all(products.map(async (product) => {
          const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${product.productID}`);
          const rating = feedbackResponse.data;

          return { ...product, rating };
        }));

        setProductListByUserId(updatedProducts);
      } catch (error) {
        console.error('Error fetching products by user-id:', error);
      }
    };
    fetchProductByUserId();
  }, [user.id]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/active', headers);
        const projects = response.data;

        const updatedProjects = await Promise.all(projects.map(async (project) => {
          const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${project.productID}`, headers);
          const rating = feedbackResponse.data;

          return { ...project, rating };
        }));

        updatedProjects.sort((a, b) => b.rating - a.rating);

        const top8Projects = updatedProjects.slice(0, 8);

        setProject(top8Projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    fetchTopNews();
  }, []);
  const fetchTopNews = async () => {
    try {
      const newResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/news/view');
      // console.log(newResponse.data);
      const sortedNews = newResponse.data.sort((a, b) => {
        const dateA = new Date(a.newsPost[0], a.newsPost[1] - 1, a.newsPost[2], a.newsPost[3] - 1);
        const dateB = new Date(b.newsPost[0], b.newsPost[1] - 1, b.newsPost[2], b.newsPost[3] - 1);
        if (dateA.getTime() === dateB.getTime()) {

          return new Date(b.newsPost[3], b.newsPost[4], b.newsPost[5]) - new Date(a.newsPost[3], a.newsPost[4], a.newsPost[5]);
        }
        return dateB - dateA;
      });

      const latestThreeNews = sortedNews.slice(0, 3);
      // console.log(latestThreeNews);


      const accIDs = latestThreeNews.map(news => news.accID);
      const accountResponse = await Promise.all(accIDs.map(accID => axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${accID}`, headers)));


      const newsWithAccounts = latestThreeNews.map((news, index) => ({
        ...news,
        account: accountResponse[index].data
      }));
      setLatestNews(newsWithAccounts);

      // console.log(newsWithAccounts);
    } catch (error) {
      console.error('Error fetching top news:', error);
    }
  };

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview`);
        setImages(response.data);
        // console.log(response.data);
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
          <div className='project-owner'>
            <div className='project-owner-header'>
              <div className='project-owner-title'>My Homestay</div>
              <div className='project-view-detail'>
                <Link to={'/create-timeshare'} className='project-view-detail-button'>
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;Create
                </Link>
                {/* <Link to={'/view-summary'} className='project-view-detail-button'>
                  <FontAwesomeIcon icon={faArrowRight} />
                  &nbsp;More
                </Link> */}
              </div>
            </div>
            <div className='project-owner-detail'>
              <Slider {...settings}>
                {productListByUserId.map((product) => {
                  const projectImage = images.find(image => image.productID === product.productID);
                  console.log(projectImage);

                  return (
                    <div key={product.productID}>
                      <div className='card-detail'>
                        <div className='img-detail'>
                          {projectImage && <img src={projectImage.imgName} />}
                        </div>
                        <div className='project-list-detail'>
                          <div className='project-list-title'>
                            <h3 className='project-list-name'>{product.productName}</h3>
                            <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{product.rating}</h3>
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
          <div className='project-title'>The Most Popular Homestay</div>
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
                      <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{projectItem.rating}</h3>
                    </div>
                    <h4>{projectItem.productAddress}</h4>
                    <div className='project-list-cost'>${projectItem.productPrice}  <a>/ night</a></div>
                  </div>
                  <p>
                    <Link to={`detail/${projectItem.productID}`}>
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
            {latestNews.map((item) => (
              <div className='column' key={item.newsID}>
                <div className='project-learn-blog'>
                  <img src={item.imgName} />
                  <div className='project-learn-detail'>
                    <h2>{item.newsTitle}</h2>
                    {/* <p className='content-new'> <span>{item.newsContent}</span></p> */}
                    <div className='content-new'>{item.newsContent}</div>
                    <div className='project-learn-author'>
                      <div className='author'>By {item.account.accName}</div>
                      <div>{formatDate(item.newsPost)}</div>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={"/new"}>
            <Button sx={{ color: "#CD9A2B" }}>
              show more
            </Button>
          </Link>
        </div>

      </div>
    </>
  )
}