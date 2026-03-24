// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets';


// const Doctors = () => {
//   const { speciality } = useParams()
//   const [filterDoc, setFilterDoc] = useState([])
//   const { Doctors } = useContext(AppContext)
//   const [showFilter, setShowFilter] = useState(false)
//   const navigate = useNavigate()

//   const applyfilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     } else {
//       setFilterDoc(doctors)
//     }
//   }
//   useEffect(() => {
//     applyfilter()
//   }, [doctors, speciality])

//   return (
//     <div>
//       <p className='text-gray-600'>Browse through the doctors specialist.</p>
//       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
//         <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#037c6e] text-white' : ' '}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
//         <div className={`flex-col gap-4 text-sm text-gray-60 ${showFilter ? 'flex' : 'hidden sm:flex'} transition-all`}>
//           <p onClick={()=>speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-[#e3fcf3]  text-black" : ""}`}>General physician</p>
//           <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Gynecologist</p>
//           <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Dermatologist</p>
//           <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-[#e3fcf3]  text-black" : ""}`}>Pediatricians</p>
//           <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Neurologist</p>
//           <p onClick={()=>speciality === 'Gastroenterolist' ? navigate('/doctors') : navigate('/doctors/Gastroenterolist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterolist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Gastroenterolist</p>
//         </div>
// <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 gap-y-6'>
//           {
//             filterDoc.map((item, index) => (
//               <div
//                 onClick={() => navigate(`/appointment/${item._id}`)}
//                 key={index}
//                 className='rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md'
//                 style={{ border: '1px solid rgb(47, 181, 165)' }}
//               >
//                 {/* Image Section with Background and Padding */}
//                 <div
//                   className='w-full h-48 flex items-center justify-center'
//                   style={{ backgroundColor: '#e3fcf3' }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className='h-full object-contain p-1'
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div className='p-4'>
//                   <div className='flex items-center gap-2 text-sm text-green-700 mb-2'>
//                     <span className='w-2 h-2 bg-green-600 rounded-full'></span>
//                     <span>Available</span>
//                   </div>
//                   <p className='font-semibold text-gray-800'>{item.name}</p>
//                   <p className='text-sm text-gray-700'>{item.speciality}</p>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Doctors






// original -------------------
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets';

// const Doctors = () => {
//   const { speciality } = useParams()
//   const [filterDoc, setFilterDoc] = useState([])
//   const { Doctors } = useContext(AppContext)
//   const [showFilter, setShowFilter] = useState(false)
//   const navigate = useNavigate()

//   const applyfilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     } else {
//       setFilterDoc(doctors)
//     }
//   }
//   useEffect(() => {
//     applyfilter()
//   }, [doctors, speciality])

//   return (
//     <div>
//       <p className='text-gray-600'>Browse through the doctors specialist.</p>
//       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
//         <button 
//           className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#037c6e] text-white' : ' '}`} 
//           onClick={() => setShowFilter(prev => !prev)}
//         >
//           Filters
//         </button>
//         <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} transition-all`}>
//           <p 
//             onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             General physician
//           </p>
//           <p 
//             onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             Gynecologist
//           </p>
//           <p 
//             onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             Dermatologist
//           </p>
//           <p 
//             onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             Pediatricians
//           </p>
//           <p 
//             onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             Neurologist
//           </p>
//           <p 
//             onClick={() => speciality === 'Gastroenterolist' ? navigate('/doctors') : navigate('/doctors/Gastroenterolist')} 
//             className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterolist" ? "bg-[#e3fcf3] text-black" : ""}`}
//           >
//             Gastroenterolist
//           </p>
//         </div>

//         {/* Cards Grid with 4 columns on md and above */}
//         <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-8'>
//           {
//             filterDoc.map((item, index) => (
//               <div
//                 onClick={() => navigate(`/appointment/${item._id}`)}
//                 key={index}
//                 className='bg-white rounded-2xl shadow-lg cursor-pointer p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'
//                 style={{ border: '2px solid rgb(47, 181, 165)' }}
//               >
//                 {/* Circular Image Section */}
//                 <div
//                   className='w-32 h-32 rounded-full bg-[#e3fcf3] flex items-center justify-center mb-5 overflow-hidden'
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className='object-contain w-28 h-28'
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div>
//                   <div className='flex items-center justify-center gap-2 text-sm text-green-700 mb-3'>
//                     <span className='w-3 h-3 bg-green-600 rounded-full animate-pulse'></span>
//                     <span>Available</span>
//                   </div>
//                   <p className='font-bold text-xl text-gray-900 mb-1'>{item.name}</p>
//                   <p className='text-md text-gray-700'>{item.speciality}</p>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Doctors




// partially corect
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets';

// const Doctors = () => {
//   const { speciality } = useParams()
//   const [filterDoc, setFilterDoc] = useState([])
//   const { Doctors } = useContext(AppContext)
//   const navigate = useNavigate()

//   const applyfilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     } else {
//       setFilterDoc(doctors)
//     }
//   }

//   useEffect(() => {
//     applyfilter()
//   }, [doctors, speciality])

//   const specialities = [
//     "General physician",
//     "Gynecologist",
//     "Dermatologist",
//     "Pediatricians",
//     "Neurologist",
//     "Gastroenterolist"
//   ];

//   return (
//     <div>
//       <p className='text-gray-600'>Browse through the doctors specialist.</p>

