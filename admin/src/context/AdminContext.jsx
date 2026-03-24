// import { createContext } from "react";

// export const AdminContext = createContext()

// const AdminContextProvider = (props) =>{
//     const [aToken, setAToken] = useState('');
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;


// const value = {
//   aToken, setAToken,
//   backendUrl,
// }



//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider


import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const [doctors, setDoctors] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState([])
const [latestAppointments, setLatestAppointments] = useState([]);



  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/admin/all-doctors',
        { headers: { Authorization: `Bearer ${aToken}` } }

      );
      console.log("Auth header:", `Bearer ${aToken}`);

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }


  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { Authorization: `Bearer ${aToken}` } })
      if (data.success) {
        toast.success(data.message)
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }



  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
      return data?.users || [];
    } catch (error) {
      toast.error("Failed to fetch users");
      return [];
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
      return data;
    } catch (error) {
      toast.error("Delete failed");
      return { success: false };
    }
  };




  const getUserCount = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/stats/users`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      return data?.count || 0;
    } catch (error) {
      toast.error("Failed to fetch user count");
      return 0;
    }
  };

  const getDoctorCount = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/stats/doctors`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      return data?.count || 0;
    } catch (error) {
      toast.error("Failed to fetch doctor count");
      return 0;
    }
  };

  const getAppointmentsCount = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/stats/appointments`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      return data?.count || 0;
    } catch (error) {
      toast.error("Failed to fetch appointments count");
      return 0;
    }
  };


  // const getAllUsersWithAppointments = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/admin/all-users-with-appointments`, {
  //       headers: { Authorization: `Bearer ${aToken}` }
  //     });
  //     return data?.users || [];
  //   } catch (error) {
  //     toast.error("Failed to fetch users with appointment counts");
  //     return [];
  //   }
  // };

  // const getAllAppointments = async () => {
  //     try {
  //         const { data } = await axios.get(
  //             backendUrl + "/api/admin/appointment-list",
  //             {  headers: { Authorization: `Bearer ${aToken}` }, } 
  //         );
  //        if (data.success) {
  //         setAppointments(data.appointments)
  //         console.log(data.appointments)
  //         console.log(data)
  //        } else{
  //         toast.error(data.message)
  //        }

  //     } catch (error) {
  //         console.error(error);
  //          toast.error(error.message);
  //     }
  // };


  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointment-list`,
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching appointments");
    }
  };



  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, {
        headers: { Authorization: `Bearer ${aToken}` },
      });if (data.success) {
        toast.success(data.message)
        getAllAppointments()
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  };


const getLatestAppointments = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/latest-appointments`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    if (data.success) {
      setLatestAppointments(data.appointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error fetching latest appointments");
  }
};


const getCancelledAppointmentsCount = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/stats/cancelled-appointments`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    return data?.count || 0;
  } catch (error) {
    toast.error("Failed to fetch cancelled appointments count");
    return 0;
  }
};

  const getAppointmentAnalytics = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/analytics/appointments`, {
        headers: { Authorization: `Bearer ${aToken}` },
      })
      if (data.success) return data
      toast.error(data.message || 'Failed to fetch analytics')
      return { daily: [], weekly: [], monthly: [] }
    } catch (error) {
      toast.error(error.message)
      return { daily: [], weekly: [], monthly: [] }
    }
  }


  // ✅ NEW FUNCTION TO DELETE A DOCTOR
    const deleteDoctor = async (doctorId) => {
        try {
            const { data } = await axios.delete(
                `${backendUrl}/api/admin/delete-doctor/${doctorId}`,
                { headers: { Authorization: `Bearer ${aToken}` } }
            );

            if (data.success) {
                toast.success(data.message);
                await getAllDoctors(); // Re-fetch doctors list to update the UI
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete doctor");
        }
    };


  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors, setDoctors,
    getAllDoctors, changeAvailability,
    deleteUser,
    getAllUsers,
    getDoctorCount,
    getUserCount,
    getAppointmentsCount,
    getAllAppointments,
    appointments, setAppointments,
   cancelAppointment,
   getLatestAppointments,
   latestAppointments,
   setLatestAppointments,
   getCancelledAppointmentsCount,
   getAppointmentAnalytics,
   deleteDoctor,
   // Notifications (Admin)
   async getNotificationRecipients(type){
     try {
       const { data } = await axios.get(`${backendUrl}/api/admin/notification/recipients`, { params: { type }, headers: { Authorization: `Bearer ${aToken}` } })
       if (data.success) return data.recipients
       toast.error(data.message || 'Failed to fetch recipients')
       return []
     } catch (error) {
       toast.error(error.message)
       return []
     }
   },
   async sendAdminNotification({ recipientType, recipientIds, message }){
     try {
       const { data } = await axios.post(`${backendUrl}/api/admin/notification/send`, { recipientType, recipientIds, message }, { headers: { Authorization: `Bearer ${aToken}` } })
       if (data.success) {
         toast.success('Notification sent')
         return true
       }
       toast.error(data.message || 'Failed to send notification')
       return false
     } catch (error) {
       toast.error(error.message)
       return false
     }
   },
   async getAdminNotificationHistory(){
     try {
       const { data } = await axios.get(`${backendUrl}/api/admin/notification/history`, { headers: { Authorization: `Bearer ${aToken}` } })
       if (data.success) return data.notifications
       toast.error(data.message || 'Failed to fetch history')
       return []
     } catch (error) {
       toast.error(error.message)
       return []
     }
   }

  };


  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
