// import React from "react";
// import TopStats from "../../components/TopStates.jsx";
// import LatestAppointments from "../../components/LatestAppointments.jsx";

// const Dashboard = () => {
//   return (
//     <div className="space-y-6">
//       {/* Top Stats */}
//       <TopStats />

//       {/* Latest Appointments */}
//       <LatestAppointments />
//     </div>
//   );
// };

// export default Dashboard;




import React, { useContext, useEffect, useState } from "react";
import TopStats from "../../components/TopStates.jsx";
import LatestAppointments from "../../components/LatestAppointments.jsx";
import RightPanel from "../../components/RightPanel.jsx";
import { AdminContext } from "../../context/AdminContext.jsx";

const Dashboard = () => {
  const { appointments, getAllAppointments, getAppointmentAnalytics } = useContext(AdminContext);
  const [chartData, setChartData] = useState({
    daily: [],
    weekly: [],
    monthly: []
  });

  useEffect(() => {
    getAllAppointments();
    // also load analytics server-side for consistency
    (async () => {
      const a = await getAppointmentAnalytics();
      if (a) setChartData({ daily: a.daily || [], weekly: a.weekly || [], monthly: a.monthly || [] })
    })()
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      generateChartData();
    }
  }, [appointments]);

  const generateChartData = () => {
    const now = new Date();
    const toYMD = (d) => {
      if (!d) return null;
      if (typeof d === 'string') {
        if (d.includes('-')) {
          // try to normalize strings like YYYY-MM-DD or DD-MM-YYYY
          const parts = d.split('-');
          if (parts.length === 3) {
            if (parts[0].length === 4) {
              // YYYY-MM-DD
              const dateOnly = d.split('T')[0];
              return dateOnly;
            } else {
              // DD-MM-YYYY
              return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
          }
        }
        // fallback parse generic strings like "Mon Sep 29 2025 ..."
        const parsed = new Date(d);
        if (!isNaN(parsed)) {
          const y = parsed.getFullYear();
          const m = String(parsed.getMonth() + 1).padStart(2, '0');
          const day = String(parsed.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return null;
      }
      if (d instanceof Date) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }
      return null;
    };

    const toYM = (d) => {
      const ymd = toYMD(d);
      return ymd ? ymd.substring(0, 7) : null;
    };
    const last7Days = [];
    const last4Weeks = [];
    const last6Months = [];

    // Generate last 7 days data
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = appointments.filter(apt => {
        const aptYMD = toYMD(apt.slotDate);
        return aptYMD === dateStr && !apt.cancelled;
      }).length;
      
      last7Days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: count,
        date: dateStr
      });
    }

    // Generate last 4 weeks data
    for (let i = 3; i >= 0; i--) {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - (i + 1) * 7);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const count = appointments.filter(apt => {
        let aptDate;
        if (apt.slotDate && typeof apt.slotDate === 'string') {
          if (apt.slotDate.includes('-')) {
            const parts = apt.slotDate.split('-');
            if (parts[0].length === 4) {
              // YYYY-MM-DD format
              aptDate = new Date(apt.slotDate);
            } else {
              // DD-MM-YYYY format
              aptDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }
          } else {
            aptDate = new Date(apt.slotDate);
          }
        } else {
          aptDate = new Date(apt.slotDate);
        }
        
        return aptDate >= startDate && aptDate <= endDate && !apt.cancelled;
      }).length;

      last4Weeks.push({
        label: `Week ${4 - i}`,
        value: count,
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      });
    }

    // Generate last 6 months data
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const monthStr = `${year}-${month}`;

      const count = appointments.filter(apt => {
        const ym = toYM(apt.slotDate);
        return ym === monthStr && !apt.cancelled;
      }).length;

      last6Months.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        value: count,
        month: monthStr
      });
    }

    setChartData({
      daily: last7Days,
      weekly: last4Weeks,
      monthly: last6Months
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor and manage your healthcare platform</p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-[#dcf7e5ff] rounded-full p-4">
                <svg className="w-8 h-8 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Stats */}
        <TopStats />

        {/* Charts Section */}
        <AppointmentCharts chartData={chartData} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <LatestAppointments />
          </div>

          {/* Right Side - Calendar + Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

// Bar Chart Component
const AppointmentCharts = ({ chartData }) => {
  const [activeTab, setActiveTab] = useState('daily');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'daily': return chartData.daily;
      case 'weekly': return chartData.weekly;
      case 'monthly': return chartData.monthly;
      default: return chartData.daily;
    }
  };

  const getMaxValue = (data) => {
    const max = Math.max(...data.map(item => item.value));
    return max === 0 ? 10 : Math.ceil(max * 1.2);
  };

  const currentData = getCurrentData();
  const maxValue = getMaxValue(currentData);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Appointment Analytics</h2>
          <p className="text-gray-600">Track booking trends over time</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: 'daily', label: 'Daily' },
            { key: 'weekly', label: 'Weekly' },
            { key: 'monthly', label: 'Monthly' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                ? 'bg-[#037c6e] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="flex items-end justify-between h-64 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
          {currentData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 mx-1">
              {/* Bar */}
              <div className="relative w-full max-w-12 group">
                <div
                  className="bg-gradient-to-t from-[#037c6e] to-[#048a7b] rounded-t-lg transition-all duration-500 hover:from-[#026157] hover:to-[#037c6e] cursor-pointer shadow-lg"
                  style={{
                    height: `${(item.value / maxValue) * 200}px`,
                    minHeight: item.value > 0 ? '8px' : '2px'
                  }}
                >
                  {/* Value Label */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                      {item.value}
                    </div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500 -ml-8">
          {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map((value, index) => (
            <span key={index} className="leading-none">{value}</span>
          ))}
        </div>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#dcf7e5ff] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#037c6e] rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-lg font-bold text-gray-800">
                {currentData.reduce((sum, item) => sum + item.value, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average</p>
              <p className="text-lg font-bold text-gray-800">
                {currentData.length > 0 ? Math.round(currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length) : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Peak Day</p>
              <p className="text-lg font-bold text-gray-800">
                {currentData.length > 0 ? Math.max(...currentData.map(item => item.value)) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
