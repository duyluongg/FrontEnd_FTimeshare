import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';

export default function Dashboard() {

    const [totals, setTotals] = useState([]);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const responses = await Promise.all([

                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/totalActive'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/users/staff/count/ROLE_CUSTOMER'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/totalPending'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/totalRejected'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/totalClosed'),
                    // axios.get('http://localhost:8080/api/users/staff/count/ROLE_STAFF'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/totalActive'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/totalWaitToConfirm'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/totalWaitToConfirmRC'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/totalWaitToRespond100'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/totalWaitToRespond80'),
                    axios.get('https://bookinghomestayswp.azurewebsites.net/api/news/staff/totalNews'),
                ]);

                const data = responses.map(response => response.data);
                setTotals(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching totals:', error);
            }
        };

        fetchTotals();
    }, []);

    const cards = [
        { id: 1, label: 'Total Product', link: 'total-product' },
        { id: 2, label: 'Total Users', link: 'total-users' },
        { id: 3, label: 'Pending Product', link: 'pending-product' },
        { id: 4, label: 'Rejected Product', link: 'rejected-product' },
        { id: 5, label: 'Closed Product', link: 'closed-product' },    
        // { id: 6, label: 'Total Staff', link: 'total-staff' },     
        { id: 6, label: 'View Active Booking List', link: 'active-list' },
        { id: 7, label: 'Booking with wait to confirm', link: 'wait-to-confirm-list' },
        { id: 8, label: 'Booking with wait to confirm request cancel', link: 'wait-to-confirm-rc' },
        { id: 9, label: 'Booking with Wait to confirm respond payment (100%)', link: 'wait-customer-to-confirm-payment-list/100' },
        { id: 10, label: 'Booking with Wait to confirm respond payment (80%)', link: 'wait-customer-to-confirm-payment-list/80' },
        { id: 11, label: 'All New', link: 'all-new' },
        { id: 12, label: 'New', link: 'new' },
 
    ];

    return (
        <div>

            <div className='card-db-flex'>
                <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', ml: '130px' , mt:"50px"}}>
                    {cards.map((cardDB, index) => (
                        <Link key={cardDB.id} to={`/staff/${cardDB.link}`} className='card-link'>
                            <div className='card-db'>
                                <div className='card-db-detail'>
                                    <h2>{totals[index]}</h2>
                                    <p>{cardDB.label}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Grid >
            </div>
        </div>
    );


}