//       {/* Filters at the Top */}
//       <div className='mt-5'>
//         <div className='flex flex-wrap gap-4'>
//           {specialities.map((spec, index) => (
//             <p
//               key={index}
//               onClick={() =>
//                 speciality === spec
//                   ? navigate('/doctors')
//                   : navigate(`/doctors/${spec}`)
//               }
//               className={`px-4 py-2 border border-gray-300 rounded cursor-pointer transition-all text-sm ${
//                 speciality === spec ? 'bg-[#e3fcf3] text-black' : 'text-gray-600'
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Doctor Cards */}
//       <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
//         {filterDoc.map((item, index) => (
//           <div
//             onClick={() => navigate(`/appointment/${item._id}`)}
//             key={index}
//             className='bg-white rounded-2xl shadow-lg cursor-pointer p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'
//             style={{ border: '2px solid rgb(47, 181, 165)' }}
//           >
//             {/* Circular Image */}
//             <div className='w-32 h-32 rounded-full bg-[#e3fcf3] flex items-center justify-center mb-5 overflow-hidden'>
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className='object-contain w-28 h-28'
//               />
//             </div>

//             {/* Doctor Info */}
//             <div>
//               <div className='flex items-center justify-center gap-2 text-sm text-green-700 mb-3'>
//                 <span className='w-3 h-3 bg-green-600 rounded-full animate-pulse'></span>
//                 <span>Available</span>
//               </div>
//               <p className='font-bold text-xl text-gray-900 mb-1'>{item.name}</p>
//               <p className='text-md text-gray-700'>{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Doctors










//------------------------ working code ------------------------------------------

// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets';

// const Doctors = () => {
//   const { speciality } = useParams()
//   const [filterDoc, setFilterDoc] = useState([])
//   const { Doctors } = useContext(AppContext)
//   const [showFilter, setShowFilter] = useState(false)
//   const navigate = useNavigate()

//   const applyfilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     } else {
//       setFilterDoc(doctors)
//     }
//   }

//   useEffect(() => {
//     applyfilter()
//   }, [doctors, speciality])

//   return (
//     <div>
//       <p className='text-gray-600'>Browse through the doctors specialist.</p>

//       {/* Filters at the top */}
//       <div className='flex flex-col sm:flex-row items-center gap-4 mt-5'>
//         <button
//           className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#037c6e] text-white' : ''}`}
//           onClick={() => setShowFilter(prev => !prev)}
//         >
//           Filters
//         </button>

//         <div className={`flex gap-4 text-sm text-gray-600 flex-wrap justify-center ${showFilter ? 'flex' : 'hidden sm:flex'} transition-all`}>
//           {[
//             "General physician",
//             "Gynecologist",
//             "Dermatologist",
//             "Pediatricians",
//             "Neurologist",
//             "Gastroenterolist"
//           ].map(spec => (
//             <p
//               key={spec}
//               onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
//               className={`pl-3 py-1.5 pr-5 border border-gray-300 rounded cursor-pointer transition-all whitespace-nowrap
//                 ${speciality === spec ? "bg-[#e3fcf3] text-black" : "hover:bg-gray-100"}`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Doctor Cards - 5 per row */}
//       <div className='mt-8 grid grid-cols-1 sm:grid-cols-5 gap-8'>
//         {filterDoc.map((item, index) => (
//           <div
//             onClick={() => navigate(`/appointment/${item._id}`)}
//             key={index}
//             className='bg-white rounded-2xl shadow-lg cursor-pointer p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'
//             style={{ border: '2px solid rgb(47, 181, 165)' }}
//           >
//             <div className='w-32 h-32 rounded-full bg-[#e3fcf3] flex items-center justify-center mb-5 overflow-hidden'>
//               <img src={item.image} alt={item.name} className='object-contain w-28 h-28' />
//             </div>
//             <div>
//               <div className='flex items-center justify-center gap-2 text-sm text-green-700 mb-3'>
//                 <span className='w-3 h-3 bg-green-600 rounded-full animate-pulse'></span>
//                 <span>Available</span>
//               </div>
//               <p className='font-bold text-xl text-gray-900 mb-1'>{item.name}</p>
//               <p className='text-md text-gray-700'>{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Doctors



import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)   // ✅ use real doctors from DB
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyfilter()
  }, [doctors, speciality])   // ✅ re-run when doctors load

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>

      {/* Filters at the top */}
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#037c6e] text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div className={`flex gap-4 text-sm text-gray-600 flex-wrap justify-center ${showFilter ? 'flex' : 'hidden sm:flex'} transition-all`}>
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterolist"
          ].map(spec => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`pl-3 py-1.5 pr-5 border border-gray-300 rounded cursor-pointer transition-all whitespace-nowrap
                ${speciality === spec ? "bg-[#e3fcf3] text-black" : "hover:bg-gray-100"}`}
            >
              {spec}
            </p>
          ))}
        </div>
      </div>

      {/* Doctor Cards - 5 per row */}
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-5 gap-8'>
        {filterDoc.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className='bg-white rounded-2xl shadow-lg cursor-pointer p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'
            style={{ border: '2px solid rgb(47, 181, 165)' }}
          >
            <div className='w-32 h-32 rounded-full bg-[#e3fcf3] flex items-center justify-center mb-5 overflow-hidden'>
              <img src={item.image} alt={item.name} className='object-contain w-28 h-28' />
            </div>
            <div>
              <div className='flex items-center justify-center gap-2 text-sm text-green-700 mb-3'>
                <span className='w-3 h-3 bg-green-600 rounded-full animate-pulse'></span>
                <span>Available</span>
              </div>
              <p className='font-bold text-xl text-gray-900 mb-1'>{item.name}</p>
              <p className='text-md text-gray-700'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors


