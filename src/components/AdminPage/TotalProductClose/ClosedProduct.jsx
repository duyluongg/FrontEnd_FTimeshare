import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ModalProfile from '../ViewReport/ModalProfile';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ClosedProduct() {
    const [expanded, setExpanded] = React.useState(false);
    const [projectActive, setProjectActive] = React.useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projectActive.slice(indexOfFirstProject, indexOfLastProject);
    const [images, setImages] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchProjectPending();
    }, []);

    // const fetchProjectPending = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/products/staff/rejected');
    //         setProjectActive(response.data);
    //         console.log(response);
    //     } catch (error) {
    //         console.error('Error fetching projects:', error);
    //     }
    // };

    const fetchProjectPending = async () => {
        try {
            const [rejectResponse,  profilesResponse, imagesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/products/staff/closed'),
                axios.get('http://localhost:8080/api/users/staffview'),
                axios.get('http://localhost:8080/api/pictures/customerview')
            ]);

            setProjectActive(rejectResponse.data);
          
            setProfiles(profilesResponse.data);
            setImages(imagesResponse.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

   


    return (
        <>

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

            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {currentProjects.map((item) => {
                    const userAccount = profiles.find(acc => acc.accID === item.accID);
                    const projectImage = images.find(image => image.productID === item.productID);
                    return (
                        <Card key={item.newsID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3, ml: "120px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <ModalProfile accID={userAccount} />
                                    </Avatar>
                                }
                            
                                title={userAccount.accName}
                             
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={projectImage ? projectImage.imgName : ""}
                                alt="Project image"
                                sx={{ width: "350px", height: "300px", objectFit: "cover", maxWidth: "100%" }}

                            />
                            <CardContent>
                                {/* <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}> */}
                                <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {item.productName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Available Start Date: {formatDate(item.availableStartDate)}<br />
                                    Available End Date: {formatDate(item.availableEndDate)}<br />
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: "vertical" }}>
                                    Description: {item.productDescription}<br />

                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Address: {item.productAddress}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: "vertical" }}>
                                    Convenience: {item.productConvenience}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Price: {item.productPrice}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Person: {item.productPerson}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="outlined" color="error" sx={{ cursor: "default" }}>
                                    {item.productStatus}
                                </Button>

                            </CardActions>

                        </Card>
                    )
                })}


            </Grid >
            <Pagination
                    count={10}
                    color="primary"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: '25px',
                        '& .MuiPaginationItem-root': {
                            color: '#CD9A2B', 
                        },
                        position: "sticky",
                        top:"100%",
                        bottom: "5px", 
                        left: "0px",
                        right: "0px",
                        // marginBottom: "0px"

                    }}
                    onChange={handlePageChange}
                />
        </>

    );
}
