import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import axios from 'axios';

function getStepContent(step, handleNext) {
    const location = useLocation();
    // const { name, checkInDate, numPeople, phone, checkOutDate, roomType, productPrice, productID } = location.state;
    const { bookingID, productID } = location.state;
    console.log(productID);

    const [booking, setBooking] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const viewBookingById = async () => {
            try {
                const respose = await axios.get(`http://localhost:8080/api/bookings/view-booking-by-Id/${bookingID}`);
                setBooking(respose.data);
                console.log(respose.data)
            } catch(error) {
                console.error('Error view booking by id', error);
            }
        };
        viewBookingById();
    }, [bookingID]);

    useEffect(() => {
        const viewProductPriceById = async () => {
            try {
                const respose = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`);
                setProduct(respose.data);
                console.log(respose.data)
            } catch(error) {
                console.error('Error view booking by id', error);
            }
        };
        viewProductPriceById();
    }, [productID]);

    console.log(product);

    switch (step) {
        case 0:
            return (
                <div>
                    <Stage1
                        handleNext={handleNext}
                        booking={booking}
                        product={product}
                    />
                </div>
            );
        case 1:
            return (
                <div>
                    <Stage2
                    handleNext={handleNext}
                    booking={booking}
                    />
                </div>
            );
        case 2:
            return (
                <Box>
                    {/* Nội dung của bước 3 */}
                    <Typography variant="h6">Bước 3: Xác nhận đơn hàng</Typography>
                    {/* Hiển thị thông tin đơn hàng, nút xác nhận đặt hàng */}
                </Box>
            );
        default:
            return "Unknown step";
    }
}

const BookingStage = () => {

    const steps = ['Booking Information', 'Payment', 'Booking Success'];

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    // const isStepOptional = (step) => {
    //     return step === 1 ? false : true;
    // };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    return (
        <>
            <div className='booking-stage-container'>
                <Box sx={{ width: '80%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            // if (isStepOptional(index)) {
                            //     labelProps.optional = (
                            //         <Typography variant="caption">Optional</Typography>
                            //     );
                            // }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {/* <Button onClick={handleReset}>Reset</Button> */}
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            <Box sx={{ mt: 2 }}>{getStepContent(activeStep, handleNext)}</Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {/* {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )} */}

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    );


};

export default BookingStage;
