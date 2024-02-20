import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import axios from 'axios';
import { ProjectsData } from '../../Shared/ListOfProject'
import { LearnAbout } from '../../Shared/LearnAbout'


export default function Project() {
  const [project, setProject] = useState([])
  useEffect(() => {
    
    const fetchProjects = async () => {
      try {
      
        const response = await axios.get('https://65d2a241987977636bfc786b.mockapi.io/project');
  
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

  
    fetchProjects();
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
          <div className='column' key={project.id}>
            <div className='card'>
              <div className='card-item-img'>
              <img src={project.img} />

              </div>
              <div className='project-list-detail'>
                <div className='project-list-title'>
                  <h3 className='project-list-name'>{project.name}</h3>
                  <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{project.feedback}</h3>
                </div>

                <h4>{project.adr}</h4>
                <div className='project-list-cost'>${project.cost}  <a>/ night</a></div>
              </div>

              <p >
                <Link to={`detail/${project.id}`}>
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
          {LearnAbout.map((blog) => (
            <div className='column' key={blog.id}>
              <div className='project-learn-blog'>
                <img src={blog.img} />
                <div className='project-learn-detail'>
                  <h2>{blog.title}</h2>
                  <p>{blog.post}</p>
                  <div className='project-learn-author'>
                    <div>By {blog.author}</div>
                    <div>{blog.date}</div>
                  </div>
                  <p >
                    <button className='project-learn-button'>
                      <a>Read more</a>
                    </button>
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
