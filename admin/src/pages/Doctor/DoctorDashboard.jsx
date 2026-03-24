import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets_admin/assets'

const DoctorDashboard = () => {
  const { dashboardData, getDashboardData, loading, dToken } = useContext(DoctorContext)
  const [refreshInterval, setRefreshInterval] = useState(null)
  const [lastNotificationCheck, setLastNotificationCheck] = useState(Date.now())

  useEffect(() => {
    if (dToken) {
      getDashboardData()

      // Set up auto-refresh every 30 seconds
      const interval = setInterval(() => {
        getDashboardData()
      }, 30000)

      setRefreshInterval(interval)

      return () => {
        if (interval) clearInterval(interval)
      }
    }
  }, [dToken])

  // Check for new notifications periodically to trigger dashboard refresh on payments
  useEffect(() => {
    if (!dToken) return

    const notificationCheckInterval = setInterval(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/notification/inbox`, {
          headers: { Authorization: `Bearer ${dToken}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.notifications) {
            // Check for new payment notifications since last check
            const newPaymentNotifications = data.notifications.filter(n => 
              n.type === 'payment' && new Date(n.timestamp).getTime() > lastNotificationCheck
            )
            
            if (newPaymentNotifications.length > 0) {
              // Refresh dashboard data when new payment is detected
              getDashboardData()
              setLastNotificationCheck(Date.now())
            }
          }
        }
      } catch (error) {
        console.error('Error checking notifications:', error)
      }
    }, 10000) // Check every 10 seconds

    return () => {
      clearInterval(notificationCheckInterval)
    }
  }, [dToken, lastNotificationCheck, getDashboardData])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          <img src={icon} alt={title} className="w-8 h-8" />
        </div>
      </div>
    </div>
  )

  const ChartCard = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  )

  const AppointmentCard = ({ appointment, isToday = false }) => (
    <div className={`p-4 rounded-lg border ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {appointment.userdata?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <p className="font-medium text-gray-800">{appointment.userdata?.name || 'Patient'}</p>
            <p className="text-sm text-gray-600">{appointment.slotDate} at {appointment.slotTime}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.payment
              ? 'bg-green-100 text-green-800'
              : appointment.cancelled
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {appointment.payment ? '✅ Paid' : appointment.cancelled ? 'Cancelled' : '⏳ Pending Payment'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.isCompleted
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {appointment.isCompleted ? 'Completed' : 'Upcoming'}
          </span>
          <span className="text-sm font-medium text-gray-700">${appointment.amount}</span>
          {appointment.paymentMethod && (
            <span className="text-xs text-gray-500">({appointment.paymentMethod})</span>
          )}
        </div>
      </div>
    </div>
  )

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
          <button
            onClick={getDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: '#037c6e' }} >
            Refresh Data
          </button>
        </div>
      </div>
    )
  }

  const { stats, recentAppointments, todayAppointments, monthlyData, weeklyData } = dashboardData

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your practice overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Data</span>
          </div>
          <button
            onClick={getDashboardData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#037c6e' }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6 mb-8">
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={assets.appointment_icon}
          color="border-l-blue-500"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={assets.home_icon}
          color="border-l-green-500"
        />
        <StatCard
          title="Completed"
          value={stats.completedAppointments}
          icon={assets.tick_icon}
          color="border-l-emerald-500"
        />
        <StatCard
          title="Paid Appointments"
          value={dashboardData.stats.paidAppointments || 0}
          icon={assets.earning_icon}
          color="border-l-green-500"
          subtitle="Payment received"
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingAppointments - (dashboardData.stats.paidAppointments || 0)}
          icon={assets.appointment_icon}
          color="border-l-orange-500"
          subtitle="Awaiting payment"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelledAppointments}
          icon={assets.cancel_icon}
          color="border-l-red-500"
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          icon={assets.earning_icon}
          color="border-l-purple-500"
          subtitle="From paid appointments"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Appointments Chart */}
        <ChartCard title="Monthly Appointments Trend">
          <div className="space-y-3">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-20">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max((month.appointments / Math.max(...monthlyData.map(m => m.appointments))) * 100, 5)}%`,
                        backgroundColor: '#037c6e'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800 w-8 text-right">{month.appointments}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Weekly Appointments Chart */}
        <ChartCard title="This Week's Appointments">
          <div className="flex items-end justify-between h-40 space-x-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '120px' }}>
                  <div
                    className="rounded-t-lg absolute bottom-0 w-full transition-all duration-500 flex items-end justify-center"
                    style={{
                      height: `${Math.max((day.appointments / Math.max(...weeklyData.map(d => d.appointments))) * 100, 10)}%`,
                      backgroundColor: '#037c6e'
                    }}
                  >
                    {day.appointments > 0 && (
                      <span className="text-white text-xs font-semibold mb-1">{day.appointments}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600 mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Appointments Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <ChartCard title={`Today's Appointments (${todayAppointments.length})`}>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} isToday={true} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <img src={assets.appointment_icon} alt="No appointments" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </ChartCard>

        {/* Recent Appointments */}
        <ChartCard title="Recent Appointments">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <img src={assets.appointment_icon} alt="No appointments" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent appointments</p>
              </div>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

export default DoctorDashboard