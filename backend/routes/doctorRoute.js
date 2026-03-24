import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, loginDoctor, doctorDashboard, doctorProfile, updateDoctorProfile, sendVideoCallInvite } from '../controllers/doctorController.js'
import { getDoctorRecipients, doctorSendNotification, getDoctorInbox, markDoctorNotificationRead, getDoctorSentNotifications } from '../controllers/notificationController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/doctor-appointment',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.put('/profile',authDoctor,updateDoctorProfile)

// Video call invite
doctorRouter.post('/video-call/invite', authDoctor, sendVideoCallInvite)

// Notifications (Doctor)
doctorRouter.get('/notification/recipients', authDoctor, getDoctorRecipients)
doctorRouter.post('/notification/send', authDoctor, doctorSendNotification)
doctorRouter.get('/notification/inbox', authDoctor, getDoctorInbox)
doctorRouter.post('/notification/mark-read', authDoctor, markDoctorNotificationRead)
doctorRouter.get('/notification/sent', authDoctor, getDoctorSentNotifications)

export default doctorRouter