// // Accommodation.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Accommodation() {
//     const [projects, setProjects] = useState([]);
//     const [filteredProjects, setFilteredProjects] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/project/customer/viewproject');
//                 setFilteredProjects(response.data); 
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             }
//         };

//         fetchProjects();
//     }, []);

//     return (
//         <>
//             <div className="accommodation">
//                 <h1>Accommodation</h1>
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         placeholder="Search by project type..."
//                     />
//                 </div>
//                 <div className='project-list'>
//                     {filteredProjects.map((project) => (
//                         <div className='column' key={project.projectID}>
//                             <div className='card'>
//                                 <div className='card-item-img'>
//                                     <img src={project.projectPicture} />
//                                 </div>
//                                 <div className='project-list-detail'>
//                                     <div className='project-list-title'>
//                                         <h3 className='project-list-name'>{project.projectName}</h3>
//                                         {/* <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{project.productViewer}</h3> */}
//                                     </div>
//                                     {/* <h4>{project.adr}</h4> */}
//                                     <h4>{project.projectDescription}</h4>
//                                     <div className='project-list-cost'>Contractor: {project.contractorID}  </div>
//                                 </div>

//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </>
//     );
// }

// export default Accommodation;

import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Grid, Pagination, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function Accommodation() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const [filteredProjects, setFilteredProjects] = useState([]);
    const currentProjects = searchQuery ? filteredProjects.slice(indexOfFirstProject, indexOfLastProject) : projects.slice(indexOfFirstProject, indexOfLastProject);
    
    useEffect(() => {
        fetchAllProjects();
    }, [searchQuery]);
    const fetchAllProjects = async () => {
        try {
            const projectResponse = await axios.get('http://localhost:8080/api/project/customer/viewproject');
            
            setProjects(projectResponse.data);

            const filtered = projectResponse.data.filter(item =>
                item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredProjects(filtered);

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <div>     
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    sx={{ width: '500px', mb: '35px' }}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
                    <SearchIcon />
                </IconButton>
            </div>
            <h1 className='accommodation-title'>Contractor of homestay</h1>
            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '95px' }}>
                {currentProjects.map((item) => {
                    return (
                        <Card sx={{ maxWidth: 345 }} key={item.projectID}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image='./image/prj/prj02.jpg'
                                sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: "20px" }} >
                                    {item.projectName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} >
                                    {item.projectDescription}
                                </Typography>
                            </CardContent>
                            <Link to={`/accommodation-detail/${item.projectID}`}>
                                <CardActions>
                                    <Button size="small">View Homestay</Button>
                                </CardActions>
                            </Link>

                        </Card>
                    )

                })}
            </Grid>
            <Pagination
                count={10}
                color="primary"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px', mb: '25px' }}
                onChange={handlePageChange}
            />
        </div>

    );
}

