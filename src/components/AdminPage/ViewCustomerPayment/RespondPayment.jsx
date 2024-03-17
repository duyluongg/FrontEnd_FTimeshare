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
import { Button } from '@mui/material';
import axios from 'axios';
import ModalProfile from '../ViewReport/ModalProfile';
import { Grid } from '@mui/material';
import './RespondPayment.css'
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

export default function RespondPayment() {
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
    const [customerAccountPayment, setCustomerAccountPayment] = useState([]);
    const [picture, setPicture] = useState('');
    const [picturePreview, setPicturePreview] = useState(null);
    const [showSecondDiv, setShowSecondDiv] = useState(true);
    const [userAccountPayment, setUserAccountPayment] = useState([]);


    console.log(bookingID);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const pendingResponse = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`);
            const accIDProduct = pendingResponse.data[0].accID;

            const [imagesResponse, profilesResponse, userProductData, userBookingData, customerBookingData, customerPayment, userPayment] = await Promise.all([
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview'),
                axios.get(`http://localhost:8080/api/users/viewDetail/${accIDProduct}`),
                axios.get(`http://localhost:8080/api/users/viewDetail/${accID}`),
                axios.get(`http://localhost:8080/api/bookings/view-booking-by-Id/${bookingID}`),
                axios.get('http://localhost:8080/api/bookings/staff/WaitRespondPayment(100)'),
                // axios.get('http://localhost:8080/api/bookings/staff/waitToConfirmRC'),
                axios.get(`http://localhost:8080/api/payment/payment/${accID}`),

            ]);


            setProductBooking(pendingResponse.data);
            setImages(imagesResponse.data);
            setProfiles(profilesResponse.data);
            setUserAccountBooking(userBookingData.data);
            setUserAccountProduct(userProductData.data);
            setCustomerAccountBook(customerBookingData.data);
            setCustomerAccountPayment(customerPayment.data);
            setUserAccountPayment(userPayment.data);
            console.log(customerPayment.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
            previewImage(file);
            console.log(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPicturePreview(reader.result);
        };
    };

    const handleUploadRespond = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('picture', picture);
            console.log(picture);
            const response = await axios.put(`http://localhost:8080/api/bookings/updateImgRespond/${bookingID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);

        } catch (error) {
            console.error('Lỗi up ảnh:', error.response.data);

        }
    }

    const handleAcceptCancelRespond = async (bookingID) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/confirm_booking_respond_payment/${bookingID}`);
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
                    {productBooking.length > 0 && (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {/* <ModalProfile accID={userAccount} /> */}
                                        {/* <ModalProfile accID={productBooking[0].} /> */}
                                        <ModalProfile accID={userAccountProduct} />
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
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
                            <CardActions disableSpacing>

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
                                    <Typography variant="body2" color="text.secondary">
                                        Person: {productBooking[0].productPerson}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Rating: {productBooking[0].productRating}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    )}
                </div>
                {showSecondDiv && (
                    <div>
                        <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', ml: 'auto' }}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            <ModalProfile accID={userAccountBooking} />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={userAccountBooking.accName}
                                    subheader="September 14, 2016"
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={customerAccountPayment[0] ? customerAccountPayment[0].imgName : ""}
                                    alt={customerAccountPayment[0] ? customerAccountPayment[0].imgName : ""}
                                />
                                <CardContent>

                                    <Typography variant="body2" color="text.secondary">
                                        Cash refund amount: {customerAccountPayment[0] ? customerAccountPayment[0].bookingPrice : ""}
                                    </Typography>
                                    <form onSubmit={handleUploadRespond}>
                                        <Typography variant="body2" color="text.secondary">
                                            <div className="">
                                                <label htmlFor="avatar">Avatar</label>
                                                <input
                                                    type="file"
                                                    id="picture"
                                                    onChange={handleImageChange}
                                                />
                                                {picturePreview && (
                                                    <div className="input-container">
                                                        <label>Respond Image Preview:</label>
                                                        <img src={picturePreview} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                                    </div>
                                                )}
                                            </div>
                                        </Typography>
                                        <button className="register-button" type="submit">Submit</button>
                                        <Button variant="outlined" color="success" onClick={() => handleAcceptCancelRespond(customerAccountPayment[0].bookingID)}>
                                            ACCEPT
                                        </Button>

                                    </form>



                                </CardContent>
                                {/* <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
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
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                
                            </CardContent>
                        </Collapse> */}
                            </Card>

                            <Card sx={{ maxWidth: 550 }}>
                                <CardHeader
                                 
                        
                                    title= "INFORMATION OF CUSTOMER PAYMENT"

                                />

                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={userAccountPayment[0] ? userAccountPayment[0].imgName : ""}
                                    alt={userAccountPayment[0] ? userAccountPayment[0].imgName : ""}
                                    sx={{ objectFit: "contain", maxHeight: "350px" }}
                                />
                                <CardContent>

                                    <Typography variant="body2" color="text.secondary">
                                        Cash refund amount: {customerAccountPayment[0] ? customerAccountPayment[0].bookingPrice : ""}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        AccountName: {userAccountPayment[0] ? userAccountPayment[0].accountName : ""}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Banking: {userAccountPayment[0] ? userAccountPayment[0].banking : ""}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Account Number: {userAccountPayment[0] ? userAccountPayment[0].accountNumber : ""}
                                    </Typography>
                              



                                </CardContent>
                             
                            </Card>
                        </Grid>
                    </div>
                )}
            </div>
            {/* <CustomizedTables/> */}




        </>

    );
}
