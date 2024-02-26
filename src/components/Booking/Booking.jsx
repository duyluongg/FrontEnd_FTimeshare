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

export default function Booking() {
    const [value, setValue] = useState('1');
    const userId = useParams();
    const [bookingInfo, setBookingInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/by-account/${userId.id}`);

                // Combine booking and product information
                const combinedData = await Promise.all(bookingResponse.data.map(async (booking) => {
                    console.log(booking.productID);
                    const productResponse = await axios.get(`http://localhost:8080/api/products/viewById/${booking.productID}`);
                    console.log(productResponse.data[0].productName);
                    return { ...booking, product: productResponse.data[0] };
                }));

                setBookingInfo(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userId.id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

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
                                    label="To Confirm" value={"1"} style={{ color: value === "1" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="To Pay" value={"2"} style={{ color: value === "2" ? '#CD9A2B' : undefined }}
                                />
                                {/* xác nhận đã nhận được product chưa => hiện sao cho người dùng đánh dấu */}
                                <Tab
                                    label="To Receive" value={"3"} style={{ color: value === "3" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Completed" value={"4"} style={{ color: value === "4" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Cancelled" value={"5"} style={{ color: value === "5" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Return Refund" value={"6"} style={{ color: value === "6" ? '#CD9A2B' : undefined }}
                                />
                            </Tabs>
                        </Box>
                        <TabPanel className="MuiTabPanel-root" value="1">
                        {bookingInfo.map((booking, index) => (
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
                                                        {booking.product.productName}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {booking.product.productDescription}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        {booking.startDate} - {booking.endDate}
                                                    </Typography>
                                                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                        <Grid item>
                                                            <Button sx={{ cursor: "pointer", fontSize: '0.8rem' }} color="error" variant="contained" startIcon={<DeleteIcon />}>
                                                                Cancel
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" component="div">
                                                    ${booking.bookingPrice}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                
                            </Paper>
                            ))}

                        </TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="2">Item One</TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="3">Item One</TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="4">Item One</TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="5">Item One</TabPanel>
                        <TabPanel className="MuiTabPanel-root" value="6">Item One</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );

}