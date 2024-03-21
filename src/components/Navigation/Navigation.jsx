import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Navigation() {

  const { user } = useContext(UserContext);

  return (
    <nav className='header'>
      <div className='nav-welcome'>
        Welcome to Booking Homestay !
      </div>
      <ul className='nav-list'>
        {/* {!(user && user.auth === true) && (
          <>
            <li><Link to={'register'}>Register</Link></li>
            <li>|</li>
            <li><Link to={'login'}>Login</Link></li>
            <li>|</li>
          </>
        )} */}
        {/* <li><a href='#'>Cart</a></li>
        <li>|</li>
        <li><a href='#' type='search'>Search</a></li> */}
        {/* <li><input type='text'>Search</input></li> */}

      </ul>
    </nav>
  );
}
