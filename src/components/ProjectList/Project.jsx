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
  // const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState([]);

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

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/news/view`);
  //       setNews(response.data);
  //     } catch (error) {
  //       console.error('Error fetching news:', error);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/news/view`);
        // Sắp xếp danh sách tin tức theo newsViewer giảm dần
        const sortedNews = response.data.sort((a, b) => b.newsViewer - a.newsViewer);
        // Lấy 3 tin tức đầu tiên
        const top3News = sortedNews.slice(0, 3);
        // Lưu trữ danh sách tin tức có newsViewer cao nhất vào state hoặc biến
        setTopNews(top3News);
      } catch (error) {
        console.error('Error fetching top news:', error);
      }
    };

    fetchTopNews();
  }, []);



  return (
    <div className='project'>
      <div className='project-header'>
        <FontAwesomeIcon icon={faFire} size='2xl' color='red' />

        <div className='project-title'>Our Most Popular Projects</div>

        <FontAwesomeIcon icon={faFire} size='2xl' color='red' />
      </div>
      <div className='project-list'>
        {project.map((project) => (
          <div className='column' key={project.productID}>
            <div className='card'>
              <div className='card-item-img'>
                <img src={project.productPicture} />
              </div>
              <div className='project-list-detail'>
                <div className='project-list-title'>
                  <h3 className='project-list-name'>{project.productName}</h3>
                  <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{project.productViewer}</h3>
                </div>
                {/* <h4>{project.adr}</h4> */}
                <h4>{project.productDescription}</h4>
                <div className='project-list-cost'>${project.productPrice}  <a>/ night</a></div>
              </div>

              <p>
                <Link to={`detail/${project.productID}`}>
                  <button onClick={() => setProject(project)} className='project-list-button-view'>
                    <a className='project-list-view'>
                      View
                    </a>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ))}
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
