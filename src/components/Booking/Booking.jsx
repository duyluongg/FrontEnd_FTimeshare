import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import ReviewCustomer from '../Detail/ReviewCustomer.jsx'
import FormFeedback from '../FormFeedback/FormFeedback.jsx';
import FormReport from '../FormReport/FormReport.jsx';
export default function Booking() {
    const [value, setValue] = useState('1');

    const { user } = useContext(UserContext);

    const [bookingInfoAccepted, setBookingInfoAccepted] = useState([]);
    const [bookingInfoConfirm, setBookingInfoConfirm] = useState([]);
    const [bookingInfoComplete, setBookingInfoComplete] = useState([]);
    const [bookingInfoCancel, setBookingInfoCancel] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/by-account/${user.id}`);

    //             // Combine booking and product information
    //             const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
    //                 console.log(booking.productID);
    //                 const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
    //                 console.log(productResponse.data[0].productName);
    //                 return { ...booking, product: productResponse.data[0] };
    //             }));

    //             setBookingInfo(combinedData);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [user.id]);

    useEffect(() => {
        fetchData();
    }, [user.id]);
    const fetchData = async () => {
        try {
            const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/customer/waitToRespond-Active/${user.id}`);

            // Combine booking and product information
            const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
                console.log(booking.productID);
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
                console.log(productResponse.data[0].productName);
                return { ...booking, product: productResponse.data[0] };
            }));

            setBookingInfoAccepted(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {
        fetchDataConfirm();
    }, [user.id]);
    const fetchDataConfirm = async () => {
        try {
            const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/customer/waitToByAccId/${user.id}`);

            // Combine booking and product information
            const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
                console.log(booking.productID);
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
                console.log(productResponse.data[0].productName);
                return { ...booking, product: productResponse.data[0] };
            }));

            setBookingInfoConfirm(combinedData);
            console.log(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataComplete();
    }, [user.id]);
    const fetchDataComplete = async () => {
        try {
            const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/by-account/done/${user.id}`);

            // Combine booking and product information
            const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
                console.log(booking.productID);
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
                console.log(productResponse.data[0].productName);
                return { ...booking, product: productResponse.data[0] };
            }));

            setBookingInfoComplete(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataCancel();
    }, [user.id]);
    const fetchDataCancel = async () => {
        try {
            const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/by-account/cancel/${user.id}`);

            // Combine booking and product information
            const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
                console.log(booking.productID);
                const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
                console.log(productResponse.data[0].productName);
                return { ...booking, product: productResponse.data[0] };
            }));

            setBookingInfoCancel(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const handleCancelActive = async (bookingID) => {
        console.log(bookingID);
        try {
            // Gửi yêu cầu hủy đặt phòng và chờ phản hồi
            const cancelResponse = await axios.post(`http://localhost:8080/api/bookings/cancel/${bookingID}`);
            
            // Gọi lại cả fetchData và fetchDataConfirm để cập nhật dữ liệu mới
            await Promise.all([fetchData(), fetchDataConfirm()]);
            
            console.log(cancelResponse.data);
            // Xử lý sau khi hủy thành công
        } catch (error) {
            console.error('Lỗi khi hủy đặt phòng:', error);
            // Xử lý lỗi khi hủy không thành công
        }
    };
    
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pictures/customerview`);

                setImages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };

        fetchImg();
    }, []);

    return (
        <>
            <div className='purchase-container'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="purchase-tab-title">
                            <Tabs
                                // sx={{
                                //     borderBottom: '1px solid', // border của Tabs
                                //     borderColor: 'divider',    // màu border
                                //     display: 'inline-flex',
                                //     marginBottom: '10px',      // margin dưới (để tạo khoảng cách giữa Tabs và nội dung phía dưới)
                                // }}
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: '#CD9A2B', // Màu của chỉ số trên thanh tab
                                    },
                                }}
                            >
                                <Tab
                                    label="Wait to Confirm" value={"1"} style={{ color: value === "1" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Accepted" value={"2"} style={{ color: value === "2" ? '#CD9A2B' : undefined }}
                                />
                                {/* xác nhận đã nhận được product chưa => hiện sao cho người dùng đánh dấu */}
                                <Tab
                                    label="Completed" value={"3"} style={{ color: value === "3" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Cancelled" value={"4"} style={{ color: value === "4" ? '#CD9A2B' : undefined }}
                                />
                                {/* <Tab
                                    label="Cancelled" value={"5"} style={{ color: value === "5" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Return Refund" value={"6"} style={{ color: value === "6" ? '#CD9A2B' : undefined }}
                                /> */}
                            </Tabs>
                        </Box>
                        <TabPanel className="MuiTabPanel-root" value="1">
                            {bookingInfoConfirm.map((bookingInfo, index) => {
                                console.log(bookingInfo);
                                const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                                console.log(projectImage);
                                return (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            margin: "auto",
                                            maxWidth: 600,
                                            flexGrow: 1,
                                            marginBottom: "16px",
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                        }}
                                    >

                                        <Grid container spacing={2}>
                                            <Grid key={index}>
                                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                                    <Img
                                                        alt="complex"
                                                        src={projectImage ? projectImage.imgName : ""}
                                                    />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1" component="div">
                                                            {bookingInfo.product.productName}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {bookingInfo.product.productDescription}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            {bookingInfo.startDate} - {bookingInfo.endDate}
                                                        </Typography>
                                                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                            <Grid item>
                                                                {bookingInfo.bookingStatus === 'Wait to confirm (request cancel)' ? (

                                                                    <Typography variant="body2">Wait to confirm (request cancel)</Typography>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                        sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                        color="error"
                                                                        variant="contained"
                                                                        startIcon={<DeleteIcon />}
                                                                    >
                                                                        Cancel
                                                                    </Button>

                                                                    
                                                                )}
                                                            </Grid>
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" component="div">
                                                        ${bookingInfo.bookingPrice}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Paper>
                                )

                            })}
                        </TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="2">
                            {bookingInfoAccepted.map((bookingInfo, index) => (
                                <Paper
                                    sx={{
                                        p: 2,
                                        margin: "auto",
                                        maxWidth: 600,
                                        flexGrow: 1,
                                        marginBottom: "16px",
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                    }}
                                >

                                    <Grid container spacing={2}>
                                       
                                        <Grid key={index}>
                                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                                <Img
                                                    alt="complex"
                                                    src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        {bookingInfo.product.productName}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {bookingInfo.product.productDescription}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        {bookingInfo.startDate} - {bookingInfo.endDate}
                                                    </Typography>
                                                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                        <Grid item>
                                                            {/* {bookingInfo.bookingStatus === 'Wait to confirm' ? ( */}
                                                            {bookingInfo.bookingStatus.includes('Wait to respond') ? (
                                                                <Typography variant="body2">Wait to respond</Typography>
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                    sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                    color="error"
                                                                    variant="contained"
                                                                    startIcon={<DeleteIcon />}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <FormFeedback getID={bookingInfo.productID} getBookID={bookingInfo.bookingID}/>
                                                    <FormReport getID={bookingInfo.productID} getBookID={bookingInfo.bookingID}/>
                                                    {/* <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                        <Grid item>
                                                        
                                                            {bookingInfo.bookingStatus.includes('Wait to respond') ? (
                                                                <Typography variant="body2">Wait to respond</Typography>
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                    sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                    color="success"
                                                                    variant="contained"
                                                                    startIcon={<DeleteIcon />}
                                                                >
                                                                      <FormFeedback getID={productId.id}/>
                                                                </Button>
                                                            )}
                                                        </Grid>
                                                    </Grid> */}
                                                    
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" component="div">
                                                    ${bookingInfo.bookingPrice}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Paper>
                            ))}
                        </TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="3">
                            {bookingInfoComplete.map((bookingInfo, index) => {
                                console.log(bookingInfo);
                                const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                                console.log(projectImage);

                                return (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            margin: "auto",
                                            maxWidth: 600,
                                            flexGrow: 1,
                                            marginBottom: "16px",
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                        }}
                                    >

                                        <Grid container spacing={2}>
                                            <Grid key={index}>
                                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                                    <Img
                                                        alt="complex"
                                                        src={projectImage ? projectImage.imgName : ""}
                                                    />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1" component="div">
                                                            {bookingInfo.product.productName}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {bookingInfo.product.productDescription}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            {bookingInfo.startDate} - {bookingInfo.endDate}
                                                        </Typography>
                                                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                            <Grid item>
                                                                {bookingInfo.bookingStatus === 'Wait to confirm (request cancel)' ? (

                                                                    <Typography variant="body2">Wait to confirm (request cancel)</Typography>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                        sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                        color="error"
                                                                        variant="contained"
                                                                        startIcon={<DeleteIcon />}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" component="div">
                                                        ${bookingInfo.bookingPrice}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Paper>
                                )

                            })}
                        </TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="4">
                            {bookingInfoCancel.map((bookingInfo, index) => {
                                console.log(bookingInfo);
                                const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                                console.log(projectImage);

                                return (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            margin: "auto",
                                            maxWidth: 600,
                                            flexGrow: 1,
                                            marginBottom: "16px",
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                        }}
                                    >

                                        <Grid container spacing={2}>
                                            <Grid key={index}>
                                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                                    <Img
                                                        alt="complex"
                                                        src={projectImage ? projectImage.imgName : ""}
                                                    />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1" component="div">
                                                            {bookingInfo.product.productName}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {bookingInfo.product.productDescription}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            {bookingInfo.startDate} - {bookingInfo.endDate}
                                                        </Typography>
                                                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                            <Grid item>
                                                                {bookingInfo.bookingStatus === 'Wait to confirm (request cancel)' ? (

                                                                    <Typography variant="body2">Wait to confirm (request cancel)</Typography>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                        sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                        color="error"
                                                                        variant="contained"
                                                                        startIcon={<DeleteIcon />}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" component="div">
                                                        ${bookingInfo.bookingPrice}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Paper>
                                )

                            })}
                        </TabPanel>
                        {/* <TabPanel className="MuiTabPanel-root" value="5">Item One</TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="6">Item One</TabPanel> */}
                    </TabContext>
                </Box>
            </div>
        </>
    );

}
