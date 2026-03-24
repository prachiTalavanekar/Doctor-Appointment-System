import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

import React from 'react'
export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
  const [userData, setUserData] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);




  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        // Some logic here
        setDoctors(data.doctors)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      // Error handling
      console.log(error)
      toast.error(error.message)

    }
  }


  const loadUserProfileData = async () => {
    try {
      // missing code here
      const { data } = await axios.get(backendUrl + '/api/user/get-profile',
         { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setUserData(data.userData);
        toast.success(data.message)

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const refreshUnreadCount = async () => {
    try {
      if (!token) { setUnreadCount(0); return }
      const { data } = await axios.get(backendUrl + '/api/user/notification/inbox',
        { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        const count = (data.notifications || []).filter(n => !n.isRead).length
        setUnreadCount(count)
      }
    } catch (e) {
      // silent
    }
  }



  const value = {
    doctors, currencySymbol, getDoctorsData,
    token, setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData,
    unreadCount,
    refreshUnreadCount
  }


  useEffect(() => {
    getDoctorsData()
  }, [])


  useEffect(() => {
  if (token) {
    loadUserProfileData();
    refreshUnreadCount();
  } else {
    setUserData(false);
    setUnreadCount(0)
  }
}, [token]);

  useEffect(() => {
    if (!token) return
    const id = setInterval(() => { refreshUnreadCount() }, 30000)
    const handler = () => refreshUnreadCount()
    window.addEventListener('refresh-unread', handler)
    return () => clearInterval(id)
  }, [token])


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider