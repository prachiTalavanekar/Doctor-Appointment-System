// import React, { useContext } from 'react'
// import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/ReactToastify.css'
// import { AdminContext } from './context/AdminContext';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Admin/Dashboard';
// import AllApointments from './pages/Admin/AllApointments';
// import AddDoctor from './pages/Admin/AddDoctor';
// import DoctorsList from './pages/Admin/DoctorsList';
// import AllUsers from './pages/Admin/AllUsers';
// import SendNotification from './pages/Admin/SendNotification';
// import { DoctorContext } from './context/DoctorContext';
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
// import DoctorAppointments from './pages/Doctor/DoctorAppointments';
// import DoctorProfile from './pages/Doctor/DoctorProfile';


// const App = () => {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext)

//   return aToken || dToken ? (
//     <div className=''>
//       <ToastContainer />
//       <Navbar />
//       <div className='flex items-start'>
//         <Sidebar />
//         <Routes>
//           {/* admin routes */}
//           <Route path='/' element={<></>} />
//           <Route path='/admin-dashboard' element={<Dashboard />} />
//           <Route path='/all-apointments' element={<AllApointments />} />
//           <Route path='/add-doctor' element={<AddDoctor />} />
//           <Route path='/doctor-list' element={<DoctorsList />} />
//           <Route path='/all-users' element={<AllUsers />} />
//           <Route path='/notify' element={<SendNotification />} />

//         {/* doctors routes */}
//       <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
//        <Route path='/doctor-appointments' element={<DoctorAppointments />} />
//         <Route path='/doctor-profile' element={<DoctorProfile />} />

//         </Routes>
//       </div>
//     </div>
//   ) : (
//     <>
//       <Login />
//       <ToastContainer />
//     </>
//   );
// };

// export default App

// // #a3eed2ff





import React, { useContext, useState } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import AllUsers from './pages/Admin/AllUsers'
import SendNotification from './pages/Admin/SendNotification'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import DoctorNotifications from './pages/Doctor/DoctorNotifications'
import DoctorCall from './pages/Doctor/DoctorCall'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Admin Dashboard
  if (aToken) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <ToastContainer />
        <div className="fixed top-0 left-0 right-0 z-20 bg-white">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
        <div className="flex flex-1 pt-16 overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="fixed left-0 top-16 bottom-0 z-10 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-30 md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
              <div className="absolute left-0 top-16 bottom-0 w-72 bg-white">
                <Sidebar />
              </div>
            </div>
          )}
          
          <div className="flex-1 md:ml-72 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-apointments" element={<AllApointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/notify" element={<SendNotification />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  // Doctor Dashboard
  if (dToken) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <ToastContainer />
        <div className="fixed top-0 left-0 right-0 z-20 bg-white">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
        <div className="flex flex-1 pt-16 overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="fixed left-0 top-16 bottom-0 z-10 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-30 md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
              <div className="absolute left-0 top-16 bottom-0 w-72 bg-white">
                <Sidebar />
              </div>
            </div>
          )}
          
          <div className="flex-1 md:ml-72 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DoctorDashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-call/:appointmentId" element={<DoctorCall />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="/doctor-notifications" element={<DoctorNotifications />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  // Login Page (default if no token)
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
