import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation/Navigation.jsx'
import Header from './components/Header/Header.jsx'
import './components/Header/Header.css'
import Navbar from './components/Navbar/Navbar.jsx'
import './components/Navbar/Navbar.css'
import Project from './components/ProjectList/Project.jsx'
import './components/ProjectList/Project.css'
import './Shared/ListOfProject.js'
import Footer from './components/Footer/Footer.jsx'
import './components/Footer/Footer.css'
import { Routes, Route } from 'react-router-dom'
import Detail from './components/Detail/Detail.jsx'
import './components/Detail/Detail.css'
import Login from './components/Login/Login.jsx'
import './components/Login/Login.css'
import Register from './components/Register/Register.jsx'
import './components/Register/Register.css'
import Contact from './components/Contact/Contact.jsx'
import './components/Contact/Contact.css'
import AdminPage from './components/AdminPage/Admin/Admin.jsx'
import './components/AdminPage/Admin/Admin.css'
// import Sidenav from './components/Admin/Admin.jsx'
import TotalUser from './components/AdminPage/TotalUser/TotalUser.jsx'
// import  './components/AdminPage/TotalUser/TotalUser.css'


import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail');
  const isLoginPage = location.pathname.includes('/login');
  const isRegisterPage = location.pathname.includes('/register');
  const isContactPage = location.pathname.includes('/contact-info');
  const isAdminPage = location.pathname.includes('/admin');
  const isTotalUser = location.pathname.includes('/admin/total-users');

  return (
    <>
      {!isAdminPage  && (
        <>
          <Navigation />
          <Navbar />
        </>
      )}

      {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && <Header />}

      <Routes>
        <Route path='/' element={<Project />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route>
        <Route path='/admin/*' element={<AdminPage />}></Route>
        {/* <Route path='/admin/total-users/*' element={<TotalUser />}></Route> */}

    
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;

