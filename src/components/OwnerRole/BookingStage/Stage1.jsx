import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

const Stage1 = ({ handleNext, booking, product }) => {

    console.log(booking);
    console.log(product);

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    // const handleProceedToCheckout = () => {
    //     // Gọi hàm callback để truyền totalCost sang Stage2
    //     handleNext(totalCost);
    // };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: '10%' }}>Customer Name</TableCell>
                            <TableCell align="left" style={{ width: '10%' }}>Phone</TableCell>
                            <TableCell align="left" style={{ width: '20%' }}>Product Name - Product Owner</TableCell>
                            <TableCell align="left" style={{ width: '10%' }}>Product Type</TableCell>
                            <TableCell align="left" style={{ width: '10%' }}>Number of People</TableCell>
                            <TableCell align="left" style={{ width: '20%' }}>StartDate</TableCell>
                            <TableCell align="left" style={{ width: '20%' }}>EndDate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booking.map((item) => (

                            <TableRow>
                                <TableCell align="left">Customer Name</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Owner Name</TableCell>
                                <TableCell align="left">Room Type</TableCell>
                                <TableCell align="left">{item.bookingPerson}</TableCell>
                                <TableCell align="left">{formatDate(item.startDate)}</TableCell>
                                <TableCell align="left">{formatDate(item.endDate)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow style={{ height: '30px' }}></TableRow>
                        {product.map((item) => (
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Price ($/per-day)</TableCell>
                                <TableCell>${item.productPrice}</TableCell>
                            </TableRow>
                        ))}
                        {booking.map((item) => (
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell>${item.bookingPrice}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={2}>
                                {/* onClick={handleButtonClick} */}
                                <Button variant="contained" style={{ backgroundColor: '#cd9a2b' }} onClick={handleNext}>
                                    Proceed to checkout
                                </Button>
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Stage1;