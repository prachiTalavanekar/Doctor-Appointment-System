// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext.jsx'

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors()
//     }
//   }, [aToken])

// return (
//   <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//     <h1 className='text-lg font-medium'>All Doctors</h1>
//     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//       {
//         doctors.map((item, index) => (
//           <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             <img className='bg-[#e3fcf3] group-hover:bg-[#7fe7c1ff] transition-all duration-500' src={item.image} alt="" />
//             <div className='p-4'>
//               <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//               <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//               <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input type="checkbox" checked={item.available} />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))
//       }
//     </div>
//   </div>
// )

// }

// export default DoctorsList
     








// // import React, { useContext, useEffect } from 'react'
// // import { AdminContext } from '../../context/AdminContext.jsx'

// // const DoctorsList = () => {
// //   const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

// //   useEffect(() => {
// //     if (aToken) {
// //       getAllDoctors()
// //     }
// //   }, [aToken])

// //   return (
// //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// //       <h1 className="text-lg font-medium mb-5">All Doctors</h1>
// //       <div className="w-full flex flex-wrap gap-6">
// //         {doctors.map((item, index) => (
// //           <div
// //             key={index}
// //             className="border border-gray-300 rounded-xl p-6 w-56 text-center shadow-sm hover:shadow-md transition-all duration-300 bg-white"
// //           >
// //             {/* Doctor Image */}
// //             <img
// //               src={item.image}
// //               alt={item.name}
// //               className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
// //             />

// //             {/* Availability */}
// //             <div className="flex items-center justify-center gap-2 mb-2">
// //               <span
// //                 className={`h-3 w-3 rounded-full ${
// //                   item.available ? 'bg-green-500' : 'bg-red-500'
// //                 }`}
// //               ></span>
// //               <span
// //                 className={`text-sm font-medium ${
// //                   item.available ? 'text-green-600' : 'text-red-600'
// //                 }`}
// //               >
// //                 {item.available ? 'Available' : 'Unavailable'}
// //               </span>
// //             </div>

// //             {/* Doctor Details */}
// //             <p className="font-semibold text-lg text-gray-800">{item.name}</p>
// //             <p className="text-gray-500 text-sm">{item.speciality}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default DoctorsList


// // #7fe7c1ff
//bg-[#e3fcf3]










// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext.jsx'

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors , changeAvailability} = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors()
//     }
//   }, [aToken])

//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-scroll">
//       <h1 className="text-lg font-medium mb-5">All Doctors</h1>
//       <div className="w-full flex flex-wrap gap-6 group cursor-pointer">
//         {doctors.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-xl w-56 text-center bg-white overflow-hidden"
//             style={{ border: '2px solid rgb(47, 181, 165)' }}
//           >
//             {/* Doctor Image */}
//             <div className="flex justify-center mt-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 rounded-full object-cover group-hover:bg-[#7fe7c1ff] bg-[#e3fcf3] transition-all duration-500"
//               />
//             </div>

//             {/* Doctor Info */}
//             <div className="p-4">
//               {/* Availability with checkbox (unchanged) */}
//               <div className="mt-2 flex items-center justify-center gap-2 text-sm mb-2">
//                 <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}  />
//                 <p>Availability</p>
//               </div>

//               {/* Doctor Name & Specialty */}
//               <p className="font-semibold text-lg text-gray-800">{item.name}</p>
//               <p className="text-gray-500 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorsList



//----------------------working ----------------------
// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext.jsx'

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors()
//     }
//   }, [aToken])

//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-auto max-w-full">
//       <div className="flex items-center justify-between gap-3 mb-5">
//         <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//           <span className="align-middle">👨‍⚕️</span> All Doctors
//         </h1>
//         <span className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">{(Array.isArray(doctors)? doctors:[]).length}</span></span>
//       </div>

