import React from 'react'
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='header'>
      <div className='nav-welcome'>
        Welcome to F-Timeshare !
      </div>
      <ul className='nav-list'>
        <li><Link to={'register'}>Register</Link></li>
        <li>|</li>
        <li><Link to={'login'}>Login</Link></li>
        <li>|</li>
        <li><a href='#'>Cart</a></li>
        <li>|</li>
        <li><a href='#'>Search</a></li>

      </ul>
    </nav>
  );
}
