import Navbar from '@/components/Navbar'
import React from 'react'
import {ToastContainer} from "react-toastify"
import 'react-toastify/ReactToastify.css'

const MainLayout = ({children}) => {
  return (
    <>
    <ToastContainer position='bottom-right'/>

    <Navbar />
    {children}
    
    </>
  )
}

export default MainLayout