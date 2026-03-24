// import React, { useEffect, useState } from 'react'


// const BookingTime = ({docInfo,
//   bookAppointment,
//   slotTime,
//   setSlotTime,
//   slotIndex,
//   setSlotIndex,
//   docSlots,
//   setDocSlots,}) => {
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']



//   const getAvailableSlots = async () => {
//     setDocSlots([])

//     // getting current date
//     let today = new Date()
//     for (let i = 0; i < 7; i++) {
//       // getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)
//       // setting end time of the date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       // setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }
//       let timeSlots = []

//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         //add slot to array
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         //increament current time by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setDocSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots);
//   }, [docSlots])

//   return (
//     // booking slots
//     <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-4'>
//       <p>Booking slots</p>
//       <div className='flex gap-3 intems-center w-full overflow-x-scroll mt-4'>
//         {
//           docSlots.length && docSlots.map((item, index) => {
//             return <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#7dd1b3] text-gray-800' : 'border border-gray-200 text-gray-500'}`} key={index}>
//               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p>{item[0] && item[0].datetime.getDate()}</p>
//             </div>
//           })
//         }
//       </div>
//       <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//         {docSlots.length && docSlots[slotIndex].map((item,index)=>{
//           return  <p  onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-2 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#7dd1b3] text-gray-800' : 'text-gray-400 border border-gray-300'} `} key={index}>
//             {item.time.toLowerCase()}
//           </p>
//         })}
//       </div>
//       <button onClick={bookAppointment} className='bg-[#7dd1b3] text-gray-900 text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//     </div>
//   )
// }





// export default BookingTime









// import React, { useEffect } from 'react'

