import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { Navigate, useNavigate } from "react-router-dom";

const LatestAppointments = () => {
  const { latestAppointments, getLatestAppointments } = useContext(AdminContext);
  const navigate = useNavigate()

  useEffect(() => {
    getLatestAppointments();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#037c6e] rounded-lg p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Latest Appointments</h3>
            <p className="text-sm text-gray-600">Recent booking activity</p>
          </div>
        </div>
        <div className="bg-[#dcf7e5ff] text-[#037c6e] px-3 py-1 rounded-full text-sm font-medium">
          {latestAppointments.length} Total
        </div>
      </div>

      {latestAppointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No recent appointments</p>
          <p className="text-gray-400 text-sm">New bookings will appear here</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {latestAppointments.map((appt, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
              <div className="flex items-center justify-between">
                {/* Left side - Doctor Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={appt?.docData?.image}
                      alt="Doctor"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#037c6e] rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      Dr. {appt?.docId?.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{new Date(appt.slotDate).toLocaleDateString()}</span>
                      <span className="text-gray-400">•</span>
                      <span>{appt.slotTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Status */}
                <div className="flex flex-col items-end gap-2">
                  {appt.cancelled ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600 border border-red-200">
                      Cancelled
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600 border border-green-200">
                      Active
                    </span>
                  )}
                  
                  {/* Patient Info */}
                  <div className="text-xs text-gray-500 text-right">
                    <p>Patient ID: {appt?.userId?.slice(-6)}</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {appt?.docData?.speciality}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Fee: ₹{appt?.amount || 500}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {new Date(appt.createdAt || appt.slotDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {latestAppointments.length > 0 && (
        <div className="mt-6 text-center">
          <button onClick={()=>navigate('/all-apointments')} className="bg-[#037c6e] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#026157] transition-colors duration-200 shadow-md">
            View All Appointments
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestAppointments;
