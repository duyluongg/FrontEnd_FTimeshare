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
import OwnerPage from './components/OwnerRole/OwnerPage/OwnerPage.jsx'
import './components/OwnerRole/OwnerPage/OwnerPage.css'
import CreateTimeshare from './components/OwnerRole/CreateTimeshare/CreateTimeshare.jsx'
import './components/OwnerRole/CreateTimeshare/CreateTimeshare.css'
import ViewProject from './components/OwnerRole/ViewProject/ViewProject.jsx'
import './components/OwnerRole/ViewProject/ViewProject.css'
import ViewDetail from './components/OwnerRole/ViewDetail/ViewDetail.jsx'
import './components/OwnerRole/ViewDetail/ViewDetail.css'
import AdminPage from './components/AdminPage/Admin/Admin.jsx'
import './components/AdminPage/Admin/Admin.css'
import ViewNews from './components/News/ViewNews/ViewNews.jsx'
import './components/News/ViewNews/ViewNews.css'
import CreateNews from './components/News/CreateNews/CreateNews.jsx'
import './components/News/CreateNews/CreateNews.css'
import Accommodation from './components/Accommodation/Accommodation.jsx'
import './components/Accommodation/Accommodation.css'
import Booking from './components/Booking/Booking.jsx'
import './components/Booking/Booking.css'
// import Sidenav from './components/Admin/Admin.jsx'
import TotalUser from './components/AdminPage/TotalUser/TotalUser.jsx'
// import  './components/AdminPage/TotalUser/TotalUser.css'
import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'
import ViewReport from './components/AdminPage/ViewReport/ViewReport.jsx'
import Sidenav from './components/AdminPage/Sidenav/Sidenav.jsx';

import { useLocation } from 'react-router-dom';
import SidenavReport from './components/SidenavReport.jsx'
// import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'

function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail');
  const isLoginPage = location.pathname.includes('/login');
  const isRegisterPage = location.pathname.includes('/register');
  const isContactPage = location.pathname.includes('/contact-info');
  const isCreateTimeshare = location.pathname.includes('/create-timeshare');
  const isViewProject = location.pathname.includes('/view-projects');
  const isViewDetail = location.pathname.includes('/view-project-detail');
  const isAdminPage = location.pathname.includes('/admin');
  const isTotalUser = location.pathname.includes('/admin/total-users');
  const isViewNews = location.pathname.includes('/view-news');
  const isCreateNews = location.pathname.includes('/create-news');
  const isAccommodation = location.pathname.includes('/accommodation');
  const isBooking = location.pathname.includes('/view-booking-history');

  return (
    <>
      {!isAdminPage  && (
        <>
          <Navigation />
          <Navbar />
        </>
      )}

    


      {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && !isCreateTimeshare && !isViewProject && !isViewDetail && !isTotalUser &&!isViewNews && !isCreateNews &&!isAccommodation && !isBooking && <Header />}
      <Routes>
        <Route path='/' element={<Project />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route> 
        <Route path='/owner-page' element={<OwnerPage />}></Route>
        <Route path='/create-timeshare' element={<CreateTimeshare />}></Route>
        <Route path='/view-projects' element={<ViewProject />}></Route>
        <Route path='/view-project-detail/:id' element={<ViewDetail />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route>
        <Route path='/admin/*' element={<AdminPage />}></Route>
        <Route path='/view-news/:id' element={<ViewNews />}></Route>
        <Route path='/create-news' element={<CreateNews />}></Route> 
        <Route path='/accommodation' element={<Accommodation />}></Route>
        <Route path='/view-booking-history/:id' element={<Booking />}></Route> 
        {/* <Route path='/admin/total-users/*' element={<TotalUser />}></Route> */}
        {/* <Route path='/admin/*' element={<AdminPage />}></Route> */}
        <Route path='/admin/*' element={<Sidenav />}></Route>

        {/* <Route path='/admin/report-project/:productID' element={<CardReport />}></Route> */}
        <Route path='/admin/report-project/:reportID' element={<SidenavReport/>}></Route>



    
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;