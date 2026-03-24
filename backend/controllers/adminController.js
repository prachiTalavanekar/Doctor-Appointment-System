// import validator from 'validator'
// import bcrypt from 'bcrypt'
// import {v2 as cloudinary} from 'cloudinary'
// import doctorModel from '../modals/doctorModel.js'


// // API for adding doctor
// const addDoctor = async (req,res) => {

// try {

// const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
// const imageFile = req.file

// console.log({ name,email,password,speciality,degree,experience,about,fees,address },imageFile)
// //checking for all data to add doctor
// if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
//     return res.json({success:false,message:"missing details"})
// }

// // validating email format
// if (!validator.isEmail(email)) {
//     return res.json({ success: false, message: "Please enter a valid email" })
// }

// // validating strong password
// if (password.length < 8) {
//     return res.json({ success: false, message: "Please enter a strong password" })
// }

// // hashing doctor password
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(password, salt)

// // upload image to cloudinary
// const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
// const imageUrl = imageUpload.secure_url

// const doctorData = {
//     name,
//     email,
//     image: imageUrl,
//     password: hashedPassword,
//     speciality,
//     degree,
//     experience,
//     about,
//     fees,
//     address: JSON.parse(address),
//     date: Date.now()
// }

// const newDoctor = new doctorModel(doctorData)
// await newDoctor.save()


// res.json({success:true,message:"doctor added"})



// }catch(error){
// console.log(error)
// res.json({success:false,message:error.message})
// }

// }

// export {addDoctor}


