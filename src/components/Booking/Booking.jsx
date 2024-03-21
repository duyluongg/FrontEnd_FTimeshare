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
import WaitToConfirmTab from './WaitToConfirmTab.jsx';
import AcceptedTab from './AcceptedTab.jsx';
import CompletedTab from './CompletedTab.jsx';
import CancelledTab from './CancelledTab.jsx';
import AllTab from './AllTab.jsx';

export default function Booking() {
    const [value, setValue] = useState('1');

    const { user } = useContext(UserContext);

    const [bookingInfoAccepted, setBookingInfoAccepted] = useState([]);
    const [bookingInfoConfirm, setBookingInfoConfirm] = useState([]);
    const [bookingInfoComplete, setBookingInfoComplete] = useState([]);
    const [bookingInfoCancel, setBookingInfoCancel] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchDataAccepted();
    }, [user.id]);
    const fetchDataAccepted = async () => {
        try {
            const bookingResponse = await axios.get(`http://localhost:8080/api/bookings/customer/waitToRespond-Active-Done-In_progress/${user.id}`);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                for (const bookingInfo of bookingInfoAccepted) {
                    await axios.put(`http://localhost:8080/api/bookings/staff/change_status_to_in_progress/${bookingInfo.bookingID}`);
                    await axios.put(`http://localhost:8080/api/bookings/staff/change_status_to_done/${bookingInfo.bookingID}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!loading) {
            fetchData();
        }
    }, [bookingInfoAccepted, loading]);

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
            await Promise.all([fetchDataAccepted(), fetchDataConfirm()]);
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
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: '#CD9A2B',
                                    },
                                }}
                            >
                                {/* Tab labels */}
                                <Tab
                                    label="Wait to Confirm" value={"1"} style={{ color: value === "1" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Accepted" value={"2"} style={{ color: value === "2" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Completed" value={"3"} style={{ color: value === "3" ? '#CD9A2B' : undefined }}
                                />
                                <Tab
                                    label="Cancelled" value={"4"} style={{ color: value === "4" ? '#CD9A2B' : undefined }}
                                />
                            </Tabs>
                        </Box>

                        {/* Tab panels */}
                        <TabPanel value="1">
                            <WaitToConfirmTab
                                bookingInfoConfirm={bookingInfoConfirm}
                                images={images}
                                formatDate={formatDate}
                                handleCancelActive={handleCancelActive}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <AcceptedTab
                                bookingInfoAccepted={bookingInfoAccepted}
                                images={images}
                                formatDate={formatDate}
                                handleCancelActive={handleCancelActive}
                                loading={loading}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <CompletedTab
                                bookingInfoComplete={bookingInfoComplete}
                                images={images}
                                formatDate={formatDate}
                            />
                        </TabPanel>
                        <TabPanel value="4">
                            <CancelledTab
                                bookingInfoCancel={bookingInfoCancel}
                                images={images}
                                formatDate={formatDate}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );

}
