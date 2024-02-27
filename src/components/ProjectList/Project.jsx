import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ProjectsData } from '../../Shared/ListOfProject'
import { LearnAbout } from '../../Shared/LearnAbout'

export default function Project() {
  const [project, setProject] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [images, setImages] = useState([]);

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
        console.log(images);
      } catch (error) {
        console.error('Error fetching view img:', error);
      }
    };
  
    fetchImg();
  }, []);

  return (
    <div className='project'>
      <div className='project-header'>
        <FontAwesomeIcon icon={faFire} size='2xl' color='red' />
        <div className='project-title'>Our Most Popular Projects</div>
        <FontAwesomeIcon icon={faFire} size='2xl' color='red' />
      </div>
      <div className='project-list'>
        {project.map((projectItem) => {
          // Tìm hình ảnh có productID tương ứng với productID của project
          const projectImage = images.find(image => image.productID === projectItem.productID);
          console.log(projectImage);
          return (
            <div className='column' key={projectItem.productID}>
              <div className='card'>
                <div className='card-item-img'>
                 
                  {projectImage && <img src={projectImage.imgUrl} />}
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
  )
}