import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Stat = ({ label, value, accent = '#037c6e', icon = null }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: accent }} />
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: accent }}>
        {icon || <span className="text-base">★</span>}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] tracking-wider text-gray-500 uppercase font-medium">{label}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  </div>
)

const UserDashboard = () => {
  const { token, backendUrl, userData, loadUserProfileData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appts, setAppts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    loadUserProfileData()
    ;(async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { Authorization: `Bearer ${token}` } })
        if (data.success) setAppts(data.appointments || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  const upcoming = appts.filter(a => !a.cancelled)
  const cancelled = appts.filter(a => a.cancelled)

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-200 shadow-sm mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_20%,#2fb5a5_0,transparent_40%),radial-gradient(circle_at_80%_0,#037c6e_0,transparent_35%)]" />
        <div className="relative px-6 sm:px-8 py-6 bg-gradient-to-r from-[#f3fffb] to-white rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="relative">
              <img src={userData?.image} alt="avatar" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white border-2 border-teal-300 shadow-lg" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Welcome back{userData?.name ? `, ${userData.name.split(' ')[0]}` : ''} 👋</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Here's a quick look at your health activity</p>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="/my-appointments" className="inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border border-teal-300 text-teal-800 bg-white hover:bg-teal-50 transition-all duration-300 shadow-sm hover:shadow-md">
              <span>📅</span> View Appointments
            </a>
            <a href="/doctors" className="inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border border-teal-300 text-teal-800 bg-white hover:bg-teal-50 transition-all duration-300 shadow-sm hover:shadow-md">
              <span>👨‍⚕️</span> Find Doctors
            </a>
            <a href="/my-profile" className="inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border border-teal-300 text-teal-800 bg-white hover:bg-teal-50 transition-all duration-300 shadow-sm hover:shadow-md">
              <span>⚙️</span> Edit Profile
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Your Health Overview</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <Stat label="Total Appointments" value={appts.length} icon={<span>📅</span>} />
          <Stat label="Upcoming" value={upcoming.length} icon={<span>✅</span>} accent="#159f85" />
          <Stat label="Cancelled" value={cancelled.length} icon={<span>⛔</span>} accent="#e11d48" />
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="px-4 sm:px-6 py-4 border-b bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">Recent Appointments</h2>
          {!loading && appts.length > 0 && (
            <a href="/my-appointments" className="text-xs sm:text-sm text-teal-700 hover:text-teal-900 font-medium hover:underline">See all</a>
          )}
        </div>
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        ) : appts.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No appointments yet</h3>
            <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">Looks like you haven't booked any appointments yet. Get started by booking your first consultation.</p>
            <a href="/doctors" className="inline-block px-5 py-3 rounded-xl border border-teal-300 text-teal-800 bg-teal-50 hover:bg-teal-100 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
              Book your first appointment
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {appts.slice(0, 5).map((a, i) => (
              <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-all duration-200 rounded-lg">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative">
                    <img src={a?.docData?.image} alt="doc" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white border border-teal-200 shadow-sm" />
                    {!a.cancelled && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate text-sm sm:text-base">Dr. {a?.docData?.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">
                      {a?.slotDate} • {a?.slotTime}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {a?.docData?.speciality}
                    </p>
                  </div>
                </div>
                <div className="sm:text-right">
                  {a.cancelled ? (
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">Cancelled</span>
                  ) : (
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">Confirmed</span>
                  )}
                  <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                    ID: {a._id.slice(-6)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Health Tips Section */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
            <span className="text-teal-700">💡</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Health Tip of the Day</h3>
            <p className="text-sm text-gray-600">
              Stay hydrated! Drink at least 8 glasses of water daily to maintain optimal health and energy levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard