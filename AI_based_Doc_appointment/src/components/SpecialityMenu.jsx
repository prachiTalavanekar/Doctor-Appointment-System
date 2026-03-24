// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'
 

// const SpecialityMenu = () => {
//   return (
//     <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
// <h1 className='text-3xl font-medium'>
//   Find By <span style={{ color: '#037c6e' }}>Speciality</span>
// </h1>
//         <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassel-free</p>
//         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
//         {specialityData.map((item,index)=>{
//           return (
//             <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink hover:translate-y-[-10px] transition-all duration-500 '  key={index} to={`/doctors/${item.speciality}`}>
//             <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
//             <p>{item.speciality}</p>
//           </Link>
//           )
          
//         })}
//         </div>
//     </div>
//   )
// }

// export default SpecialityMenu














import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-2 text-gray-800 bg-white'>
      <h1 className='text-3xl font-semibold'>
        Find By <span className='text-[#037c6e]'>Speciality</span>
      </h1>
      
      <p className='sm:w-1/2 text-center text-sm text-gray-600'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free
      </p>

      <div className='flex gap-6 pt-6 w-full px-4 overflow-x-auto sm:justify-center scrollbar-thin scrollbar-thumb-gray-300'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className='flex flex-col items-center flex-shrink-0 w-24 sm:w-28 text-center cursor-pointer hover:-translate-y-2 transition-transform duration-300'
          >
            <div className='w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow'>
              <img src={item.image} alt={item.speciality} className='w-10 sm:w-12 object-contain' />
            </div>
            <p className='text-sm font-medium text-gray-700'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
