import React, { useEffect, useState } from 'react'
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
import AccommodationDetail from './components/Accommodation/AccommodationDetail.jsx'
// import Sidenav from './components/Admin/Admin.jsx'
import TotalUser from './components/AdminPage/TotalUser/TotalUser.jsx'
// import  './components/AdminPage/TotalUser/TotalUser.css'
import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'
import ViewReport from './components/AdminPage/ViewReport/ViewReport.jsx'
import Sidenav from './components/AdminPage/Sidenav/Sidenav.jsx';
import Homestay from './components/Accommodation/Homestay.jsx';
import ConfirmRegister from './components/Register/ConfirmRegister.jsx';
import Wallet from './components/Wallet&Reward/Wallet.jsx'
import './components/Register/ConfirmRegister.css';
import SuccessPayment from './components/Payment/SuccessPayment.jsx'
import CustomerBookingDetail from './components/Booking/CustomerBookingDetail.jsx'
import TotalRevenueHomestay from './components/TotalRevenueHomestay/TotalRevenueHomestay.jsx'

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SidenavReport from './components/SidenavReport.jsx'

import { UserContext } from './components/UserContext.jsx'
import { useContext } from "react"
// import CardReport from './components/AdminPage/ViewReport/CardReport.jsx'
import Profile from './components/Profile/Profile.jsx'
import UpdateProfile from './components/Profile/UpdateProfile.jsx'
import './components/Profile/Profile.css'
import Payment from './components/Payment/Payment.jsx'
import './components/Payment/Payment.css'
import ViewBookingConfirm from './components/AdminPage/VIewConfirmBooking/ViewBookingConfirm.jsx'
import AdminView from './components/StaffPage/AdminView.jsx'
import BookingDetail from './components/AdminPage/BookingDetail/BookingDetail.jsx'
import RespondPayment from './components/AdminPage/ViewCustomerPayment/RespondPayment.jsx'
import CreatePayment from './components/Register/CreatePayment.jsx'
import RegisterStaff from './components/StaffPage/RegisterStaff.jsx'
import StaffNavbar from './components/StaffPage/StaffNavbar.jsx'
import TotalStaff from './components/AdminPage/TotalStaff/TotalStaff.jsx'
import TotalStaffAdmin from './components/StaffPage/TotalStaffAdmin.jsx'
import ViewAllNew from './components/News/ViewNews/ViewAllNew.jsx'
import ViewNewStaff from './components/AdminPage/New/ViewNewStaff.jsx'
import ProfileStaff from './components/AdminPage/ProfileStaff/ProfileStaff.jsx'
import UpdateProfileStaff from './components/AdminPage/ProfileStaff/UpdateProfileStaff.jsx'
import RespondBookingRC from './components/AdminPage/ViewBookingRC/RespondBookingRC.jsx'
import Dashboard from './components/AdminPage/Dashboard/Dashboard.jsx'
import TotalProduct from './components/AdminPage/TotalProject/TotalProduct.jsx'
import CardReportV2 from './components/AdminPage/ViewReport/CardReportV2.jsx'
import TotalProductPending from './components/AdminPage/TotalProjectPending/TotalProductPending.jsx'
import RejectedProduct from './components/AdminPage/RejectedProject/RejectedPrj.jsx'
import TotalViewActiveBooking from './components/AdminPage/TotalViewActiveBooking/TotalViewActiveBooking.jsx';
import ViewBookingRC from './components/AdminPage/ViewBookingRC/ViewBookingRC.jsx'
import ViewCustomerPayment from './components/AdminPage/ViewCustomerPayment/ViewCustomerPayment.jsx'
import ViewCustomerPayment_80 from './components/AdminPage/ViewCustomerPayment80/ViewCustomerPayment80.jsx'
import RespondPayment80 from './components/AdminPage/ViewCustomerPayment80/RespondPayment80.jsx'
import New from './components/AdminPage/New/New.jsx'
import AllNew from './components/AdminPage/New/AllNew.jsx'
import ClosedProduct from './components/AdminPage/TotalProductClose/ClosedProduct.jsx'
import DetailComponent from './components/Detail/DetailComponent.jsx'
import ProductPendingDetail from './components/AdminPage/TotalProjectPending/ProductPendingDetail.jsx'
import RejectedProductDetail from './components/AdminPage/RejectedProject/RejectedProductDetail.jsx'
import ClosedProductDetail from './components/AdminPage/TotalProductClose/ClosedProductDetail.jsx'
import AllBooking from './components/AllBooking.jsx'
function App() {

  const { user, loginContext } = useContext(UserContext);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     loginContext(localStorage.getItem("id"), localStorage.getItem("role"), localStorage.getItem("token"));
  //   }
  // }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      loginContext(sessionStorage.getItem("id"), sessionStorage.getItem("role"), sessionStorage.getItem("token"));
    }
  }, []);

  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail');
  const isLoginPage = location.pathname.includes('/login');
  const isRegisterPage = location.pathname.includes('/register');
  const isContactPage = location.pathname.includes('/contact-info');
  const isCreateTimeshare = location.pathname.includes('/create-homestay');
  const isViewSummary = location.pathname.includes('/view-summary');
  const isViewDetail = location.pathname.includes('/view-project-detail');
  const isStaffPage = location.pathname.includes('/staff');
  const isAdminPage = location.pathname.includes('/admin');

  // const isStaffPage = location.pathname.includes('/staff');

  // const isTotalUser = location.pathname.includes('/admin/total-users');
  const isViewNews = location.pathname.includes('/view-news');
  const isViewNewAll = location.pathname.includes('/new');
  const isCreateNews = location.pathname.includes('/create-news');
  const isAccommodation = location.pathname.includes('/accommodation');
  const isBooking = location.pathname.includes('/view-booking-history');
  const isOwnerPage = location.pathname.includes('/owner-page');
  const isCreateBooking = location.pathname.includes('/create-booking');
  const isBookingStage = location.pathname.includes('/booking-stage');
  const isProfile = location.pathname.includes('/profile');
  const isUpdateProfile = location.pathname.includes('/update-profile');
  const isUpdateProfileStaff = location.pathname.includes('/update-profile-staff/:accID');
  const isAccommodationDetail = location.pathname.includes('/accommodation-detail');
  const isHomestay = location.pathname.includes('/homestay');
  const isConfirmRegister = location.pathname.includes('/confirm-register');
  const isWallet = location.pathname.includes('/wallet-and-reward');
  const isSuccessPayment = location.pathname.includes('/confirm-success-payment');
  const isBookingDetail = location.pathname.includes('/booking-details');
  const isTotalRevenueHomestay = location.pathname.includes('/my-homestay');


  const isPayment = location.pathname.includes('/payment');
  const isUpdateProduct = location.pathname.includes('/update-product');
  const isSidebar = location.pathname.includes('/profile') || location.pathname.includes('/view-booking-history') 
  || location.pathname.includes('/update-profile') || location.pathname.includes('/wallet-and-reward') || location.pathname.includes('/my-homestay');

  const navigate = useNavigate();

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {!isStaffPage && !isAdminPage && !isUpdateProfileStaff && (
          <>
            <Navigation />
            <Navbar getData={user.id} />
          </>
        )}

        {!isDetailPage && !isLoginPage && !isRegisterPage && !isContactPage && !isStaffPage && !isAdminPage && !isUpdateProfileStaff
          && !isCreateTimeshare && !isViewSummary && !isViewDetail && !isViewNews && !isViewNewAll && !isCreateNews && !isAccommodation
          && !isBooking && !isCreateBooking && !isBookingStage && !isProfile && !isPayment && !isUpdateProduct && !isSidebar
          && !isAccommodationDetail && !isUpdateProfile && !isHomestay && !isConfirmRegister && !isWallet && !isSuccessPayment  && !isBookingDetail 
          && !isTotalRevenueHomestay && <Header />}

        {isSidebar && (
          <Sidebar>
            <Routes>
              <Route path='/profile' element={<Profile getData={user.id} />}></Route>
              <Route path='/view-booking-history' element={<Booking/>}></Route>
              <Route path='/update-profile' element={<UpdateProfile getData={user.id} />}></Route>
              <Route path='/wallet-and-reward' element={<Wallet />}></Route>
              <Route path='/my-homestay' element={<TotalRevenueHomestay />}></Route>
            </Routes>
          </Sidebar>
        
        )}

        <Routes>
          <Route path='/' element={<Project />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path="/detail/:id" component={<DetailComponent/>} />
          <Route path='/create-booking' element={<CreateBooking />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/contact-info' element={<Contact />}></Route>
          <Route path='/owner-page' element={<OwnerPage />}></Route>
          <Route path='/create-homestay' element={<CreateTimeshare getData={user.id} />}></Route>
          <Route path='/view-summary' element={<ViewSummary />}></Route>
          <Route path='/view-project-detail/:id' element={<ViewDetail />}></Route>
          <Route path='/contact-info' element={<Contact />}></Route>
          {/* <Route path='/admin/*' element={<AdminPage />}></Route> */}
          <Route path='/create-news' element={<CreateNews />}></Route>
          <Route path='/accommodation' element={<Accommodation />}></Route>
          {/* <Route path='/view-booking-history' element={<Booking />}></Route> */}
          <Route path='/booking-stage' element={<BookingStage />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/create-payment' element={<CreatePayment />}></Route>
          <Route path='/update-product' element={<UpdateProduct />}></Route>
          <Route path='/accommodation-detail/:projectID' element={<AccommodationDetail />}></Route>
          <Route path='/homestay' element={<Homestay />}></Route>
          <Route path='/confirm-register' element={<ConfirmRegister />}></Route>
          <Route path='/confirm-success-payment/:bookingID' element={<SuccessPayment />}></Route>
          <Route path='/booking-details' element={<CustomerBookingDetail />}></Route>
          {/* <Route path='/admin/total-users/*' element={<TotalUser />}></Route> */}
          {/* <Route path='/admin/*' element={<AdminPage />}></Route> */}
          {/* <Route path='/admin/*' element={<Sidenav />}></Route> */}
          {/* <Route path='/staff/*' element={<StaffView />}></Route> */}

          {/* <Route path='/profile' element={<Profile getData={user.id} />}></Route> */}
          {/* <Route path='/profile' element={<Profile getData={user.id} />}></Route>
        <Route path='/update-profile/:accID' element={<UpdateProfile/>}></Route> */}
          <Route path='/new' element={<ViewAllNew />}></Route>
          <Route path='/view-news/:id' element={<ViewNews />}></Route>

        </Routes>
        {!isStaffPage && !isAdminPage && !isUpdateProfileStaff && <Footer />}

        {/* ================================================================================================================================================================= */}
        {/* STAFF */}
        {isStaffPage && (
          <Sidenav />
        )}

        <Routes>
          <Route path='/staff/*' element={<Dashboard />}></Route>
          <Route path='/staff/total-product' element={<TotalProduct />}></Route>
          <Route path='/staff/report-projectid/:productID/:accID' element={<CardReportV2 />}></Route>
          <Route path='/staff/total-users' element={<TotalUser />}></Route>
          <Route path='/staff/pending-product' element={<TotalProductPending />}></Route>
          <Route path='/staff/pending/:productID/:accID' element={<ProductPendingDetail />}></Route>
          <Route path='/staff/rejected-product' element={<RejectedProduct />}></Route>
          <Route path='/staff/rejected/:productID/:accID' element={<RejectedProductDetail />}></Route>
          <Route path='/staff/closed-product' element={<ClosedProduct />}></Route>
          <Route path='/staff/closed/:productID/:accID' element={<ClosedProductDetail />}></Route>
          <Route path='/staff/total-staff' element={<TotalStaff />}></Route>
          <Route path='/staff/active-list' element={<TotalViewActiveBooking />}></Route>
          <Route path='/staff/wait-to-confirm-list' element={<ViewBookingConfirm />}></Route>
          <Route path='/staff/wait-to-confirm-list/detail/:bookingID/:productID/:accID' element={<BookingDetail />}></Route>
          <Route path='/staff/wait-to-confirm-rc' element={<ViewBookingRC />}></Route>
          <Route path='/staff/wait-to-confirm-rc/detail/:bookingID/:productID/:accID' element={<RespondBookingRC />}></Route>
          <Route path='/staff/wait-customer-to-confirm-payment-list/100' element={<ViewCustomerPayment />}></Route>
          <Route path='/staff/wait-customer-to-confirm-payment-list/100/detail/:bookingID/:productID/:accID' element={<RespondPayment />}></Route>
          <Route path='/staff/wait-customer-to-confirm-payment-list/80' element={<ViewCustomerPayment_80 />}></Route>
          <Route path='/staff/wait-customer-to-confirm-payment-list/80/detail/:bookingID/:productID/:accID' element={<RespondPayment80 />}></Route>
          <Route path='/staff/new' element={<New getData={user.id} />}></Route>
          <Route path='/staff/all-new' element={<AllNew />}></Route>
          <Route path='/staff/view-news-staff/:newsId' element={<ViewNewStaff />}></Route>
          <Route path="/staff-profile" element={<ProfileStaff getData={user.id} />} />
          <Route path='/staff/update-profile/:accID' element={<UpdateProfileStaff />} />

          <Route path='/staff/all-booking' element={<AllBooking />} />

        </Routes>

        {/* ================================================================================================================================================================= */}
        {/* ADMIN */}

        {isAdminPage && (
          <StaffNavbar />
        )}

        <Routes>
          <Route path='/admin/*' element={<AdminView />}></Route>
          <Route path="/admin/register" element={<RegisterStaff />}></Route>
          <Route path="/admin/view-account-staff" element={<TotalStaffAdmin />}></Route>
        </Routes>
      </div>




    </>
  );
}

export default App;