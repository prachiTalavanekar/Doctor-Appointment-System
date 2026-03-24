import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import PayPalPayment from '../components/PayPalPayment'
import PaymentReceipt from '../components/PaymentReceipt'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [showPayPal, setShowPayPal] = useState(null) // Track which appointment is showing PayPal
  const [showReceipt, setShowReceipt] = useState(null) // Track which appointment is showing receipt

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePaymentClick = (appointmentId) => {
    // Toggle PayPal payment interface
    setShowPayPal(showPayPal === appointmentId ? null : appointmentId);
  };

  const handlePaymentSuccess = (appointmentId, paymentDetails) => {
    console.log('Payment successful for appointment:', appointmentId, paymentDetails);
    setShowPayPal(null);
    // Refresh appointments to show updated payment status
    getUserAppointments();
  };

  const handlePaymentError = (appointmentId, error) => {
    console.error('Payment error for appointment:', appointmentId, error);
    setShowPayPal(null);
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#037c6e] mb-2">My Appointments</h1>
              <p className="text-gray-600">Manage your upcoming and past appointments</p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-[#e3fcf3] rounded-full p-4">
                <svg className="w-8 h-8 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Grid - Mobile First Design */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments Found</h3>
            <p className="text-gray-500">You haven't booked any appointments yet. Book your first appointment to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  <div className="p-6">
                    {/* Doctor Info */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={item.docData.image}
                          alt={item.docData.name}
                          className="w-20 h-20 rounded-2xl object-cover bg-[#e3fcf3] border-2 border-[#037c6e]/20"
                        />
                        <div className="absolute -top-2 -right-2 bg-[#037c6e] rounded-full w-6 h-6 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.docData.name}</h3>
                        <p className="text-[#037c6e] font-medium text-sm mb-2">{item.docData.speciality}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <div>
                            <p>{item.docData.address.line1}</p>
                            <p>{item.docData.address.line2}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-[#e3fcf3] rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#037c6e]">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="font-semibold">{item.slotDate}</span>
                        </div>
                        <div className="flex items-center text-[#037c6e]">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="font-semibold">{item.slotTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3">
                      {!item.cancelled && !item.payment && (
                        <>
                          <button 
                            onClick={() => handlePaymentClick(item._id)} 
                            className="w-full bg-[#037c6e] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#026157] transform hover:scale-105 transition-all duration-200 shadow-lg"
                          >
                            💳 Pay with PayPal - ${item.amount}
                          </button>
                          <button 
                            onClick={() => cancelAppointment(item._id)} 
                            className="w-full bg-white text-red-600 py-3 px-6 rounded-xl font-semibold border-2 border-red-200 hover:bg-red-600 hover:text-white transform hover:scale-105 transition-all duration-200"
                          >
                            ❌ Cancel Appointment
                          </button>
                        </>
                      )}
                      {!item.cancelled && item.payment && (
                        <div className="w-full space-y-2">
                          <div className="bg-green-50 text-green-600 py-3 px-6 rounded-xl font-semibold border-2 border-green-200 text-center">
                            ✅ Payment Completed
                          </div>
                          {item.paymentMethod && (
                            <div className="text-center text-sm text-gray-600">
                              Payment via {item.paymentMethod}
                              {item.paymentDetails?.paymentDate && (
                                <div className="text-xs">
                                  Paid on {new Date(item.paymentDetails.paymentDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-center text-sm">
                            📅 Appointment Confirmed - See you on {item.slotDate} at {item.slotTime}
                          </div>
                        </div>
                      )}
                      {item.cancelled && (
                        <div className="w-full bg-red-50 text-red-600 py-3 px-6 rounded-xl font-semibold border-2 border-red-200 text-center">
                          ⚠️ Appointment Cancelled
                        </div>
                      )}
                    </div>

                    {/* PayPal Payment Interface */}
                    {showPayPal === item._id && !item.cancelled && !item.payment && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                        <PayPalPayment
                          appointmentId={item._id}
                          amount={item.amount}
                          currency="USD"
                          doctorName={item.docData.name}
                          backendUrl={backendUrl}
                          token={token}
                          onSuccess={(details) => handlePaymentSuccess(item._id, details)}
                          onError={(error) => handlePaymentError(item._id, error)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className="flex items-center p-6">
                    {/* Doctor Image & Info */}
                    <div className="flex items-center space-x-6 flex-1">
                      <div className="relative">
                        <img
                          src={item.docData.image}
                          alt={item.docData.name}
                          className="w-24 h-24 rounded-2xl object-cover bg-[#e3fcf3] border-2 border-[#037c6e]/20"
                        />
                        <div className="absolute -top-2 -right-2 bg-[#037c6e] rounded-full w-8 h-8 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.docData.name}</h3>
                        <p className="text-[#037c6e] font-semibold mb-3">{item.docData.speciality}</p>
                        <div className="flex items-start text-gray-600 text-sm">
                          <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <div>
                            <p>{item.docData.address.line1}</p>
                            <p>{item.docData.address.line2}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-[#e3fcf3] rounded-xl p-4 mx-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center text-[#037c6e] mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="font-bold text-lg">{item.slotDate}</span>
                        </div>
                        <div className="flex items-center justify-center text-[#037c6e]">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="font-bold text-lg">{item.slotTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 min-w-[200px]">
                      {!item.cancelled && !item.payment && (
                        <>
                          <button 
                            onClick={() => handlePaymentClick(item._id)} 
                            className="bg-[#037c6e] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#026157] transform hover:scale-105 transition-all duration-200 shadow-lg"
                          >
                            💳 Pay with PayPal - ${item.amount}
                          </button>
                          <button 
                            onClick={() => cancelAppointment(item._id)} 
                            className="bg-white text-red-600 py-3 px-6 rounded-xl font-semibold border-2 border-red-200 hover:bg-red-600 hover:text-white transform hover:scale-105 transition-all duration-200"
                          >
                            ❌ Cancel Appointment
                          </button>
                        </>
                      )}
                      {!item.cancelled && item.payment && (
                        <div className="space-y-2">
                          <div className="bg-green-50 text-green-600 py-3 px-6 rounded-xl font-semibold border-2 border-green-200 text-center">
                            ✅ Payment Completed
                          </div>
                          {item.paymentMethod && (
                            <div className="text-center text-sm text-gray-600">
                              Payment via {item.paymentMethod}
                              {item.paymentDetails?.paymentDate && (
                                <div className="text-xs">
                                  Paid on {new Date(item.paymentDetails.paymentDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-center text-sm">
                            📅 Appointment Confirmed - See you on {item.slotDate} at {item.slotTime}
                          </div>
                        </div>
                      )}
                      {item.cancelled && (
                        <div className="bg-red-50 text-red-600 py-3 px-6 rounded-xl font-semibold border-2 border-red-200 text-center">
                          ⚠️ Appointment Cancelled
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* PayPal Payment Interface - Desktop */}
                {showPayPal === item._id && !item.cancelled && !item.payment && (
                  <div className="hidden lg:block px-6 pb-6">
                    <div className="p-4 bg-gray-50 rounded-xl border">
                      <PayPalPayment
                        appointmentId={item._id}
                        amount={item.amount}
                        currency="USD"
                        doctorName={item.docData.name}
                        backendUrl={backendUrl}
                        token={token}
                        onSuccess={(details) => handlePaymentSuccess(item._id, details)}
                        onError={(error) => handlePaymentError(item._id, error)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Payment Receipt Modal */}
      {showReceipt && (
        <PaymentReceipt 
          appointment={showReceipt} 
          onClose={() => setShowReceipt(null)} 
        />
      )}
    </div>
  )
}

export default MyAppointments