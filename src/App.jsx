import { useEffect, useState } from 'react'
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
import ViewSummary from './components/OwnerRole/ViewSummary/ViewSummary.jsx'
import './components/OwnerRole/ViewSummary/ViewSummary.css'
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
import CreateBooking from './components/OwnerRole/CreateBooking/CreateBooking.jsx'
import './components/OwnerRole/CreateBooking/CreateBooking.css'
import BookingStage from './components/OwnerRole/BookingStage/BookingStage.jsx'
import './components/OwnerRole/BookingStage/BookingStage.css'
import UpdateProduct from './components/OwnerRole/UpdateProduct/UpdateProduct.jsx'
import './components/OwnerRole/UpdateProduct/UpdateProduct.css'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import './components/Sidebar/Sidebar.css'
// import Sidenav from './components/Admin/Admin.jsx'
import TotalUser from './components/AdminPage/TotalUser/TotalUser.jsx'
// import  './components/AdminPage/TotalUser/TotalUser.css'
import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'
import ViewReport from './components/AdminPage/ViewReport/ViewReport.jsx'
import Sidenav from './components/AdminPage/Sidenav/Sidenav.jsx';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SidenavReport from './components/SidenavReport.jsx'
import SidenavReportV2 from './components/SidenavReportV2.jsx'
import { UserContext } from './components/UserContext.jsx'
import { useContext } from "react"
// import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'
import Profile from './components/Profile/Profile.jsx'
import UpdateProfile from './components/Profile/UpdateProfile.jsx'
import './components/Profile/Profile.css'
import Payment from './components/Payment/Payment.jsx'
import './components/Payment/Payment.css'
import ViewBookingConfirm from './components/AdminPage/VIewConfirmBooking/ViewBookingConfirm.jsx'
import StaffView from './components/StaffPage/StaffView.jsx'
import BookingDetail from './components/AdminPage/BookingDetail/BookingDetail.jsx'
import RespondPayment from './components/AdminPage/ViewCustomerPayment/RespondPayment.jsx'
import SideNavPayment from './components/AdminPage/ViewCustomerPayment/SideNavPayment.jsx'
import SideNavPayment80 from './components/AdminPage/ViewCustomerPayment80/SideNavPayment80.jsx'

import SideNavBook from './components/AdminPage/BookingDetail/SideNavBook.jsx'
import CreatePayment from './components/Register/CreatePayment.jsx'
import RegisterStaff from './components/StaffPage/RegisterStaff.jsx'
import StaffNavbar from './components/StaffPage/StaffNavbar.jsx'
import TotalStaff from './components/AdminPage/TotalStaff/TotalStaff.jsx'
import TotalStaffAdmin from './components/StaffPage/TotalStaffAdmin.jsx'
import ViewAllNew from './components/News/ViewNews/ViewAllNew.jsx'

