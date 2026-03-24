import doctorModel from '../modals/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../modals/appointmentModel.js'
import notificationModel from '../modals/notificationModel.js'


const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

    res.json({ success: true, message: 'Availability Changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password -email');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
};


// login API
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body
    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, doctor.password)

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET,{ expiresIn: "30d" })
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



// const loginDoctor = async (req, res) => {
//   try {
//     console.log('loginDoctor called. body:', req.body)
//     const { email, password } = req.body || {}

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email and password required' })
//     }

//     const doctor = await doctorModel.findOne({ email })
//     if (!doctor) {
//       console.log('No doctor found with email:', email)
//       return res.status(401).json({ success: false, message: 'Invalid credentials' })
//     }

//     if (!doctor.password) {
//       console.log('Doctor has no password field:', doctor._id)
//       return res.status(500).json({ success: false, message: 'Server data error' })
//     }

//     const isMatch = await bcrypt.compare(password, doctor.password)
//     if (!isMatch) {
//       console.log('Password mismatch for:', email)
//       return res.status(401).json({ success: false, message: 'Invalid credentials' })
//     }

//     if (!process.env.JWT_SECRET) {
//       console.error('JWT_SECRET not set in environment')
//       return res.status(500).json({ success: false, message: 'Server not configured' })
//     }

//     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
//     console.log('Login success for:', email)
//     return res.json({ success: true, token })
//   } catch (error) {
//     console.error('loginDoctor error:', error)
//     return res.status(500).json({ success: false, message: error.message })
//   }
// }



//doctor appointments
//  const appointmentsDoctor = async (req, res) => {
//   try {
//     const docId = req.docId; // from authDoctor middleware
//     const appointments = await appointmentModel.find({ docId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID not found." });
    }

    const appointments = await appointmentModel.find({ docId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("appointmentsDoctor error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// mark as a complete API
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId; // ✅ from token, not from body
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId?.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed: Unauthorized" });
    }

  } catch (error) {
    console.error("appointmentComplete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// mark as a incomplete API
const appointmentCancel = async (req, res) => {
  try {
   const docId = req.docId; // ✅ from token, not from body
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId?.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed: Unauthorized" });
    }

  } catch (error) {
    console.error("appointmentCancel error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const doctor = await doctorModel.findById(docId).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    
    res.json({ success: true, doctor });
  } catch (error) {
    console.error("doctorProfile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { name, speciality, degree, experience, about, fees, address, available } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (speciality) updateData.speciality = speciality;
    if (degree) updateData.degree = degree;
    if (experience) updateData.experience = experience;
    if (about) updateData.about = about;
    if (fees) updateData.fees = Number(fees);
    if (address) updateData.address = address;
    if (typeof available === 'boolean') updateData.available = available;
    
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId, 
      updateData, 
      { new: true }
    ).select('-password');
    
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    
    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      doctor: updatedDoctor 
    });
  } catch (error) {
    console.error("updateDoctorProfile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// dashboard api
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    
    // Get all appointments for this doctor
    const appointments = await appointmentModel.find({ docId });
    
    // Calculate dashboard statistics
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(app => app.isCompleted).length;
    const cancelledAppointments = appointments.filter(app => app.cancelled).length;
    const pendingAppointments = appointments.filter(app => !app.isCompleted && !app.cancelled).length;
    
    // Calculate paid appointments
    const paidAppointments = appointments.filter(app => app.payment).length;
    
    // Calculate earnings (from paid appointments, regardless of completion status)
    const totalEarnings = appointments
      .filter(app => app.payment)
      .reduce((sum, app) => sum + app.amount, 0);
    
    // Get today's appointments
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000;
    
    const todayAppointments = appointments.filter(app => {
      const appDate = new Date(app.slotDate).getTime();
      return appDate >= todayStart && appDate < todayEnd;
    });
    
    // Get recent appointments (last 5)
    const recentAppointments = appointments
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
    
    // Monthly appointment data for charts (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
      
      const monthAppointments = appointments.filter(app => {
        const appDate = new Date(app.slotDate).getTime();
        return appDate >= monthStart && appDate <= monthEnd;
      });
      
      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        appointments: monthAppointments.length,
        completed: monthAppointments.filter(app => app.isCompleted).length,
        cancelled: monthAppointments.filter(app => app.cancelled).length,
        earnings: monthAppointments
          .filter(app => app.payment)
          .reduce((sum, app) => sum + app.amount, 0)
      });
    }
    
    // Weekly appointment data for the current week
    const weeklyData = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      
      const dayAppointments = appointments.filter(app => {
        const appDate = new Date(app.slotDate).getTime();
        return appDate >= dayStart && appDate < dayEnd;
      });
      
      weeklyData.push({
        day: day.toLocaleDateString('en-US', { weekday: 'short' }),
        appointments: dayAppointments.length,
        completed: dayAppointments.filter(app => app.isCompleted).length
      });
    }
    
    res.json({
      success: true,
      dashboardData: {
        stats: {
          totalAppointments,
          completedAppointments,
          cancelledAppointments,
          pendingAppointments,
          paidAppointments,
          totalEarnings,
          todayAppointments: todayAppointments.length
        },
        recentAppointments,
        todayAppointments,
        monthlyData,
        weeklyData
      }
    });
    
  } catch (error) {
    console.error("doctorDashboard error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile };

// Send a video call invite to the patient for a specific appointment
export const sendVideoCallInvite = async (req, res) => {
  try {
    const docId = req.docId
    const { appointmentId, roomPath, roomUrl } = req.body

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: 'appointmentId is required' })
    }

    const appt = await appointmentModel.findById(appointmentId)
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' })
    if (String(appt.docId) !== String(docId)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' })
    }

    const meta = { appointmentId }
    if (roomPath) meta.roomPath = roomPath
    if (roomUrl) meta.roomUrl = roomUrl

    const notif = await notificationModel.create({
      docId,
      userId: appt.userId,
      message: 'Your doctor invited you to a video call',
      type: 'video_call',
      meta,
      sentBy: 'doctor'
    })

    return res.json({ success: true, notificationId: notif._id })
  } catch (error) {
    console.error('sendVideoCallInvite error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
