// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const AllApointments = () => {
//   const { aToken, appointments, getAllAppointments } = useContext(AdminContext)

// useEffect(() => {
//   if (aToken) {
//     getAllAppointments()
//   }
// }, [aToken])

//   return (
//     <div className="w-full max-w-6xl m-5">
//   <p className="mb-3 text-lg font-medium">All Appointments</p>

//   <div className="text-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll" >

//     <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b' style={{ backgroundColor: '#037c6e' }}>
//       <p>#</p>
//       <p>Patient</p>
//       <p>Age</p>
//       <p>Date & Time</p>
//       <p>Doctor</p>
//       <p>Fees</p>
//       <p>Actions</p>
//     </div>

//     {appointments.map((item , index) => (
//     <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-500' key={index}>
// <p>{index+1}</p>
// <div>
//   <img src={item?.userData?.image} alt="" /><p>{item?.userData?.name}</p>
// </div>
//       </div>
//     ))}

//   </div>
// </div>

//   )
// }

// export default AllApointments



//----------------- working code ------------------


// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { MdCancel } from "react-icons/md";

// // Utility function to calculate age from dob
// const calculateAge = (dob) => {
//   if (!dob) return 'N/A';

//   const birthDate = new Date(dob);
//   const today = new Date();

//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();

//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   return age;
// };

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>

//       <div className="text-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">

//         {/* Table Head */}
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b' style={{ backgroundColor: '#037c6e' }}>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* Appointments List */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-cols-1 gap-3 items-center text-gray-800 py-3 px-6 border-b hover:bg-gray-50"
//           >
//             {/* Index */}
//             <p className="font-semibold">{index + 1}</p>

//             {/* Patient */}
//             <div className="flex items-center gap-2">
//               <img
//                 src={item?.userdata?.image}
//                 alt="Patient"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <p>{item?.userdata?.name || 'N/A'}</p>
//             </div>

//             {/* Age (calculated from DOB) */}
//             <p>{calculateAge(item?.userdata?.dob)}</p>

//             {/* Date & Time */}
//             <p>{item?.slotDate} @ {item?.slotTime}</p>

//             {/* Doctor */}
//             <div className="flex items-center gap-2">
//               <img
//                 src={item?.docData?.image}
//                 alt="Doctor"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <p>Dr.</p> <p>{item?.docData?.name || 'N/A'}</p>
//             </div>

//             {/* Fees */}
//             <p>${item?.docData?.fees || 0}</p>

//             {/* Status */}
//             <p>
//               {/* {item.cancelled
//                 ? <span className="text-red-500">Cancelled</span>
//                 : item.isCompleted
//                   ? <span className="text-green-600">Completed</span>
//                   : <span className="text-yellow-500">Upcoming</span>} */}
//               {
//                 item.cancelled
//                   ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 :  //  <img
//                   //   onClick={() => cancelAppointment(item._id)}
//                   //   className='w-10 cursor-pointer'
//                   //   src={assets.cancel_icon}
//                   //   alt="Cancel"
//                   // />
//                   <MdCancel  onClick={() => cancelAppointment(item._id)}
//                      className='w-5 h-5 cursor-pointer text-red-700' />
//               }

//             </p>
//           </div>
//         ))}

//         {/* No Appointments Fallback */}
//         {appointments.length === 0 && (
//           <div className="text-center text-gray-400 py-10">
//             No appointments found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;


// ----------------------------------------------




import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MdCancel } from "react-icons/md";

// Utility function to calculate age from dob
const calculateAge = (dob) => {
  if (!dob) return 'N/A';

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Filter appointments by patient or doctor name (case-insensitive)
  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? appointments.filter((item) => {
        const patient = (item?.userdata?.name || '').toLowerCase();
        const doctor = (item?.docData?.name || '').toLowerCase();
        return patient.includes(normalized) || doctor.includes(normalized);
      })
    : appointments;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        <span className="align-middle mr-2">📋</span> All Appointments
      </h2>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filtered.length}</span> of {appointments.length}
        </div>
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by patient or doctor name..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">

        {/* Table Head */}
        <div
          className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] py-3 px-6 border-b text-white font-semibold text-center sticky top-0 z-10 drop-shadow"
          style={{ backgroundColor: '#037c6e' }}
        >
          <p className="uppercase tracking-wide text-xs">#</p>
          <p className="uppercase tracking-wide text-xs">Patient</p>
          <p className="uppercase tracking-wide text-xs">Age</p>
          <p className="uppercase tracking-wide text-xs">Date & Time</p>
          <p className="uppercase tracking-wide text-xs">Doctor</p>
          <p className="uppercase tracking-wide text-xs">Fees</p>
          <p className="uppercase tracking-wide text-xs">Action</p>
        </div>

        {/* Appointments List */}
        {filtered.map((item, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] grid-cols-1 gap-4 sm:gap-2 items-center text-gray-700 py-4 px-6 border-b last:border-none hover:bg-gray-50 odd:bg-gray-50 sm:odd:bg-transparent transition rounded-md sm:rounded-none hover:ring-1 hover:ring-teal-100"
          >
            {/* Index */}
            <p className="text-center font-semibold">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item?.userdata?.image}
                alt="Patient"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm hover:shadow transition"
              />
              <p className="font-medium truncate">{item?.userdata?.name || 'N/A'}</p>
            </div>

            {/* Age */}
            <p className="text-center">{calculateAge(item?.userdata?.dob)}</p>

            {/* Date & Time + Status */}
            <p className="text-center text-sm font-medium leading-5">
              {item?.slotDate}
              <br />
              <span className="text-gray-500">{item?.slotTime}</span>
              <span className="block mt-2">
                {item.cancelled ? (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-600">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-600">Completed</span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">Upcoming</span>
                )}
              </span>
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-3 justify-center sm:justify-start min-w-0">
              <img
                src={item?.docData?.image}
                alt="Doctor"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm hover:shadow transition"
              />
              <p className="font-medium truncate">Dr. {item?.docData?.name || 'N/A'}</p>
            </div>

            {/* Fees */}
            <p className="text-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                ${item?.docData?.fees || 0}
              </span>
            </p>

            {/* Status / Cancel */}
            <div className="flex justify-center">
              {item.cancelled ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                  Cancelled
                </span>
              ) : (
                <MdCancel
                  title="Cancel appointment"
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition transform hover:scale-110"
                />
              )}
            </div>
          </div>
        ))}

        {/* No Appointments Fallback */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;





