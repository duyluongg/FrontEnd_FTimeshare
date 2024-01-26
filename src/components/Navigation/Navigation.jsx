import React from 'react'

export default function Navigation() {
  return (
    <nav className='header'>
      <div className='nav-welcome'>
        Welcome to F-Timeshare !
      </div>
      <ul className='nav-list'>
        <li><a href='#'>Register</a></li>
        <li>|</li>
        <li><a href='#'>Log in</a> </li>
        <li>|</li>
        <li><a href='#'>Cart</a> </li>
        <li>|</li>
        <li><a href='#'>Search</a></li>

      </ul>
    </nav>
  );
}
