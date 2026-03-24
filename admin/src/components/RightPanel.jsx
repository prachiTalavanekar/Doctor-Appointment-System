// // // import React from "react";
// // // import { Calendar } from "react-calendar"; // install with: npm install react-calendar
// // // import "react-calendar/dist/Calendar.css";

// // // const RightPanel = () => {
// // //   return (
// // //     <div className="w-full lg:w-1/2 space-y-6">
// // //       {/* Calendar */}
// // //       <div className="bg-white shadow-md rounded-lg p-5">
// // //         <h3 className="text-lg font-semibold text-gray-700 mb-4">📅 Calendar</h3>
// // //         <Calendar className="rounded-lg border p-2" />
// // //       </div>

// // //       {/* Quick Actions */}
// // //       <div className="bg-white shadow-md rounded-lg p-5">
// // //         <h3 className="text-lg font-semibold text-gray-700 mb-4">⚡ Quick Actions</h3>
// // //         <div className="space-y-3">
// // //           <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
// // //             ➕ Add Appointment
// // //           </button>
// // //           <button className="w-full px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
// // //             👨‍⚕️ Add Doctor
// // //           </button>
// // //           <button className="w-full px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600">
// // //             📊 View Reports
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RightPanel;








// // import React from "react";
// // import { Calendar } from "react-calendar"; // install with: npm install react-calendar
// // import "react-calendar/dist/Calendar.css";

// // const RightPanel = () => {
// //   return (
// //     <div className="w-full lg:w-1/2 space-y-6">
// //       {/* Calendar */}
// //       <div className="bg-white shadow-md rounded-lg p-5 h-[350px] overflow-y-auto">
// //         <h3 className="text-lg font-semibold text-gray-700 mb-4">📅 Calendar</h3>
// //         <Calendar className="rounded-lg border p-2 w-full" />
// //       </div>

// //       {/* Quick Actions */}
// //       <div className="bg-white shadow-md rounded-lg p-5 h-[250px] overflow-y-auto">
// //         <h3 className="text-lg font-semibold text-gray-700 mb-4">⚡ Quick Actions</h3>
// //         <div className="space-y-3">
// //           <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
// //             ➕ Add Appointment
// //           </button>
// //           <button className="w-full px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
// //             👨‍⚕️ Add Doctor
// //           </button>
// //           <button className="w-full px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600">
// //             📊 View Reports
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RightPanel;




// import React from "react";
// import { Calendar } from "react-calendar"; // npm install react-calendar
// import "react-calendar/dist/Calendar.css";
// import { NavLink } from "react-router-dom";

// const RightPanel = () => {
//   return (
//     <div className="w-full lg:w-1/2 space-y-6 max-h-[50vh] overflow-y-scroll">
//       {/* Calendar */}
//       <div className="bg-white shadow-md rounded-lg p-5">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">📅 Calendar</h3>
//         <Calendar className="rounded-lg border p-2 w-full" />
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white shadow-md rounded-lg p-5">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">⚡ Quick Actions</h3>
//         <div className="space-y-3">


//           <NavLink to="/all-users">
//             <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow">
//               👥 See Users
//             </button>
//           </NavLink>

//           <NavLink to="/doctor-list">
//             <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow">
//               👨‍⚕️ All Doctors
//             </button>
//           </NavLink>

//           <NavLink to="/all-apointments">
//             <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow">
//               📅 All Appointments
//             </button>
//           </NavLink>

//           <NavLink to="/add-doctor">
//             <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow">
//               ➕ Add Doctor
//             </button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightPanel;











import React from "react";
import { Calendar } from "react-calendar"; // npm install react-calendar
import "react-calendar/dist/Calendar.css";
import { NavLink } from "react-router-dom";

const RightPanel = () => {
  return (
    <div className="w-full max-h-150 space-y-6 overflow-y-auto">
      {/* Calendar */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#037c6e] rounded-lg p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800">Calendar</h3>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <Calendar
            className="w-full border-0 rounded-xl"
            tileClassName="hover:bg-[#dcf7e5ff] rounded-lg transition-colors"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#037c6e] rounded-lg p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
        </div>

        <div className="space-y-3">
          <NavLink to="/all-users" className="block">
            <div className="bg-[#dcf7e5ff] border border-green-200 rounded-xl p-4 text-gray-800 font-medium flex items-center gap-3 hover:bg-green-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="bg-[#037c6e] rounded-lg p-2">
                <span className="text-white text-lg">👥</span>
              </div>
              <span>See Users</span>
            </div>
          </NavLink>

          <NavLink to="/doctor-list" className="block">
            <div className="bg-[#dcf7e5ff] border border-green-200 rounded-xl p-4 text-gray-800 font-medium flex items-center gap-3 hover:bg-green-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="bg-[#037c6e] rounded-lg p-2">
                <span className="text-white text-lg">👨‍⚕️</span>
              </div>
              <span>All Doctors</span>
            </div>
          </NavLink>

          <NavLink to="/all-apointments" className="block">
            <div className="bg-[#dcf7e5ff] border border-green-200 rounded-xl p-4 text-gray-800 font-medium flex items-center gap-3 hover:bg-green-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="bg-[#037c6e] rounded-lg p-2">
                <span className="text-white text-lg">📅</span>
              </div>
              <span>All Appointments</span>
            </div>
          </NavLink>

          <NavLink to="/add-doctor" className="block">
            <div className="bg-[#dcf7e5ff] border border-green-200 rounded-xl p-4 text-gray-800 font-medium flex items-center gap-3 hover:bg-green-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="bg-[#037c6e] rounded-lg p-2">
                <span className="text-white text-lg">➕</span>
              </div>
              <span>Add Doctor</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
