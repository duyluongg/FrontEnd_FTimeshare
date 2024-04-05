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
import BookingDetail from '../BookingDetail/BookingDetail';

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

// export default function ViewBookingConfirm() {
//     const [loading, setLoading] = useState(true);
//     const [productToConfirm, setProductToConfirm] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [images, setImages] = useState([]);
//     const [profiles, setProfiles] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [expanded, setExpanded] = useState(false);
//     const [originalProjects, setOriginalProjects] = useState([]);
//     const projectsPerPage = 6;
//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     const currentProjects = productToConfirm.slice(indexOfFirstProject, indexOfLastProject);

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
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
//                 axios.get('http://localhost:8080/api/bookings/staff/waitToConfirm'),
//                 axios.get('http://localhost:8080/api/pictures/customerview'),
//                 axios.get('http://localhost:8080/api/users/staffview')
//             ]);

//             setProductToConfirm(pendingResponse.data);
//             setImages(imagesResponse.data);
//             setProfiles(profilesResponse.data);

//             setLoading(false);
//             console.log(pendingResponse.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };



//     const handleAcceptActive = async (bookingID) => {
//         try {
//             await axios.put(`http://localhost:8080/api/bookings/confirm_booking/${bookingID}`);
//             fetchData();
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };

//     const handleAcceptReject = async (bookingID) => {
//         try {
//             await axios.put(`http://localhost:8080/api/bookings/staff/Rejected/${bookingID}`);
//             fetchData();
//         } catch (error) {
//             console.error('Error fetching projects:', error);
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
//                 {currentProjects.map((item) => {
//                     console.log(item);
//                     // const projectImage = images.find(image => image.productID === item.productID);
//                     const profileAccount = profiles.find(profile => profile.accID === item.accID);
//                     // console.log(projectImage);

//                     return (
//                         <Card key={item.bookingID} sx={{ maxWidth: 345, height: 620, mb: '20px', boxShadow: 3, ml: "120px" }}>

//                             <CardHeader
//                                 avatar={
//                                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                                         {/* {item.productName[1]} */}
//                                         <ModalProfile accID={profileAccount} />
//                                     </Avatar>
//                                 }

//                                 title={profileAccount ? profileAccount.accName : ""}

//                             />

//                             <CardMedia
//                                 component="img"
//                                 height="350"
//                                 // image={projectImage ? projectImage.imgName : ""}
//                                 image={item.imgName}

//                                 alt="Project image"
//                                 sx={{ objectFit: "contain" , maxHeight:"350px"}}

//                             />
//                             <CardContent>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Check-in Date: {formatDate(item.startDate)}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Check-out Date: {formatDate(item.endDate)}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Price: {item.bookingPrice}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Person: {item.bookingPerson}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Status: {item.bookingStatus}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions disableSpacing>
//                                 {/* <Button variant="outlined" color="success" onClick={() => handleAcceptActive(item.bookingID)}>
//                                     ACCEPT
//                                 </Button>
//                                 <Button variant="outlined" color="error" onClick={() => handleAcceptReject(item.bookingID)}>
//                                     REJECT
//                                 </Button> */}

//                                 <Link to={`/staff/wait-to-confirm-list/detail/${item.bookingID}/${item.productID}/${item.accID}`}>
//                                     <Button variant="outlined" sx={{width:"325px"}}>
//                                         DETAIL
//                                     </Button>                         
//                                 </Link>

//                             </CardActions>
//                         </Card>
//                     );
//                 })}
//             </Grid>
//             <Pagination
//                     count={10}
//                     color="primary"
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         mt: '25px',
//                         '& .MuiPaginationItem-root': {
//                             color: '#CD9A2B', // Đặt màu của nút trang khi không được chọn
//                         },
//                         position: "sticky",
//                         top:"100%",
//                         bottom: "5px", 
//                         left: "0px",
//                         right: "0px",
//                         // marginBottom: "0px"

//                     }}
//                     onChange={handlePageChange}
//                 />
//         </>
//     );
// }

export default function ViewBookingConfirm() {
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';

    const [loading, setLoading] = useState(true);
    const [productToConfirm, setProductToConfirm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [originalProjects, setOriginalProjects] = useState([]);
    const [searchResults, setSearchResults] = useState([]); // Thêm state để lưu trữ kết quả tìm kiếm

    const projectsPerPage = 6;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = searchQuery ? searchResults.slice(indexOfFirstProject, indexOfLastProject) : productToConfirm.slice(indexOfFirstProject, indexOfLastProject);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const filtered = productToConfirm.filter(item => {
            const profileAccount = profiles.find(profile => profile.accID === item.accID);
            return profileAccount && profileAccount.accName.toLowerCase().includes(value.toLowerCase());
        });
        setSearchResults(filtered); // Cập nhật kết quả tìm kiếm vào state mới
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
                axios.get(`${apiUrl}/api/bookings/staff/waitToConfirm`),
                axios.get(`${apiUrl}/api/pictures/customerview`),
                axios.get(`${apiUrl}/api/users/staffview`)
            ]);

            const pendingData = pendingResponse.data;
            setProductToConfirm(pendingData);
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
                    const profileAccount = profiles.find(profile => profile.accID === item.accID);

                    return (
                        <Card key={item.bookingID} sx={{ maxWidth: 345, height: 620, mb: '20px', boxShadow: 3, ml: "120px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <ModalProfile accID={profileAccount} />
                                    </Avatar>
                                }
                                title={profileAccount ? profileAccount.accName : ""}
                            />
                            <CardMedia
                                component="img"
                                height="350"
                                image={item.imgName}
                                alt="Project image"
                                sx={{ objectFit: "contain", maxHeight: "350px" }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Check-in Date: {formatDate(item.startDate)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Check-out Date: {formatDate(item.endDate)}
                                </Typography>
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
                                {/* Add action buttons here */}
                                <Link to={`/staff/wait-to-confirm-list/detail/${item.bookingID}/${item.productID}/${item.accID}`}>
                                    <Button variant="outlined" sx={{ width: "325px" }}>
                                        DETAIL
                                    </Button>
                                </Link>
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
                        color: '#CD9A2B', // Set color of page button when not selected
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

