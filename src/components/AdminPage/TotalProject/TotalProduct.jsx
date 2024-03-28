// RecipeReviewCard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import SelectProject from '../../SelectProject';
import CardReport from '../ViewReport/CardReport';
// import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { format } from 'date-fns';
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

export default function TotalProduct() {
    const [expanded, setExpanded] = useState(false);
    const [projectActive, setProjectActive] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCardReport, setShowCardReport] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // const [projectsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [getProjectID, setGetProjectID] = useState();
    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    // const currentProjects = searchQuery ? filteredProjects.slice(indexOfFirstProject, indexOfLastProject) : projectActive.slice(indexOfFirstProject, indexOfLastProject);

    const [projectName, setProjectName] = useState([]);
    const [selectedProjectID, setSelectedProjectID] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchData(); // Cập nhật dữ liệu sau khi đã chọn dự án mới
    }, [currentPage, searchQuery, selectedProjectID]);
    const fetchData = async () => {
        try {
            const [pendingResponse, imagesResponse, profilesResponse, projectResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/products/staff/active'),
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview'),
                axios.get('http://localhost:8080/api/project/customer/viewproject')
            ]);

            setProjectActive(pendingResponse.data);
            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);
            setProjectName(projectResponse.data);
            const productsData = pendingResponse.data;

            let filteredProductsData = productsData;

            if (selectedProjectID) {
                console.log("ID:", selectedProjectID);
                filteredProductsData = productsData.filter(product => product.projectID === selectedProjectID);
                console.log(filteredProductsData);
            }



            if (searchQuery) {
                console.log(searchQuery);
                filteredProductsData = filteredProductsData.filter(product =>
                    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredProjects(filteredProductsData);

            // const filtered = pendingResponse.data.filter(item =>
            //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
            // );
            // setFilteredProjects(filtered);


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportUserClick = (productId) => {
        console.log("Report user for productID:", productId);
        setSelectedProject(productId); // Cập nhật selectedProject trước
        setShowCardReport(true);
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



    const handleSelectProject = (projectId) => {
        setSelectedProjectID(projectId);
        console.log("Selected project ID:", projectId);
    };

    // useEffect(() => {
    //     if (selectedProjectID) {
    //         // Nếu có project được chọn, lọc danh sách sản phẩm theo project đó
    //         const filteredByProject = projectActive.filter(item => item.projectID === selectedProjectID);
    //         setFilteredProjects(filteredByProject);
    //     } else {
    //         // Nếu không có project được chọn, hiển thị tất cả các sản phẩm
    //         setFilteredProjects(projectActive);
    //     }
    // }, [selectedProjectID, projectActive]);



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
                <SelectProject onSelectProject={handleSelectProject} />

            </div>

            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {filteredProjects.slice(indexOfFirstProject, indexOfLastProject).map((item) => {
                    const projectImage = images.find(image => image.productID === item.productID);
                    // const profileAccount = profiles.find(profile => profile.accID === item.accID);
                    const projecType = projectName.find(prj => prj.projectID === item.projectID)
                    console.log(projectImage);
                    return (
                        <Card key={item.productID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3, ml: "120px" }}>

                            <CardHeader

                                title={item.productName}

                                sx={{ height: "55px", color: "black", backgroundColor: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}

                            />

                            <CardMedia
                                component="img"
                                height="194"
                                image={projectImage ? projectImage.imgName : ""}
                                alt="Project image"
                                sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: "vertical" }}>
                                    {item.productAddress}
                                </Typography>

                                <Typography>
                                    {projecType.projectName}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="outlined" color="success" sx={{ cursor: "default" }}>
                                    {item.productStatus}
                                </Button>
                                <Link to={`/staff/report-projectid/${item.productID}/${item.accID}`}>
                                    <Button variant="outlined" onClick={() => handleGetIDProject(item.productID)}>
                                        DETAIL
                                    </Button>
                                </Link>
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
                    top: "100%",
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
