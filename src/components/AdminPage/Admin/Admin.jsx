import React from 'react';
import Sidenav from '../Sidenav/Sidenav.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import { Routes, Route } from 'react-router-dom';
import TotalUser from '../TotalUser/TotalUser.jsx';

export default function Admin() {
    return (
        <body>
            <Sidenav />

            {/* <Routes>

                    <Route path='/' element={<Dashboard />}></Route>
                    <Route path='/admin/total-users' element={<TotalUser />}></Route>



                </Routes> */}
    
        </body>
    );
}
