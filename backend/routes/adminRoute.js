// import express from 'express'
// import { addDoctor } from '../controllers/adminController.js'
// import upload from '../middlewares/multer.js'

// const adminRouter = express.Router()

// adminRouter.post('/add-doctor', upload.single('image'), addDoctor)

// export default adminRouter


import express from 'express';
import { addDoctor, allDoctors, allUsers, deleteUser, loginAdmin , getTotalUsers, getTotalDoctors, getAppointmentsCount, appointmentsAdmin, appointmentCancel ,getLatestAppointments,getCancelledAppointmentsCount, getAppointmentAnalytics, deleteDoctor} from '../controllers/adminController.js';
import { getAdminRecipients, adminSendNotification, getAdminNotifications } from '../controllers/notificationController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
import authUser from '../middlewares/authUser.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-users', authAdmin , allUsers);
adminRouter.delete('/delete-user/:id', authAdmin, deleteUser);

adminRouter.get('/stats/users', authUser, getTotalUsers);
adminRouter.get('/stats/doctors', authUser, getTotalDoctors);
adminRouter.get("/stats/appointments",authAdmin,getAppointmentsCount);
// adminRouter.get("/all-users-with-appointments",authUser,allUsersWithAppointments)
adminRouter.get('/appointment-list',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get("/latest-appointments", authAdmin, getLatestAppointments);
adminRouter.get("/stats/cancelled-appointments", getCancelledAppointmentsCount);
adminRouter.get('/analytics/appointments', authAdmin, getAppointmentAnalytics)

// Notifications (Admin)
adminRouter.get('/notification/recipients', authAdmin, getAdminRecipients) // ?type=doctors|patients
adminRouter.post('/notification/send', authAdmin, adminSendNotification) // {recipientType:'doctor'|'user', recipientIds:[], message}
adminRouter.get('/notification/history', authAdmin, getAdminNotifications)
adminRouter.delete('/delete-doctor/:id', authAdmin, deleteDoctor)




export default adminRouter;
