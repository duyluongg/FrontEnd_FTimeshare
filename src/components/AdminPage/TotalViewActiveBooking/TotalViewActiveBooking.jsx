import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

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

export default function TotalViewPendingBooking() {
    const [loading, setLoading] = useState(true);
    const [projectActive, setProjectActive] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState(false);

    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projectActive.slice(indexOfFirstProject, indexOfLastProject);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };



    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const fetchData = async () => {
        try {
            const [pendingResponse, imagesResponse, profilesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/bookings/staff/active'),
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview')
               
            ]);

            setProjectActive(pendingResponse.data);
            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };



    // const handleAcceptCancel = async (bookingID) => {
    //     try {
    //         await axios.put(`http://localhost:8080/api/bookings/staff/cancel/${bookingID}`);
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error fetching projects:', error);
    //     }
    // };

    // const handleAcceptActive = async (bookingID) => {
    //     try {
    //         await axios.put(`http://localhost:8080/api/bookings/staff/active/${bookingID}`);
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error fetching projects:', error);
    //     }
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

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

            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '50px' }}>
                {currentProjects.map((item) => {
                    const projectImage = images.find(image => image.productID === item.productID);
                    const profileAccount = profiles.find(profile => profile.accID === item.accID);
                    console.log(projectImage);

                    return (
                        <Card key={item.bookingID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {/* {item.productName[1]} */}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={profileAccount ? profileAccount.accName : ""}
                                subheader="Ngày tháng năm"
                            />

                            <CardMedia
                                component="img"
                                height="350"
                                image={item.imgName}
                                // image={item.imgName}

                                alt="Project image"
                                // sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
                                sx={{ objectFit: "contain" , maxHeight:"350px"}}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {item.bookingPrice}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Person: {item.bookingPerson}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: {item.bookingStatus}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {/* <Button variant="outlined" color="success" onClick={() => handleAcceptActive(item.bookingID)}>
                                    ACCEPT
                                </Button>
                                <Button variant="outlined" color="error" onClick={() => handleAcceptCancel(item.bookingID)}>
                                    CANCEL
                                </Button> */}
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        {/* {item.productConvenience} */}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    );
                })}
            </Grid>
            <Pagination
                count={10}
                color="primary"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }}
                onChange={handlePageChange}
            />
        </>
    );
}
