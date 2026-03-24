import express from 'express'
import { registerUser,loginUser ,getProfile, updateProfile, bookAppointment, listAppointment ,cancelAppointment , forgotPassword, resetPassword, paypalPaymentSuccess, createPaypalOrder } from '../controllers/userController.js'
import { getUserInbox, markUserNotificationRead } from '../controllers/notificationController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
// Password reset
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser, updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
// PayPal payment routes
userRouter.post('/create-paypal-order',authUser,createPaypalOrder)
userRouter.post('/paypal-payment-success',authUser,paypalPaymentSuccess)
// userRouter.post('/payment-razorpay',authUser,paymentRazorpay)

// Notifications (User)
userRouter.get('/notification/inbox', authUser, getUserInbox)
userRouter.post('/notification/mark-read', authUser, markUserNotificationRead)




export default userRouter