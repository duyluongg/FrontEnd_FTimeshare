// Accommodation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Accommodation() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/project/customer/viewproject');
                // setProjects(response.data);
                setFilteredProjects(response.data); // Ban đầu, hiển thị tất cả các project
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    // useEffect(() => {
    //     // Lọc projects dựa trên searchTerm
    //     const filtered = projects.filter(project =>
    //         project.project_type.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredProjects(filtered);
    // }, [searchTerm, projects]);

    // const handleSearch = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    return (
        <>
            <div className="accommodation">
                <h1>Accommodation</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by project type..."
                    // value={searchTerm}
                    // onChange={handleSearch}
                    />
                </div>
                <div className='project-list'>
                    {filteredProjects.map((project) => (
                        <div className='column' key={project.projectID}>
                            <div className='card'>
                                <div className='card-item-img'>
                                    <img src={project.projectPicture} />
                                </div>
                                <div className='project-list-detail'>
                                    <div className='project-list-title'>
                                        <h3 className='project-list-name'>{project.projectName}</h3>
                                        {/* <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{project.productViewer}</h3> */}
                                    </div>
                                    {/* <h4>{project.adr}</h4> */}
                                    <h4>{project.projectDescription}</h4>
                                    <div className='project-list-cost'>Contractor: {project.contractorID}  </div>
                                </div>

                                {/* <p>
                                    <Link to={`detail/${project.productID}`}>
                                        <button onClick={() => setProject(project)} className='project-list-button-view'>
                                            <a className='project-list-view'>
                                                View
                                            </a>
                                        </button>
                                    </Link>
                                </p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default Accommodation;
