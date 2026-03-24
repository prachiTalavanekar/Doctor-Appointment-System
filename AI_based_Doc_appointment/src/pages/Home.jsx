import React from 'react'
import Header from '../components/Header'
// import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import ChatbotIcon from '../components/ChatbotIcon.jsx'
import OurServices from '../components/OurServices.jsx'
import FAQ from '../components/FAQ.jsx'
import Notification from '../components/Notification'

const Home = () => {
  return (
    <div>
      <ChatbotIcon />
      <Header />
      <OurServices />
    {/* <SpecialityMenu /> */}
    <TopDoctors />
    <Banner />
    <FAQ />
    <div className="max-w-5xl mx-auto px-4 mt-8">
      <Notification />
    </div>
    </div>
  )
}

export default Home