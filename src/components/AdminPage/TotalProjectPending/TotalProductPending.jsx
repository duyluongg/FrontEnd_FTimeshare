// RecipeReviewCard.jsx
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

export default function TotalProductPending() {
    const [expanded, setExpanded] = useState(false);
    const [projectPending, setProjectPending] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCardReport, setShowCardReport] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // const [projectsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [getProjectID, setGetProjectID] = useState();
    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projectPending.slice(indexOfFirstProject, indexOfLastProject);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // useEffect(() => {
    //     fetchProjectActive();
    // }, [currentPage]);

    // const fetchProjectActive = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/products/staff/active');
    //         setProjectActive(response.data);
    //         console.log(response);
    //     } catch (error) {
    //         console.error('Error fetching projects:', error);
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const fetchData = async () => {
        try {
            const [pendingResponse, imagesResponse, profilesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/products/staff/pending'),
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview')
            ]);

            setProjectPending(pendingResponse.data);
            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);
            console.log(imagesResponse.data);

            // setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportUserClick = (productId) => {
        console.log("Report user for productID:", productId);
        setSelectedProject(productId); // Cập nhật selectedProject trước
        setShowCardReport(true);
    };

    const handleAcceptClick = async (productId) => {
        console.log(productId);
        try {
            await axios.put(`http://localhost:8080/api/products/staff/active/${productId}`);
            fetchData();
        } catch (error) {
            console.error('Error accepting project:', error);
        }
    };

    const handleRejectClick = async (productId) => {
        console.log(productId);
        try {
            await axios.put(`http://localhost:8080/api/products/staff/reject/${productId}`);
            fetchData();
        } catch (error) {
            console.error('Error accepting project:', error);
        }
    };

    useEffect(() => {
        console.log("Selected Project ID changed:", selectedProject);

    }, [selectedProject]);


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        handleGetIDProject();

    }, [getProjectID])

    const handleGetIDProject = (getID) => {
        setGetProjectID(getID);
        console.log("Selected project ID:", getProjectID);

    }


    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "-20px" }}>
                    <TextField
                        sx={{ width: '500px', mb: '25px' }}
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

                <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                    {currentProjects.map((item) => {
                        const projectImage = images.find(image => image.productID === item.productID);
                        const userAccount = profiles.find(acc => acc.accID === item.accID);

                        return (
                            <Card key={item.productID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3, ml: "120px" }}>
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
                                    sx={{ width: "350px", height: "230px", objectFit: "cover", maxWidth: "100%" }}
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
                                    <Button variant="outlined" sx={{ m: 1 }} onClick={() => handleAcceptClick(item.productID)} >
                                        Accept
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => handleRejectClick(item.productID)}>
                                        REJECT
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </Grid >
                {/* <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} /> */}
                <Pagination
                    count={10}
                    color="primary"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: '25px',
                        '& .MuiPaginationItem-root': {
                            color: '#CD9A2B', // Đặt màu của nút trang khi không được chọn
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
