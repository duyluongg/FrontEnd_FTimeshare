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

    const currentDate = new Date();
    console.log(currentDate);

    return (
        <>
            {/* <div className='purchase-container'>
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

                                <Tab
                                    label="All" value={"5"} style={{ color: value === "5" ? '#CD9A2B' : undefined }}
                                />

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
                                                            {formatDate(bookingInfo.startDate)} -  {formatDate(bookingInfo.endDate)}
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
                                                        {formatDate(bookingInfo.startDate)} -  {formatDate(bookingInfo.endDate)}
                                                    </Typography>         
                                                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                        <Grid item>
                                                            {bookingInfo.bookingStatus.includes('Wait to respond') ? (
                                                                <Typography variant="body2">Wait to respond</Typography>
                                                            ) : currentDate < new Date(bookingInfo.startDate[0], bookingInfo.startDate[1] - 1, bookingInfo.startDate[2], bookingInfo.startDate[3], bookingInfo.startDate[4]) ? (
                                                                <Button
                                                                    onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                                    sx={{ cursor: 'pointer', fontSize: '0.8rem' }}
                                                                    color="error"
                                                                    variant="contained"
                                                                    startIcon={<DeleteIcon />}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            ) : bookingInfo.bookingStatus === 'Active' && currentDate >= new Date(bookingInfo.startDate[0], bookingInfo.startDate[1] - 1, bookingInfo.startDate[2], bookingInfo.startDate[3], bookingInfo.startDate[4]) && currentDate <= new Date(bookingInfo.endDate[0], bookingInfo.endDate[1] - 1, bookingInfo.endDate[2], bookingInfo.endDate[3], bookingInfo.endDate[4]) ? (
                                                                <Typography variant="body2">In Progress</Typography>
                                                            ) : null}
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
                                                            {formatDate(bookingInfo.startDate)} -  {formatDate(bookingInfo.endDate)}

                                                        </Typography>
                                                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                            <Grid item>
                                                                <Typography variant="body2">Completed</Typography>
                                                                
                                                            </Grid>
                                                        </Grid>
                                                        <FormFeedback getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} />
                                                        <FormReport getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} />
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
                                                            {formatDate(bookingInfo.startDate)} -  {formatDate(bookingInfo.endDate)}

                                                        </Typography>
                                                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                                                            <Grid item>
                                                                <Typography variant="body2">Cancelled</Typography>
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


                        <TabPanel className="MuiTabPanel-root" value="5">
                            <div className="YL_VlX">
                                <div>
                                    <div className='J632se'>
                                        <section>
                                            <h3 className="a11y-hidden"></h3>
                                            <div className='P2JMvg'>
                                                <div classNae="RBPP9y">
                                                    <div class="UDaMW3" tabindex="0">Owner Name</div>
                                                </div>
                                                <div className='jgIyoX'>
                                                    <div class="bv3eJE" tabindex="0">Status booking</div>
                                                </div>
                                            </div>
                                        </section>
                                        <div class="kG_yF0"></div>
                                        <section>
                                            <h3 class="a11y-hidden"></h3>
                                            <a href="">
                                                <div>
                                                    <div className='bdAfgU'>
                                                        <section>
                                                            <div className='mZ1OWk'>
                                                                <div className='dJaa92'>
                                                                    <img src="#" className='gQuHsZ'></img>
                                                                    <div className='nmdHRf'>
                                                                        <div>
                                                                            <div className='zWrp4w'>
                                                                                <span class="DWVWOJ" tabindex="0">Product name</span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='zWrp4w'>
                                                                                <span class="DWVWOJ" tabindex="0">StartDate - EndDate</span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div class="j3I_Nh" tabindex="0">Booking Person</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="ylYzwa" tabindex="0">
                                                                    <div class="YRp1mm">
                                                                        <span class="nW_6Oi PNlXhK">₫159.000</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </a>
                                        </section>
                                    </div>
                                </div>
                                <div class="kG_yF0"></div>
                                <div className='yyqgYp'>
                                    <div class="iwUeSD">
                                        <div>
                                            <span class="CDsaN0" aria-label="Đánh giá sản phẩm trước 21-03-2024" tabindex="0">
                                                <div class="shopee-drawer" id="pc-drawer-id-21" tabindex="0"><u class="GQOPby" aria-describedby="0.5723019374949412"></u></div>
                                            </span>
                                        </div>
                                        <span class="f423Cb"></span>
                                    </div>
                                    <section className='po9nwN'>
                                        <h3 class="a11y-hidden"></h3>
                                        <div class="aAXjeK">
                                            <div>
                                                <button class="stardust-button stardust-button--primary QY7kZh">Report</button>
                                            </div>
                                        </div>
                                        <div class="aAXjeK">
                                            <div>
                                                <button class="stardust-button stardust-button--primary QY7kZh">Feedback</button>
                                            </div>
                                        </div>
                                        <div class="hbQXWm">
                                            <div>
                                                <button class="stardust-button stardust-button--secondary QY7kZh">Book Again</button>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </TabPanel>

                    </TabContext>
                </Box>
            </div> */}

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
