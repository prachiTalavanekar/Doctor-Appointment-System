import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const TopStats = () => {
  const { getUserCount, getDoctorCount, getAppointmentsCount, getCancelledAppointmentsCount } = useContext(AdminContext);
  const [userCount, setUserCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [cancelledAppointmentsCount, setCancelledAppointmentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [users, doctors, count, cancel] = await Promise.all([
          getUserCount(),
          getDoctorCount(),
          getAppointmentsCount(),
          getCancelledAppointmentsCount()
        ]);

        setUserCount(users);
        setDoctorCount(doctors);
        setAppointmentsCount(count);
        setCancelledAppointmentsCount(cancel);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const statsData = [
    {
      icon: "👤",
      title: "Total Users",
      value: userCount,
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500",
      trend: "+12%"
    },
    {
      icon: "🧑‍⚕️",
      title: "Total Doctors",
      value: doctorCount,
      color: "bg-[#dcf7e5ff] border-green-200",
      iconBg: "bg-[#037c6e]",
      trend: "+5%"
    },
    {
      icon: "📅",
      title: "Total Appointments",
      value: appointmentsCount,
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-500",
      trend: "+18%"
    },
    {
      icon: "✅",
      title: "Active Appointments",
      value: appointmentsCount - cancelledAppointmentsCount,
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-500",
      trend: "+8%"
    },
    {
      icon: "❌",
      title: "Cancelled Appointments",
      value: cancelledAppointmentsCount,
      color: "bg-red-50 border-red-200",
      iconBg: "bg-red-500",
      trend: "-3%"
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} loading={loading} />
      ))}
    </div>
  );
};

const StatCard = ({ icon, title, value, color, iconBg, trend, loading }) => (
  <div className={`${color} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`${iconBg} rounded-xl p-3 shadow-lg`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <div className="text-right">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-600' :
          trend.startsWith('-') ? 'bg-red-100 text-red-600' :
            'bg-gray-100 text-gray-600'
          }`}>
          {trend}
        </span>
      </div>
    </div>

    <div>
      <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {value !== undefined ? value.toLocaleString() : '--'}
        </p>
      )}
    </div>

    {/* Progress bar for visual appeal */}
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${iconBg.replace('bg-', 'bg-')}`}
          style={{ width: loading ? '0%' : `${Math.min((value || 0) / 100 * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  </div>
);

export default TopStats;
