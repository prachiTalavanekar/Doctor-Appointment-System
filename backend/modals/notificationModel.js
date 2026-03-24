// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//     // Link to the appointment
//     appointmentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'appointment', // This links to your appointment model
//         required: true,
//     },
//     recipientId: {
//         type: String, // Matching your appointment schema's userId/docId
//         required: true,
//     },
//     recipientName: {
//         type: String,
//         required: true,
//     },
//     recipientRole: { // 'doctor' or 'patient'
//         type: String,
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     isRead: {
//         type: Boolean,
//         default: false,
//     },
// }, {
//     timestamps: true // Adds createdAt and updatedAt
// });

// const notificationModel = mongoose.models.notification || mongoose.model('Notification', notificationSchema);
// export default notificationModel;












import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["general", "video_call"],
    default: "general",
  },
  meta: {
    type: Object,
    default: null, // e.g. { appointmentId, roomUrl }
  },
  sentBy: {
    type: String,
    enum: ["admin", "doctor", "system"],
    default: "admin",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const notificationModel =
  mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default notificationModel;
