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
import {  Routes, Route } from 'react-router-dom'
import  Detail  from './components/Detail/Detail.jsx'
import './components/Detail/Detail.css'







function App() {

  return (
    <>
      <Navigation />
      <Navbar />
      <Header />
      <Routes>
        <Route path='/' element={<Project />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
