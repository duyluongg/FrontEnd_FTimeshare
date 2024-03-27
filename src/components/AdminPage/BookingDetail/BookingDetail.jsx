import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
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

export default function BookingDetail() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { productID, accID, bookingID } = useParams();
    const [productBooking, setProductBooking] = useState([]);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [userAccountBooking, setUserAccountBooking] = useState([]);
    const [userAccountProduct, setUserAccountProduct] = useState([]);
    const [customerAccountBook, setCustomerAccountBook] = useState([]);
    const [showSecondDiv, setShowSecondDiv] = useState(true);


    console.log(bookingID);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const pendingResponse = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`);
            const accIDProduct = pendingResponse.data[0].accID;

            const [imagesResponse, profilesResponse, userProductData, userBookingData, customerBookingData] = await Promise.all([
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview'),
                axios.get(`http://localhost:8080/api/users/viewDetail/${accIDProduct}`),
                axios.get(`http://localhost:8080/api/users/viewDetail/${accID}`),
                axios.get(`http://localhost:8080/api/bookings/view-booking-by-Id/${bookingID}`),

            ]);

            setProductBooking(pendingResponse.data);
            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);
            setUserAccountBooking(userBookingData.data);
            setUserAccountProduct(userProductData.data);
            setCustomerAccountBook(customerBookingData.data);
            console.log(customerBookingData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAcceptActive = async (bookingID) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/confirm_booking/${bookingID}`);
            setShowSecondDiv(false);
        
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleAcceptReject = async (bookingID) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/staff/Rejected/${bookingID}`);
            setShowSecondDiv(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };


    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const projectImage = images.find(image => image.productID === productBooking[0].productID);
    console.log(projectImage);
    return (
        <>

            <div className='respond-flex'>
                <div>
                    <div style={{ marginLeft: "140px", fontWeight: "bold", fontSize: "18px" }}>INFORMATION OF THE OWNER</div>
                    {productBooking.length > 0 && (

                        <Card sx={{ maxWidth: 345, ml: "100px", boxShadow: 3 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <ModalProfile accID={userAccountProduct} />
                                        {/* <ModalProfile accID={productBooking[0].} /> */}
                                    </Avatar>
                                }
                                title={userAccountProduct.accName}
                            // subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={projectImage ? projectImage.imgName : ""}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                    {productBooking[0].productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Description: {productBooking[0].productDescription}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Convenience: {productBooking[0].productConvenience}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Start Date: {formatDate(productBooking[0].availableStartDate)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    End Date: {formatDate(productBooking[0].availableEndDate)}
                                </Typography>
                            </CardContent>
                        </Card>

                    )}
                </div>
                <div>

                    {showSecondDiv && (
                        <div>
                            <div style={{ marginLeft: "25px", fontWeight: "bold", fontSize: "18px" }}>INFORMATION OF THE CUSTOMER</div>
                            <Card sx={{ width: 350, height: 576, boxShadow: 3 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            <ModalProfile accID={userAccountBooking} />
                                        </Avatar>
                                    }
                                    title={userAccountBooking.accName}
                                />
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={customerAccountBook[0] ? customerAccountBook[0].imgName : ""}
                                    alt={customerAccountBook[0] ? customerAccountBook[0].imgName : ""}
                                    sx={{ objectFit: "contain", maxHeight: "350px" }}

                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Booking Price: {customerAccountBook[0] ? customerAccountBook[0].bookingPrice : ""}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Person: {customerAccountBook[0] ? customerAccountBook[0].bookingPerson : ""}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing sx={{ mt: 4 }}>
                                    <Button variant="outlined" color="success" onClick={() => handleAcceptActive(customerAccountBook[0].bookingID)}>
                                        ACCEPT
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => handleAcceptReject(customerAccountBook[0].bookingID)}>
                                        REJECT
                                    </Button>

                                </CardActions>

                            </Card>
                        </div>

                    )}
                </div>

            </div>


        </>

    );
}