import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../modals/doctorModel.js';
import userModel from '../modals/userModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../modals/appointmentModel.js'
import mongoose from 'mongoose'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile);

        // Check required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing details" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address if it's a string
        let parsedAddress = address;
        if (typeof address === 'string') {
            parsedAddress = JSON.parse(address);
        }

        // Create doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        };
        console.log(doctorData)
        // Save doctor
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        console.log(newDoctor)

        res.json({ success: true, message: "Doctor added" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// API for Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // res.json({ success: true, message: "Login successful" });

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API for get all dooctors list for admin
const allDoctors = async (req,res) =>{
try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
} catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
}



// ✅ GET all users
const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ DELETE user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await userModel.findByIdAndDelete(userId);

    if (!deleted) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// ✅ Get total users count
const getTotalUsers = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get total doctors count
const getTotalDoctors = async (req, res) => {
  try {
    const count = await doctorModel.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


//count for total appointment API
const getAppointmentsCount = async (req, res) => {
  try {
    const count = await appointmentModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching appointments count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




// GET all users with their appointment counts
// const allUsersWithAppointments = async (req, res) => {
//   try {
//     const users = await userModel.find({}).select('-password');

//     // Get appointment counts for each user
//     const userAppointments = await appointmentModel.aggregate([
//       { $group: { _id: "$userId", totalAppointments: { $sum: 1 } } }
//     ]);

//     // Map user ID to appointment count
//     const appointmentCountMap = {};
//     userAppointments.forEach(item => {
//       appointmentCountMap[item._id.toString()] = item.totalAppointments;
//     });

//     // Attach appointment count to each user
//     const usersWithCount = users.map(user => {
//       return {
//         ...user._doc,
//         totalAppointments: appointmentCountMap[user._id.toString()] || 0
//       };
//     });

//     res.json({ success: true, users: usersWithCount });

//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// API for all appointments list
// const appointmentsAdmin = async (req, res) => {
//     try {
//         const appointments = await appointmentModel.find({}) ;
//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };


const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// cancel appointment
const appointmentCancel = async (req, res) => {
  try {
      // same as listAppointment
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // // verify appointment user
    // if (appointmentData.userId !== userId) {
    //   return res.json({ success: false, message: 'Unauthorized action' });
    // }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // delete doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Cancelled' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// admin dashboard
const adminDashboard = async (req, res) => {
    try {
        // your logic here

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ✅ Get latest appointments (limit 5)
const getLatestAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ createdAt: -1 }) // latest first
      .limit(5)
      .populate("docId", "name image")   // populate doctor info
      .populate("userId", "name image"); // populate patient info

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// ✅ Get total cancelled appointments count
const getCancelledAppointmentsCount = async (req, res) => {
  try {
    const count = await appointmentModel.countDocuments({ cancelled: true });
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error fetching cancelled appointments count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Real-time analytics for admin dashboard
const getAppointmentAnalytics = async (req, res) => {
  try {
    // Prepare boundaries
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    // Helper to parse slotDate string which can be 'YYYY-MM-DD' or 'DD-MM-YYYY'
    const toDate = (slotDate) => {
      if (!slotDate || typeof slotDate !== 'string') return null
      if (slotDate.includes('-')) {
        const parts = slotDate.split('-')
        if (parts[0].length === 4) {
          return new Date(slotDate)
        } else if (parts[2]?.length === 4) {
          return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
        }
      }
      const d = new Date(slotDate)
      return isNaN(d.getTime()) ? null : d
    }

    const all = await appointmentModel.find({}, 'slotDate cancelled').lean()

    // Daily: last 7 days including today — count unique users with appointments
    const daily = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date(startOfToday)
      day.setDate(day.getDate() - i)
      const dayStr = day.toISOString().slice(0,10)
      const users = new Set(all.filter(a => {
        const d = toDate(a.slotDate)
        if (!d) return false
        const s = d.toISOString().slice(0,10)
        return !a.cancelled && s === dayStr
      }).map(x => x.userId))
      daily.push({ label: day.toLocaleDateString('en-US',{ weekday:'short'}), value: users.size, date: dayStr })
    }

    // Weekly: last 4 weeks — count unique users per week
    const weekly = []
    const endOfThisWeek = new Date(startOfToday)
    // align to end of week (Saturday) by adding (6 - dayOfWeek)
    const dayOfWeek = endOfThisWeek.getDay()
    endOfThisWeek.setDate(endOfThisWeek.getDate() + (6 - dayOfWeek))
    for (let w = 3; w >= 0; w--) {
      const weekEnd = new Date(endOfThisWeek)
      weekEnd.setDate(weekEnd.getDate() - 7 * (3 - w))
      const weekStart = new Date(weekEnd)
      weekStart.setDate(weekEnd.getDate() - 6)
      const users = new Set(all.filter(a => {
        const d = toDate(a.slotDate)
        return d && !a.cancelled && d >= weekStart && d <= weekEnd
      }).map(x => x.userId))
      weekly.push({ label: `Week ${4 - w}`, value: users.size, period: `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}` })
    }

    // Monthly: last 6 months — count unique users per month
    const monthly = []
    const base = new Date(startOfToday)
    for (let m = 5; m >= 0; m--) {
      const dt = new Date(base)
      dt.setMonth(dt.getMonth() - m, 1)
      const start = new Date(dt.getFullYear(), dt.getMonth(), 1)
      const end = new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59, 999)
      const users = new Set(all.filter(a => {
        const d = toDate(a.slotDate)
        return d && !a.cancelled && d >= start && d <= end
      }).map(x => x.userId))
      monthly.push({ label: dt.toLocaleDateString('en-US',{ month:'short'}), value: users.size, month: `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}` })
    }

    res.json({ success: true, daily, weekly, monthly })
  } catch (error) {
    console.error('getAppointmentAnalytics error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}




// ✅ DELETE doctor by ID - NEW FUNCTION
const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;

        // Find and delete the doctor by ID
        const deletedDoctor = await doctorModel.findByIdAndDelete(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Optionally, you might want to handle related appointments, etc.
        // For now, we just delete the doctor record.

        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the doctor." });
    }
};




export { addDoctor, loginAdmin, allDoctors, allUsers, deleteUser , getTotalUsers, getTotalDoctors  ,getAppointmentsCount , appointmentsAdmin ,appointmentCancel, adminDashboard , getLatestAppointments ,getCancelledAppointmentsCount, getAppointmentAnalytics,deleteDoctor };


