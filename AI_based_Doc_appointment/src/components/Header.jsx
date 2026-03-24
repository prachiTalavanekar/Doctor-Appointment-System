// import React from 'react';
// import { assets } from '../assets/assets';

// const Header = () => {
//   return (
//     <div className="relative flex flex-col md:flex-row items-center bg-[#037c6e] px-6 md:px-16 py-12 md:py-0 gap-8 overflow-hidden">
//       {/* ---------- Left Side ----------- */}
//       <div className="md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left py-10 md:py-[10vh] z-10">
//         <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
//           Book Appointment <br />With Trusted Doctors
//         </p>

//         <div className="flex flex-col gap-3 items-center md:flex-row text-white text-sm font-light">
//           <img src={assets.group_profiles} alt="Group" className="w-28" />
//           <p className="text-white text-base md:text-lg">
//             Easily explore our network of trusted doctors and <br className='hidden sm:block' />
//             book your appointment in just a few clicks.
//           </p>
//         </div>

//         <a
//           href="#speciality"
//           className="flex items-center justify-center md:justify-start gap-2 px-8 py-3 bg-white text-gray-700 text-sm font-medium rounded-md hover:scale-105 transition-transform duration-300 w-fit mx-auto md:mx-0"
//         >
//           Book Appointment
//           <img src={assets.arrow_icon} alt="Arrow" className="w-3" />
//         </a>
//       </div>

//       {/* ---------- Right Side ----------- */}
//       <div className="md:w-1/2 relative h-[300px] md:h-auto md:min-h-[500px] flex items-end">
//         <img
//           className="w-full h-full object-cover md:absolute md:bottom-0 md:right-0 rounded-lg"
//           src={assets.header_img1}
//           alt="Header"
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;












import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-[#037c6e] via-[#048a7b] to-[#037c6e] px-6 md:px-16 py-12 md:py-0 gap-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* ---------- Left Side ----------- */}
      <div className="md:w-1/2 flex flex-col justify-center gap-8 text-center md:text-left py-10 md:py-[10vh] z-10 relative">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight tracking-tight">
            Book Appointment
            <br />
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              With Trusted Doctors
            </span>
          </h1>
          <div className="w-24 h-1 bg-white rounded-full mx-auto md:mx-0 opacity-80"></div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-4 items-center md:flex-row text-white">
          <div className="relative">
            <img 
              src={assets.group_profiles} 
              alt="Group" 
              className="w-32 h-auto drop-shadow-lg hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#037c6e] text-xs font-bold">✓</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white/95 text-lg md:text-xl font-medium leading-relaxed">
              Easily explore our network of trusted doctors and
              <br className='hidden sm:block' />
              book your appointment in just a few clicks.
            </p>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Available 24/7</span>
              <div className="w-2 h-2 bg-white rounded-full ml-4"></div>
              <span>Instant Booking</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
          <a
            href="#top-doctors"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#037c6e] text-base font-semibold rounded-xl hover:bg-gray-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-fit mx-auto md:mx-0 shadow-lg"
          >
            <span>Book Appointment</span>
            <img 
              src={assets.arrow_icon} 
              alt="Arrow" 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </a>
          
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-medium">1000+ Happy Patients</span>
          </div>
        </div>
      </div>

      {/* ---------- Right Side ----------- */}
      <div className="md:w-1/2 relative h-[300px] md:h-auto md:min-h-[500px] flex items-end z-10">
        <div className="relative w-full h-full group">
          {/* Main Image */}
          <img
            className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
            src={assets.header_img1}
            alt="Header"
          />
          
          {/* Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
          
          {/* Floating Cards */}
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Online Now</span>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#037c6e] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Dr</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Expert Care</p>
                <p className="text-xs text-gray-500">Trusted by thousands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;








