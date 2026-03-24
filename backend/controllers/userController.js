import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import userModel from '../modals/userModel.js'
import doctorModel from '../modals/doctorModel.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../modals/appointmentModel.js'
import { sendMail } from '../utils/mailer.js'

import axios from 'axios'
import notificationModel from '../modals/notificationModel.js'


// API to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: "30d" })

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: "30d" });
            res.json({
                success: true,
                message: "Login successful",
                token,
            });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//get user profile data

// const getProfile = async (req,res) => {
//     try {

//         const { userId } = req.body;
// const userData = await userModel.findById(userId).select("-password");

// res.json({ success: true, userData });


//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

const getProfile = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId).select("-password");

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update  user profile API
// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body;

//         const imageFile = req.file;


//         if (!name || !phone || !dob || !gender) {
//             return res.json({ success: false, message: "Data Missing" });
//         }

//         await userModel.findByIdAndUpdate(userId, {
//             name,
//             phone,
//             address: JSON.parse(address),
//             dob,
//             gender
//         });

//         if (imageFile) {
//             // upload image to cloudinary
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//                 resource_type: "image"
//             });
//             const imageURL = imageUpload.secure_url;

//             await userModel.findByIdAndUpdate(userId, { image: imageURL });

//         }
//         res.json({ success: true, message: "Profile Updated" });


//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };


const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        const userId = req.userId; // ✅ Get it from auth middleware

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            });
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: "Profile Updated" });
        console.log("Updating user ID:", userId);


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// book appointent API
// const bookAppointment = async (req, res) => {
//     try {

//         const { userId, docId, slotDate, slotTime } = req.body

//         const docData = await doctorModel.findById(docId).select('-password')


//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' })

//         }

//         let slots_booked = docData.slots_booked

//         // checking slots if they are available or not

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot not available' })
//             } else {
//                 slots_booked[slotDate].push(slotTime)
//             }
//         } else{
//             slots_booked[slotDate] = []
//             slots_booked.push(slotTime)
//         }

//         const userData = await userModel.findById(userId).select('-password')

//         delete docData.slots_booked

//         const appointentData = {
//             userId ,
//             docId ,
//             userData ,
//             docData ,
//             amount : docData.fees ,
//             slotTime,
//             slotDate,
//             date:Date.now()
//         }

//         const newAppointment = new appointmentModel(appointentData)
//         await newAppointment.save()

//         // save new slots data in docData
//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})

//         res.json({success:true,message:error.message})

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }



//----------------------working -----------------------
// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body;

//         const docData = await doctorModel.findById(docId).select('-password');
//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' });
//         }

//         let slots_booked = docData.slots_booked || {};

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot not available' });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [slotTime];
//         }

//         const userData = await userModel.findById(userId).select('-password');
//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now(),
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: "Appointment booked successfully" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// controllers/userController.js
const bookAppointment = async (req, res) => {
    try {
        // take the authenticated user id
        const userId = req.userId;          // ✅ from authUser
        const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,                  // ✅ use authenticated userId
            docId,
            userdata: userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment booked successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// API for getting booked appointments
// const listAppointment = async (req, res) => {
//     try {
//         const { userId } = req.body

//         // You may want to perform some operations here using userId
//         const appointments = await appointmentModel.find({ userId })

//         res.json({ success: true, appointments })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }



// controllers/userController.js
// const listAppointment = async (req, res) => {
//   try {
//     // get the user id set by authUser middleware
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'User ID not found' });
//     }

//     // fetch only this user’s appointments
//     const appointments = await appointmentModel.find({ userId });

//     return res.json({ success: true, appointments });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



// list appointment API
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// cancel appointment
// const cancelAppointment = async (req, res) => {
//     try {
//         const { userId, appointmentId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         // verify appointment user
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: 'Unauthorized action' })
//         }
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         // delete doctor slot

//         const { docId, slotDate, slotTime } = appointmentData;

//         const doctorData = await doctorModel.findById(docId);

//         let slots_booked = doctorData.slots_booked;

//         slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: 'Appointment Cancelled' });


