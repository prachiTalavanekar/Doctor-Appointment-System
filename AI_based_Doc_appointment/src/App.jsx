import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './components/Chatbot'
import Notification from './components/Notification'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UserDashboard from './pages/UserDashboard'
import Call from './pages/Call'
import VoiceTest from './components/VoiceTest'
import MarathiVoiceTest from './components/MarathiVoiceTest'
import ChatbotVoiceTest from './components/ChatbotVoiceTest'

const App = () => {
  return (
    <div className='mx-1 sm:mx-[3%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/call/:appointmentId' element={<Call />} />
        <Route path='/voice-test' element={<VoiceTest />} />
        <Route path='/marathi-voice-test' element={<MarathiVoiceTest />} />
        <Route path='/chatbot-voice-test' element={<ChatbotVoiceTest />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App