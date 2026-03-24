// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import {AppContext} from '../context/AppContext'
// import { assets } from '../assets/assets'
// import BookingTime from '../components/BookingTime'
// import RelatedDoctors from '../components/RelatedDoctors'

// const Appointment = () => {

//   const {docId} = useParams()
//   const {doctors,currencySymbol} = useContext(AppContext)
//   const [docInfo, setDocInfo] = useState(null)

//   const fetchDocInfo = async () =>{
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)
//     console.log(docInfo)
//   }

//   useEffect(()=>{
//     fetchDocInfo()
//   },[doctors,docId])

//   return docInfo && (
//     <div>
//     {/* ---------- Doctor details ---------- */}
//     <div className='flex flex-col sm:flex-row gap-4'>
//       <div>
//         <img className='bg-[#7dd1b3] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//       </div>

//       <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//         {/* ----------- Doctor info : name,degree,experience ----------- */}
//          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
//           <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           {/* ----Doctor About -------- */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//       </div>
//     </div>
//     <BookingTime docInfo={docInfo} />
//     {/* listing related doctors */}
//     <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//     </div>
//   )
// }

// export default Appointment

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import BookingTime from '../components/BookingTime'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol , backendUrl,token,getDoctorData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const navigate = useNavigate()
   const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }

const bookAppointment = async () => {
  if (!token) {
    toast.warn('Login to book appointment')
    return navigate('/login')
  }

  if (!slotTime) {
    toast.warn('Please select a time slot')
    return
  }

  try {
    const res = await fetch(`${backendUrl}/api/user/book-appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // userId: JSON.parse(localStorage.getItem('user'))._id,
        docId: docInfo._id,
        slotDate: docSlots[slotIndex][0].datetime.toDateString(),
        slotTime: slotTime,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message || 'Appointment booked successfully!');
      navigate('/my-appointments'); // Or wherever you want to go after booking
    } else {
      toast.error(data.message || 'Failed to book appointment.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong.');
  }
};



  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  return docInfo && (
    <div className="px-4 sm:px-6 lg:px-16 py-10 ">
      {/* ---------- Doctor details ---------- */}
      <div className='flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md p-6 sm:p-8 mb-10'>
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            className='bg-[#e3fcf3] w-55 h-55 sm:max-w-60 rounded-xl object-contain border border-teal-300 p-2'
            src={docInfo.image}
            alt=""
          />
        </div>

        {/* Doctor Info */}
        <div className='flex-1'>
          <p className='flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-900 mb-2'>
            {docInfo.name}
            <img className='w-5 sm:w-6' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm sm:text-base text-gray-600 mb-4'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-1 px-3 border border-teal-600 text-xs rounded-full bg-teal-50 text-teal-700'>
              {docInfo.experience}
            </button>
          </div>

          {/* Doctor About */}
          <div className='mb-4'>
            <p className='flex items-center gap-2 text-sm font-medium text-gray-800'>
              About
              <img src={assets.info_icon} alt="" className='w-4' />
            </p>
            <p className='text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed'>
              {docInfo.about}
            </p>
          </div>

          {/* Appointment Fee */}
          <p className='text-sm font-medium text-gray-700 mt-4'>
            Appointment Fee:{' '}
            <span className='text-gray-900 font-semibold'>
              {currencySymbol}{docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Time */}
   <BookingTime
  docInfo={docInfo}
  bookAppointment={bookAppointment}
  slotTime={slotTime}
  setSlotTime={setSlotTime}
  slotIndex={slotIndex}
  setSlotIndex={setSlotIndex}
  docSlots={docSlots}
  setDocSlots={setDocSlots}
/>



      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
