import React from 'react'
import { FaCalendarCheck, FaRobot, FaBell } from 'react-icons/fa' // FontAwesome icons

const services = [
  {
    title: 'Easy Doctor Appointment',
    description: 'Book appointments with trusted doctors in just a few clicks. Simple, quick, and reliable scheduling system.',
    icon: <FaCalendarCheck className='text-3xl text-[#037c6e]' />
  },
  {
    title: 'AI Medical Assistant',
    description: 'Get instant answers to health queries using our AI-powered assistant, available 24/7 to guide you.',
    icon: <FaRobot className='text-3xl text-[#037c6e]' />
  },
  {
    title: 'Notification Facility',
    description: 'Receive timely reminders for appointments, reports, and health tips. Stay on track, effortlessly.',
    icon: <FaBell className='text-3xl text-[#037c6e]' />
  },
]

const OurServices = () => {
  return (
    <div id='services' className='flex flex-col items-center gap-6 py-16 text-gray-800 bg-white'>
      <h1 className='text-3xl font-semibold'>
        Our <span className='text-[#037c6e]'>Services</span>
      </h1>
      <p className='sm:w-1/2 text-center text-sm text-gray-600'>
        Explore the smart features we provide to make your healthcare experience seamless and effective.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 px-4 w-full max-w-6xl'>
        {services.map((service, index) => (
          <div
            key={index}
            className='bg-[#e3fcf3] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center hover:-translate-y-1 transition-transform'
          >
            <div className='mb-4'>
              {service.icon}
            </div>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>{service.title}</h2>
            <p className='text-sm text-gray-600'>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurServices
