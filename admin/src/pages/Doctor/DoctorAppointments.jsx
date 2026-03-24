import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import axios from 'axios'

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, completeAppointment, cancelAppointment, backendUrl } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const sendVideoInvite = async (appointment) => {
    try {
      const patientRoomPath = `/call/${appointment._id}`
      await axios.post(
        `${backendUrl}/api/doctor/video-call/invite`,
        { appointmentId: appointment._id, roomPath: patientRoomPath },
        { headers: { Authorization: `Bearer ${dToken}` } }
      )
      const doctorRoomUrl = `${window.location.origin}/doctor-call/${appointment._id}`
      window.open(doctorRoomUrl, '_blank')
    } catch (e) {}
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">Manage and track all your patient appointments</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#037c6e] px-6 py-4">
          <div className="grid grid-cols-[40px_1.5fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 text-white font-semibold">
            <p className="text-center">#</p>
            <p>Patient</p>
            <p className="text-center">Payment</p>
            <p className="text-center">Age</p>
            <p className="text-center">Date & Time</p>
            <p className="text-center">Fees</p>
            <p className="text-center">Action</p>
          </div>
        </div>

        {/* Rows */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => {
              const user = item.userdata || {};
              const doc = item.docData || {};

              return (
                <div
                  key={item._id || index}
                  className="grid grid-cols-[40px_1.5fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 py-4 px-6 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-150"
                >
                  <p className="text-center text-gray-500 font-medium">{index + 1}</p>

                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || "https://via.placeholder.com/40"}
                      alt={user.name || "Patient"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.name || "Unknown"}</p>
                      <p className="text-xs text-gray-500">{user.email || "No email"}</p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.payment 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.payment ? "Online" : "Cash"}
                    </span>
                  </div>

                  {/* Age */}
                  <p className="text-center text-gray-700">{calculateAge(user.dob)}</p>

                  {/* Date & Time */}
                  <div className="text-center">
                    <p className="font-medium text-gray-800">
                      {item.slotDate
                        ? new Date(item.slotDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">{item.slotTime || "--:--"}</p>
                  </div>

                  {/* Fees */}
                  <p className="text-center font-semibold text-gray-900">
                    ${doc.fees ?? 0}
                  </p>

                  {/* Action */}
                  <div className="flex justify-center">
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          Completed
                        </span>
                        <button
                          onClick={() => sendVideoInvite(item)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 flex items-center gap-2"
                          title="Start Video Call"
                        >
                          <FaVideo className="w-4 h-4" />
                          <span className="text-xs font-medium">Video Call</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
                          title="Cancel Appointment"
                        >
                          <MdCancel className="w-5 h-5" />
                        </button>
                        {item.payment && (
                          <button
                            onClick={() => sendVideoInvite(item)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                            title="Start Video Call"
                          >
                            <FaVideo className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 transition-colors duration-200"
                          title="Mark as Completed"
                        >
                          <FaCheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
              <p className="text-gray-500">You don't have any appointments scheduled at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
