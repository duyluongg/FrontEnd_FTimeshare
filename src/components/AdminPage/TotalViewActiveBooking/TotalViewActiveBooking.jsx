import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
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

// export default function TotalViewPendingBooking() {
//     const [loading, setLoading] = useState(true);
//     const [projectActive, setProjectActive] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [images, setImages] = useState([]);
//     const [profiles, setProfiles] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [expanded, setExpanded] = useState(false);

//     const projectsPerPage = 6;
//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     const [originalProjects, setOriginalProjects] = useState([]);
//     const currentProjects = searchQuery ? projectActive.slice(indexOfFirstProject, indexOfLastProject) : originalProjects.slice(indexOfFirstProject, indexOfLastProject);

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//         setSearchQuery(value);


//         const originalProjects = projectActive;
//         const filtered = originalProjects.filter(item => {
//             const profileAccount = profiles.find(profile => profile.accID === item.accID);
//             return profileAccount && profileAccount.accName.toLowerCase().includes(value.toLowerCase());
//         });
//         setProjectActive(filtered);
//     };


//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     useEffect(() => {
//         fetchData();
//     }, [currentPage]);

//     const fetchData = async () => {
//         try {
//             const [pendingResponse, imagesResponse, profilesResponse] = await Promise.all([
//                 axios.get('http://localhost:8080/api/bookings/staff/active'),
//                 axios.get('http://localhost:8080/api/pictures/customerview'),
//                 axios.get('http://localhost:8080/api/users/staffview')

//             ]);

//             setProjectActive(pendingResponse.data);
//             setImages(imagesResponse.data);
//             setProfiles(profilesResponse.data);
//             const pendingData = pendingResponse.data;
//             setOriginalProjects(pendingData);

//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const formatDate = (dateArray) => {
//         const [year, month, day] = dateArray;
//         return `${day}/${month}/${year}`;
//     };

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <TextField
//                     sx={{ width: '500px', mb: '35px' }}
//                     placeholder="Search..."
//                     variant="outlined"
//                     size="small"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                 />
//                 <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
//                     <SearchIcon />
//                 </IconButton>
//             </div>

//             <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//                 {currentProjects
//                     .map((item) => {
//                         const projectImage = images.find(image => image.productID === item.productID);
//                         const profileAccount = profiles.find(profile => profile.accID === item.accID);
//                         console.log(projectImage);

//                         return (
//                             <Card key={item.bookingID} sx={{ maxWidth: 345, height: 530, mb: '20px', boxShadow: 3, ml: "120px" }}>
//                                 <CardHeader
//                                     avatar={
//                                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                                             <ModalProfile accID={profileAccount} />
//                                         </Avatar>
//                                     }

//                                     title={profileAccount ? profileAccount.accName : ""}
//                                     subheader={formatDate(item.createDate)}
//                                 />

//                                 <CardMedia
//                                     component="img"
//                                     height="350"
//                                     image={item.imgName}
//                                     sx={{ objectFit: "contain", maxHeight: "350px" }}
//                                 />
//                                 <CardContent>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Price: {item.bookingPrice}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Person: {item.bookingPerson}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Status: {item.bookingStatus}
//                                     </Typography>
//                                 </CardContent>
//                                 <CardActions disableSpacing>
//                                     {/* <Button variant="outlined" color="success" onClick={() => handleAcceptActive(item.bookingID)}>
//                                     ACCEPT
//                                 </Button>
//                                 <Button variant="outlined" color="error" onClick={() => handleAcceptCancel(item.bookingID)}>
//                                     CANCEL
//                                 </Button> */}

//                                 </CardActions>

//                             </Card>
//                         );
//                     })}
//             </Grid>
//             <Pagination
//                 count={10}
//                 color="primary"
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mt: '25px',
//                     '& .MuiPaginationItem-root': {
//                         color: '#CD9A2B', // Đặt màu của nút trang khi không được chọn
//                     },
//                     position: "sticky",
//                     top: "100%",
//                     bottom: "5px",
//                     left: "0px",
//                     right: "0px",
//                     // marginBottom: "0px"

//                 }}
//                 onChange={handlePageChange}
//             />
//         </>
//     );
// }

export default function TotalViewActiveBooking() {
    const [loading, setLoading] = useState(true);
    const [projectActive, setProjectActive] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalProjects, setOriginalProjects] = useState([]);

    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = searchQuery ? projectActive.slice(indexOfFirstProject, indexOfLastProject) : originalProjects.slice(indexOfFirstProject, indexOfLastProject);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const filtered = originalProjects.filter(item => {
            const profileAccount = profiles.find(profile => profile.accID === item.accID);
            return profileAccount && profileAccount.accName.toLowerCase().includes(value.toLowerCase());
        });
        setProjectActive(filtered);
    };
    

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);
    // useEffect(() => {
    //     // Cập nhật lại dữ liệu projectActive từ originalProjects khi currentPage thay đổi
    //     const startIndex = (currentPage - 1) * projectsPerPage;
    //     const endIndex = Math.min(startIndex + projectsPerPage, originalProjects.length);
    //     const updatedProjectActive = originalProjects.slice(startIndex, endIndex);
    //     setProjectActive(updatedProjectActive);
    // }, [currentPage, originalProjects, projectsPerPage]);

    const fetchData = async () => {
        try {
            const [pendingResponse, imagesResponse, profilesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/bookings/staff/active'),
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview')
            ]);

            const pendingData = pendingResponse.data;
            setProjectActive(pendingData);
            setOriginalProjects(pendingData);

            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
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
                    // const projectImage = images.find(image => image.productID === item.productID);
                    const profileAccount = profiles.find(profile => profile.accID === item.accID);


                    return (
                        <Card key={item.bookingID} sx={{ maxWidth: 345, height: 530, mb: '20px', boxShadow: 3, ml: "120px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <ModalProfile accID={profileAccount} />
                                    </Avatar>
                                }
                                title={profileAccount ? profileAccount.accName : ""}
                                subheader={formatDate(item.createDate)}
                            />
                            <CardMedia
                                component="img"
                                height="350"
                                image={item.imgName}
                                sx={{ objectFit: "contain", maxHeight: "350px" }}
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
                            </CardActions>
                        </Card>
                    );
                })}
            </Grid>
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
                }}
                onChange={handlePageChange}
            />
        </>
    );
}

