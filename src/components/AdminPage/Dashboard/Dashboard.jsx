import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';

export default function Dashboard() {
    // const [totals, setTotals] = useState([]);

    // useEffect(() => {
    //     fetchTotals();
    // }, []);
    //     const fetchTotals = async () => {
    //         try {
    //             const responses = await axios.get('http://localhost:8080/api/products/staff/totalActive')




    //             // const data = responses.map(response => response.data);
    //             setTotals(responses.data);
    //             console.log(responses);
    //         } catch (error) {
    //             console.error('Error fetching totals:', error);
    //         }
    //     };

    const [totals, setTotals] = useState([]);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const responses = await Promise.all([

                    axios.get('http://localhost:8080/api/products/staff/totalActive'),
                    axios.get('http://localhost:8080/api/users/staff/count/ROLE_CUSTOMER'),
                    axios.get('http://localhost:8080/api/products/staff/totalPending'),
                    axios.get('http://localhost:8080/api/products/staff/totalRejected'),
                    axios.get('http://localhost:8080/api/users/staff/count/ROLE_STAFF'),
                    // axios.get('http://localhost:8080/api/reports/viewAll'),
                    // axios.get('http://localhost:8080/api/bookings/staff/totalCancel'),
                    // axios.get('http://localhost:8080/api/bookings/staff/totalPending'),
                    axios.get('http://localhost:8080/api/bookings/staff/totalActive'),
                    axios.get('http://localhost:8080/api/bookings/staff/totalWaitToConfirm'),
                    axios.get('http://localhost:8080/api/bookings/staff/totalWaitToConfirmRC'),

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
        // { id: 4, number: 300, label: 'Closed Project', link: 'closed-project' },
        { id: 4, label: 'Rejected Product', link: 'rejected-product' },
        // { id: 5,  label: 'Report Project', link: 'report-project' },
        { id: 5, label: 'Total Staff', link: 'total-staff' },
        // { id: 6, label: 'Total Report', link: 'total-report' },
        // { id: 6, label: 'Cancel List', link: 'cancel-list' },
        // { id: 6, label: 'View Pending Booking List', link: 'pending-list' },
        { id: 6, label: 'View Active Booking List', link: 'active-list' },
        { id: 7, label: 'Booking with wait to confirm', link: 'wait-to-confirm-list' },
        { id: 8, label: 'Booking with wait to confirm request cancel', link: 'wait-to-confirm-rc' },

        { id: 9, label: 'Booking with Wait to confirm respond payment (100%)', link: 'wait-customer-to-confirm-payment-list' },
        { id: 10, label: 'Booking with Wait to confirm respond payment (80%)', link: 'wait-customer-to-confirm-payment-list' },
        { id: 11, label: 'New', link: 'new' },












    ];

    return (
        <div>

            <div className='card-db-flex'>
                <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', ml: '20px' }}>
                    {cards.map((cardDB, index) => (
                        <Link key={cardDB.id} to={`/admin/${cardDB.link}`} className='card-link'>
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