// const BookingTime = ({
//   docInfo,
//   bookAppointment,
//   slotTime,
//   setSlotTime,
//   slotIndex,
//   setSlotIndex,
//   docSlots,
//   setDocSlots,
// }) => {
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const getAvailableSlots = async () => {
//     setDocSlots([])

//     let today = new Date()
//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         let day = currentDate.getDate()
//         let month = currentDate.getMonth() + 1
//         let year = currentDate.getFullYear()

//         const slotDate = day + "-" + month + "-" + year
//         const slotTime = formattedTime

//         const isSlotAvailable =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

//         if (isSlotAvailable) {
//           // add slot to array
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime
//           })
//         }


//         // timeSlots.push({
//         //   datetime: new Date(currentDate),
//         //   time: formattedTime,
//         // })

//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setDocSlots(prev => [...prev, timeSlots])
//     }
//   }

//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   return (
//     <div className="w-full font-sans text-gray-700 mt-10 mb-10 p-6 bg-white rounded-lg shadow-lg">
//       <h1 className='text-3xl font-medium text-center'>
//         Choose a <span style={{ color: '#037c6e' }}>Date & Time</span>
//       </h1>

//       {/* Table-like layout */}
//       <div className="overflow-x-auto mt-6 rounded-lg border border-gray-200">
//         <table className="w-full border-collapse">
//           <thead className="bg-[#7dd1b3]/20">
//             <tr>
//               <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-[#7dd1b3]">
//                 Date
//               </th>
//               <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-[#7dd1b3]">
//                 Available Time Slots
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {docSlots.length > 0 &&
//               docSlots.map((daySlots, idx) => (
//                 <tr
//                   key={idx}
//                   onClick={() => setSlotIndex(idx)}
//                   className={`cursor-pointer ${slotIndex === idx ? 'bg-[#7dd1b3]/30' : 'hover:bg-[#7dd1b3]/10'
//                     } transition-colors duration-200`}
//                 >
//                   <td className="border-b border-gray-200 px-6 py-4 align-middle">
//                     <div className="flex flex-col">
//                       <span className="text-xs font-semibold text-[#7dd1b3]">
//                         {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
//                       </span>
//                       <span className="text-2xl font-extrabold text-gray-900">
//                         {daySlots[0] && daySlots[0].datetime.getDate()}
//                       </span>
//                       <span className="text-xs text-gray-400 mt-1">
//                         {daySlots[0] && daySlots[0].datetime.toLocaleDateString()}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="border-b border-gray-200 px-6 py-4">
//                     <div className="flex flex-wrap gap-3">
//                       {daySlots.map((slot, i) => (
//                         <button
//                           key={i}
//                           onClick={e => {
//                             e.stopPropagation()
//                             setSlotTime(slot.time)
//                             setSlotIndex(idx)
//                           }}
//                           className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-150 whitespace-nowrap ${slot.time === slotTime
//                               ? 'bg-[#7dd1b3] text-gray-900 border-transparent shadow-md'
//                               : 'border-gray-300 text-gray-600 hover:bg-[#7dd1b3]/20 hover:border-[#7dd1b3]'
//                             }`}
//                         >
//                           {slot.time.toLowerCase()}
//                         </button>
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-12 flex justify-center">
//         <button
//           onClick={bookAppointment}
//           disabled={!slotTime}
//           className={`rounded-full px-24 py-3 text-lg font-semibold transition-colors duration-300 ${slotTime
//               ? 'bg-[#7dd1b3] text-gray-900 hover:brightness-110 shadow-lg'
//               : 'bg-[#7dd1b3]/60 text-gray-900 cursor-not-allowed'
//             }`}
//         >
//           Book an Appointment
//         </button>
//       </div>
//     </div>
//   )
// }

// export default BookingTime



import React, { useEffect } from 'react'

const BookingTime = ({
  docInfo,
  bookAppointment,
  slotTime,
  setSlotTime,
  slotIndex,
  setSlotIndex,
  docSlots,
  setDocSlots,
}) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        const day = String(currentDate.getDate()).padStart(2, '0')
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const year = currentDate.getFullYear()

        const slotDate = `${day}-${month}-${year}`
        const currentSlotTime = formattedTime

        const isSlotBooked = docInfo?.slots_booked?.[slotDate]?.includes(currentSlotTime)
        const isSlotAvailable = !isSlotBooked

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return (
    <div className="w-full font-sans text-gray-700 mt-10 mb-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className='text-3xl font-medium text-center'>
        Choose a <span style={{ color: '#037c6e' }}>Date & Time</span>
      </h1>

      {/* Step 1: pick a date */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-[#037c6e] mb-3">Select a date</p>
        <div className="flex gap-3 items-stretch w-full overflow-x-auto">
          {docSlots.length > 0 && docSlots.map((daySlots, idx) => (
            <button
              key={idx}
              onClick={() => { setSlotIndex(idx); }}
              className={`min-w-28 px-4 py-3 rounded-xl border text-left transition ${slotIndex === idx ? 'bg-[#7dd1b3] text-gray-900 border-transparent shadow' : 'border-gray-200 text-gray-700 hover:bg-[#7dd1b3]/10'}`}
            >
              <div className="text-xs font-semibold text-[#066b5f]">
                {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
              </div>
              <div className="text-2xl font-extrabold">
                {daySlots[0] && daySlots[0].datetime.getDate()}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {daySlots[0] && daySlots[0].datetime.toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: show times only after date selection */}
      {docSlots.length > 0 && docSlots[slotIndex] && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-[#037c6e] mb-3">Available time slots</p>
          <div className="flex flex-wrap gap-3">
            {docSlots[slotIndex].map((slot, i) => (
              <button
                key={i}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap ${slot.time === slotTime ? 'bg-[#7dd1b3] text-gray-900 border-transparent shadow' : 'border-gray-300 text-gray-700 hover:bg-[#7dd1b3]/20 hover:border-[#7dd1b3]'}`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`rounded-full px-24 py-3 text-lg font-semibold transition-colors duration-300 ${slotTime ? 'bg-[#7dd1b3] text-gray-900 hover:brightness-110 shadow-lg' : 'bg-[#7dd1b3]/60 text-gray-900 cursor-not-allowed'}`}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  )
}

export default BookingTime

