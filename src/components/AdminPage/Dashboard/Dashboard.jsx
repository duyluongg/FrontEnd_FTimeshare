import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
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
                {cards.map(cardDB => (
                    <Link key={cardDB.id} to={`/admin/${cardDB.link}`} className='card-link'>
                        <div className='card-db'>
                            <div className='card-db-detail'>
                                <h2>{cardDB.number}</h2>
                                <p>{cardDB.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