// import SideNavPayment from '../AdminPage/RespondPayment/SideNavPayment.jsx'
function App() {

  const { user, loginContext } = useContext(UserContext);
  // console.log(user.id);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("id"), localStorage.getItem("role"), localStorage.getItem("token"));
    }
  }, [])

  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail');
  const isLoginPage = location.pathname.includes('/login');
  const isRegisterPage = location.pathname.includes('/register');
  const isContactPage = location.pathname.includes('/contact-info');
  const isCreateTimeshare = location.pathname.includes('/create-timeshare');
  const isViewSummary = location.pathname.includes('/view-summary');
  const isViewDetail = location.pathname.includes('/view-project-detail');
  const isAdminPage = location.pathname.includes('/admin');
  const isStaffPage = location.pathname.includes('/staff');

  const isTotalUser = location.pathname.includes('/admin/total-users');
  const isViewNews = location.pathname.includes('/view-news');
  const isViewNewAll = location.pathname.includes('/new');
  const isCreateNews = location.pathname.includes('/create-news');
  const isAccommodation = location.pathname.includes('/accommodation');
  const isBooking = location.pathname.includes('/view-booking-history');
  const isOwnerPage = location.pathname.includes('/owner-page');
  const isCreateBooking = location.pathname.includes('/create-booking');
  const isBookingStage = location.pathname.includes('/booking-stage');
  const isProfile = location.pathname.includes('/profile');
  const isUpdateProfile = location.pathname.includes('/update-profile/:accID');

  const isPayment = location.pathname.includes('/payment');
  const isUpdateProduct = location.pathname.includes('/update-product');
  const isSidebar = location.pathname.includes('/profile') || location.pathname.includes('/view-booking-history');

  const navigate = useNavigate();

  return (
    <>
      {!isAdminPage && !isStaffPage && (
        <>
          <Navigation />
          <Navbar getData={user.id} />
        </>
      )}

      {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isAdminPage && !isStaffPage && !isCreateTimeshare && !isViewSummary && !isViewDetail && !isTotalUser &&
        !isViewNews && !isViewNewAll && !isCreateNews && !isAccommodation && !isBooking && !isCreateBooking && !isBookingStage && !isProfile && !isPayment && !isUpdateProduct && !isSidebar && <Header />}

      {isSidebar && (
        <Sidebar>
          <Routes>
            <Route path='/profile' element={<Profile getData={user.id} />}></Route>
            <Route path='/view-booking-history' element={<Booking />}></Route>
            <Route path='/update-profile/:accID' element={<UpdateProfile />}></Route>
          </Routes>
        </Sidebar>
      )}

      <Routes>
        <Route path='/' element={<Project />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route>
        <Route path='/owner-page' element={<OwnerPage />}></Route>
        <Route path='/create-timeshare' element={<CreateTimeshare getData={user.id} />}></Route>
        <Route path='/view-summary' element={<ViewSummary />}></Route>
        <Route path='/view-project-detail/:id' element={<ViewDetail />}></Route>
        <Route path='/contact-info' element={<Contact />}></Route>
        <Route path='/admin/*' element={<AdminPage />}></Route>
        <Route path='/view-news/:id' element={<ViewNews />}></Route>
        <Route path='/create-news' element={<CreateNews />}></Route>
        <Route path='/accommodation' element={<Accommodation />}></Route>
        {/* <Route path='/view-booking-history' element={<Booking />}></Route> */}
        <Route path='/create-booking' element={<CreateBooking />}></Route>
        <Route path='/booking-stage' element={<BookingStage />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/create-payment' element={<CreatePayment />}></Route>
        <Route path='/update-product' element={<UpdateProduct />}></Route>

        {/* <Route path='/admin/total-users/*' element={<TotalUser />}></Route> */}
        {/* <Route path='/admin/*' element={<AdminPage />}></Route> */}
        <Route path='/admin/*' element={<Sidenav />}></Route>
        <Route path='/staff/*' element={<StaffView />}></Route>

        {/* <Route path='/profile' element={<Profile getData={user.id} />}></Route> */}
        {/* <Route path='/profile' element={<Profile getData={user.id} />}></Route>
        <Route path='/update-profile/:accID' element={<UpdateProfile/>}></Route> */}
        <Route path='/new' element={<ViewAllNew />}></Route>



        {/* <Route path='/admin/report-project/:productID' element={<CardReport />}></Route> */}
        <Route path='/admin/report-project/:reportID' element={<SidenavReport />}></Route>
        <Route path='/admin/report-projectid/:productID/:accID' element={<SidenavReportV2 />}></Route>
        <Route path='/admin/wait-to-confirm-list/detail/:bookingID/:productID/:accID' element={<SideNavBook />}></Route>
        <Route path='/admin/wait-customer-to-confirm-payment-list/100/detail/:bookingID/:productID/:accID' element={<SideNavPayment />}></Route>
        <Route path='/admin/wait-customer-to-confirm-payment-list/80/detail/:bookingID/:productID/:accID' element={<SideNavPayment80 />}></Route>


        <Route path='/staff' element={<StaffView />} />
        <Route path="/staff/register" element={<RegisterStaff />} />
        <Route path="/staff/view-account-staff" element={<TotalStaffAdmin />} />




      </Routes>
      {!isAdminPage && !isStaffPage && <Footer />}
    </>
  );
}

export default App;