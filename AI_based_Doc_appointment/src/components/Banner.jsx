import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative bg-gradient-to-r from-[#037c6e] to-[#025d52] rounded-3xl shadow-2xl overflow-hidden mx-4 md:mx-10 my-10 p-6 md:p-8'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
        {/* Left Content */}
        <div className='flex-1 text-center lg:text-left'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
            <span className='block'>Book Appointment</span>
            <span className='block mt-2 text-[#d1f0ec]'>With Top Doctors</span>
          </h1>
          
          <p className='text-[#e0f7f5] text-lg md:text-xl mt-4 max-w-2xl'>
            Connect with verified healthcare professionals across various specialties. 
            Quick, convenient, and reliable medical consultations at your fingertips.
          </p>
          
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <button 
              onClick={() => navigate('/login')} 
              className='bg-white text-[#037c6e] font-bold px-8 py-4 rounded-full text-lg hover:bg-[#f0f9f8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            >
              Get Started
            </button>
            
            <button 
              onClick={() => navigate('/doctors')} 
              className='border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white hover:text-[#037c6e] transition-all duration-300'
            >
              Meet Doctors
            </button>
          </div>
        </div>
        
        {/* Right Image */}
        <div className='flex-1 flex justify-center'>
          <div className='relative w-full max-w-md'>
            <div className='absolute -top-6 -right-6 w-32 h-32 bg-[#d1f0ec] rounded-full opacity-20 animate-pulse'></div>
            <div className='absolute -bottom-6 -left-6 w-40 h-40 bg-[#d1f0ec] rounded-full opacity-20 animate-pulse'></div>
            
            <div className='relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-30'>
              <img 
                className='w-full h-auto object-contain rounded-xl' 
                src={assets.appointment_img} 
                alt="Medical Appointment" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className='absolute top-4 right-4 w-16 h-16 rounded-full bg-white bg-opacity-10'></div>
      <div className='absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white bg-opacity-10'></div>
    </div>
  )
}

//idea by pranav tamhanekar
export default Banner