import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
                    axios.get('http://localhost:8080/api/products/staff/totalPending'),
                    axios.get('http://localhost:8080/api/products/staff/totalClosed'),
                    axios.get('http://localhost:8080/api/products/staff/totalRejected'),
                  
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
        { id: 1, number: 655, label: 'Total Project', link: 'total-project' },
        { id: 2, number: 100, label: 'Total Users', link: 'total-users' },
        { id: 3, number: 50, label: 'Pending Project', link: 'pending-project' },
        { id: 4, number: 300, label: 'Closed Project', link: 'closed-project' },
        { id: 5, number: 205, label: 'Rejected Project', link: 'rejected-prject' }
    ];
   
    return (
        <div>
            <div className='card-db-flex'>
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
            </div>
        </div>
    );

    // return (
    //     <div>
    //         <div className='card-db-flex'>
    //             {cards.map((card, index) => (
    //                 <Link key={card.id} to={`/admin/${card.link}`} className='card-link'>
    //                     <div className='card-db'>
    //                         <div className='card-db-detail'>
    //                             <h2>{totals[index]}</h2>
    //                             <p>{card.label}</p>
    //                         </div>
    //                     </div>
    //                 </Link>
    //             ))}
    //         </div>
    //     </div>
    // );
}