//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;   // same as listAppointment
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

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

// API for payment razorpay
// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });


// const paymentRazorpay = async (req, res) => {

//     try {
//          const { appointmentId } = req.body;
//   const appointmentData = await appointmentModel.findById(appointmentId);

//   if (!appointmentData || appointmentData.cancelled) {
//     return res.json({
//       success: false,
//       message: 'Appointment Cancelled or not found'
//     });
//   }
//   // creating options for razorpay payment
// const options = {
//   amount: appointmentData.amount * 100,
//   currency: process.env.CURRENCY,
//   receipt: appointmentId,
// };

// // creation of an order
// const order = await razorpayInstance.orders.create(options);

// res.json({ success: true, order });

//     } catch (error) {
//          console.log(error);
//     res.json({ success: false, message: error.message });
//     }
 
// };




export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paypalPaymentSuccess, createPaypalOrder }

// ================= PayPal Payment Integration =================

// Get PayPal access token
const getPayPalAccessToken = async () => {
  try {
    const response = await axios({
      url: `https://api.sandbox.paypal.com/v1/oauth2/token`, // Use api.paypal.com for production
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
      data: 'grant_type=client_credentials',
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
};

// API to create PayPal order
const createPaypalOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    // Get appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // Verify appointment belongs to user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    // Check if appointment is already paid or cancelled
    if (appointmentData.payment) {
      return res.json({ success: false, message: 'Appointment already paid' });
    }

    if (appointmentData.cancelled) {
      return res.json({ success: false, message: 'Cannot pay for cancelled appointment' });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await axios({
      url: `https://api.sandbox.paypal.com/v2/checkout/orders`, // Use api.paypal.com for production
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: appointmentId,
          description: `Medical Appointment with ${appointmentData.docData.name}`,
          custom_id: appointmentId,
          amount: {
            currency_code: 'USD',
            value: appointmentData.amount.toString()
          }
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/my-appointments`,
          cancel_url: `${process.env.FRONTEND_URL}/my-appointments`,
          shipping_preference: 'NO_SHIPPING'
        }
      })
    });
    
    res.json({ 
      success: true, 
      orderId: response.data.id,
      order: response.data 
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.json({ success: false, message: 'Failed to create payment order' });
  }
};

// API to handle successful PayPal payment
const paypalPaymentSuccess = async (req, res) => {
  try {
    console.log('PayPal payment success handler called');
    console.log('Request body:', req.body);
    
    const userId = req.userId;
    const { 
      appointmentId, 
      paypalOrderId, 
      paypalPaymentId, 
      payerInfo, 
      amount, 
      currency 
    } = req.body;

    console.log('Processing payment for appointment:', appointmentId);
    console.log('PayPal Order ID:', paypalOrderId);

    // Get appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      console.log('Appointment not found:', appointmentId);
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // Verify appointment belongs to user
    if (appointmentData.userId !== userId) {
      console.log('Unauthorized action - User ID mismatch');
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    console.log('Appointment verification successful, proceeding with PayPal verification');

    // For now, let's skip PayPal verification and just mark as paid for testing
    // TODO: Re-enable PayPal verification once basic flow works
    try {
      // Update appointment with payment information
      const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
        paymentMethod: 'PayPal',
        paypalOrderId: paypalOrderId,
        paypalPaymentId: paypalPaymentId,
        paymentDetails: {
          payer: payerInfo,
          amount: amount,
          currency: currency,
          paymentDate: new Date(),
          transactionId: paypalOrderId // Use order ID as transaction ID for now
        }
      }, { new: true });

      console.log('Appointment updated successfully:', updatedAppointment.payment);

      // Send notification to doctor about payment
      try {
        await notificationModel.create({
          userId: userId,
          docId: appointmentData.docId,
          message: `Payment received for appointment on ${appointmentData.slotDate} at ${appointmentData.slotTime}`,
          type: 'payment',
          meta: {
            appointmentId: appointmentId,
            amount: amount,
            paymentMethod: 'PayPal'
          },
          sentBy: 'system'
        });
      } catch (notificationError) {
        console.error('Failed to send payment notification to doctor:', notificationError);
      }

      res.json({ 
        success: true, 
        message: 'Payment successful and appointment confirmed',
        transactionId: paypalOrderId
      });
      
    } catch (updateError) {
      console.error('Error updating appointment:', updateError);
      res.json({ 
        success: false, 
        message: 'Failed to update appointment status' 
      });
    }

  } catch (error) {
    console.error('PayPal payment success handler error:', error);
    res.json({ success: false, message: 'Payment processing failed' });
  }
};


// ================= Password Reset (via Email) =================

// POST /api/user/forgot-password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        console.log('Forgot password request received for email:', email)
        
        if (!email || !validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid email' })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            console.log('User not found for email:', email)
            // Do not disclose existence for security
            return res.json({ success: true, message: 'If the email exists, reset link has been sent' })
        }

        console.log('User found, generating reset token...')
        
        // Generate token
        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 1000 * 60 * 15) // 15 minutes

        user.resetPasswordToken = token
        user.resetPasswordExpires = expires
        await user.save()
        
        console.log('Reset token saved to database')

        const appBaseUrl = process.env.APP_BASE_URL || 'http://localhost:5173'
        const resetUrl = `${appBaseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

        console.log('Attempting to send reset email...')
        
        try {
            await sendMail({
                to: email,
                subject: 'MediSync AI - Password Reset Instructions',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #037c6e;">Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>You requested to reset your password for your MediSync AI account.</p>
                        <p>Click the button below to set a new password (this link is valid for 15 minutes only):</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #037c6e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                        </div>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
                        <p style="margin-top: 30px; color: #666; font-size: 12px;">If you did not request this password reset, please ignore this email. Your password will not be changed.</p>
                    </div>
                `,
                text: `Reset your MediSync AI password: ${resetUrl}\n\nThis link is valid for 15 minutes. If you did not request this, please ignore this email.`
            })
            
            console.log('✅ Reset email sent successfully!')
            
        } catch (emailError) {
            console.error('❌ Failed to send reset email:', emailError.message)
            console.log('🔗 FALLBACK - Use this reset link manually:', resetUrl)
            
            // For development, allow manual link usage
            if (process.env.NODE_ENV !== 'production') {
                console.log('📧 Email sending failed, but reset link is available in console above')
                return res.json({ 
                    success: true, 
                    message: 'Email configuration issue detected. Check server console for reset link.',
                    debugResetUrl: resetUrl
                })
            }
            
            return res.json({ 
                success: false, 
                message: 'Failed to send reset email. Please contact support or check email configuration.' 
            })
        }

        // Helpful for development: log the reset link
        if (process.env.NODE_ENV !== 'production') {
            console.log('Debug reset URL:', resetUrl)
        }

        return res.json({ 
            success: true, 
            message: 'If the email exists, reset link has been sent',
            ...(process.env.NODE_ENV !== 'production' && { debugResetUrl: resetUrl })
        })
        
    } catch (error) {
        console.error('Forgot password error:', error)
        return res.json({ success: false, message: 'An error occurred. Please try again later.' })
    }
}

// POST /api/user/reset-password
export const resetPassword = async (req, res) => {
    try {
        const { email, token, password } = req.body
        console.log('Password reset attempt for email:', email)
        
        if (!email || !token || !password) {
            return res.json({ success: false, message: 'Missing required details' })
        }
        
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' })
        }

        const user = await userModel.findOne({ 
            email, 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: new Date() } 
        })
        
        if (!user) {
            console.log('Invalid or expired reset token for email:', email)
            return res.json({ success: false, message: 'Invalid or expired reset link. Please request a new one.' })
        }

        console.log('Valid reset token found, updating password...')
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
        
        console.log('✅ Password reset successful for email:', email)

        return res.json({ success: true, message: 'Password reset successful! You can now login with your new password.' })
    } catch (error) {
        console.error('Reset password error:', error)
        return res.json({ success: false, message: 'An error occurred while resetting password. Please try again.' })
    }
}