//       <div className="w-full overflow-x-auto rounded-2xl border border-[#2fb5a5]/40 bg-white shadow-md">
//         <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #037c6e 0%, #2fb5a5 100%)' }}></div>
//         <table className="w-full min-w-[640px] text-sm">
//           <thead className="text-white sticky top-0 z-10 shadow" style={{ backgroundColor: '#037c6e' }}>
//             <tr>
//               <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Doctor</th>
//               <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Name</th>
//               <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Speciality</th>
//               <th className="px-6 py-3 text-center font-semibold uppercase tracking-wide text-xs">Availability</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {(Array.isArray(doctors) ? doctors : []).map((item, index) => (
//               <tr key={index} className="group even:bg-gray-50/60 hover:bg-[#e3fcf3]/60 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center gap-3">
//                     {item?.image ? (
//                       <img
//                         src={item.image}
//                         alt={item?.name || 'Doctor'}
//                         className="w-12 h-12 rounded-full object-cover ring-2 ring-white border-2 border-[#2fb5a5]/50 bg-[#e3fcf3] shadow-sm group-hover:shadow-md transition"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full border-2 border-[#2fb5a5]/50 bg-[#e3fcf3]"></div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-800">
//                   <div className="flex items-center gap-2">
//                     <span className="truncate text-[15px]">{item.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold bg-[#e3fcf3] border-[#2fb5a5]/40 text-[#037c6e] shadow-sm">
//                     {item.speciality}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <div className="inline-flex items-center gap-2">
//                     <span className={`h-2.5 w-2.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                     <label className="inline-flex items-center gap-2 cursor-pointer" title="Toggle availability">
//                       <input
//                         type="checkbox"
//                         checked={item.available}
//                         onChange={() => changeAvailability(item._id)}
//                         className="form-checkbox h-4 w-4 text-[#2fb5a5] focus:ring-[#2fb5a5]"
//                       />
//                       <span className={`text-sm font-medium ${item.available ? 'text-green-700' : 'text-red-600'}`}>
//                         {item.available ? 'Available' : 'Unavailable'}
//                       </span>
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default DoctorsList










import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'

const DoctorsList = () => {
    // 1. Destructure deleteDoctor from the context
    const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])


    // 2. Add the handler function for the delete action
    const handleDelete = (doctorId, doctorName) => {
        if (window.confirm(`Are you sure you want to delete Dr. ${doctorName}? This action cannot be undone.`)) {
            deleteDoctor(doctorId);
        }
    };

    return (
        <div className="m-5 max-h-[90vh] overflow-y-auto max-w-full">
            <div className="flex items-center justify-between gap-3 mb-5">
                <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="align-middle">👨‍⚕️</span> All Doctors
                </h1>
                <span className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">{(Array.isArray(doctors) ? doctors : []).length}</span></span>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-[#2fb5a5]/40 bg-white shadow-md">
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #037c6e 0%, #2fb5a5 100%)' }}></div>
                <table className="w-full min-w-[640px] text-sm">
                    <thead className="text-white sticky top-0 z-10 shadow" style={{ backgroundColor: '#037c6e' }}>
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Doctor</th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Name</th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Speciality</th>
                            <th className="px-6 py-3 text-center font-semibold uppercase tracking-wide text-xs">Availability</th>
                            {/* 3. Add the new "Actions" table header */}
                            <th className="px-6 py-3 text-center font-semibold uppercase tracking-wide text-xs">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {(Array.isArray(doctors) ? doctors : []).map((item, index) => (
                            <tr key={index} className="group even:bg-gray-50/60 hover:bg-[#e3fcf3]/60 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {item?.image ? (
                                            <img
                                                src={item.image}
                                                alt={item?.name || 'Doctor'}
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white border-2 border-[#2fb5a5]/50 bg-[#e3fcf3] shadow-sm group-hover:shadow-md transition"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full border-2 border-[#2fb5a5]/50 bg-[#e3fcf3]"></div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    <div className="flex items-center gap-2">
                                        <span className="truncate text-[15px]">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold bg-[#e3fcf3] border-[#2fb5a5]/40 text-[#037c6e] shadow-sm">
                                        {item.speciality}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <label className="inline-flex items-center gap-2 cursor-pointer" title="Toggle availability">
                                            <input
                                                type="checkbox"
                                                checked={item.available}
                                                onChange={() => changeAvailability(item._id)}
                                                className="form-checkbox h-4 w-4 text-[#2fb5a5] focus:ring-[#2fb5a5]"
                                            />
                                            <span className={`text-sm font-medium ${item.available ? 'text-green-700' : 'text-red-600'}`}>
                                                {item.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                {/* 4. Add the new table cell with the delete button */}
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleDelete(item._id, item.name)}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        title={`Delete Dr. ${item.name}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default DoctorsList
