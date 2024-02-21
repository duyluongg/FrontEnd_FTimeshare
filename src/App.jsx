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
  const isCreateTimeshare = location.pathname.includes('/api/create-timeshare');
  const isViewProject = location.pathname.includes('/view-projects');
  const isViewDetail = location.pathname.includes('/view-project-detail');

  const isAdminPage = location.pathname.includes('/admin');
  

  return (
    <>
      {!isAdminPage  && (
        <>
          <Navigation />
          <Navbar />
        </>
      )}

    


      {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && !isCreateTimeshare && !isViewProject && !isViewDetail  && <Header />}
      {/* {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && !isCreateTimeshare && !isViewProject && !isViewDetail  && <Header />} */}
      {/* <Header /> */}

      {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && !isCreateTimeshare && !isViewProject && !isViewDetail && isTotalUser && <Header />}
      <Routes>
        <Route path='/' element={<Project />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route> 
        <Route path='/owner-page' element={<OwnerPage />}></Route>
        <Route path='/api/create-timeshare' element={<CreateTimeshare />}></Route>
        <Route path='/view-projects' element={<ViewProject />}></Route>
        <Route path='/view-project-detail/:id' element={<ViewDetail />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route>
        <Route path='/admin/*' element={<AdminPage />}></Route>
        {/* <Route path='/admin/total-users/*' element={<TotalUser />}></Route> */}

    
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;