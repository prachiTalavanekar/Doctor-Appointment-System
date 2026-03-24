import notificationModel from '../modals/notificationModel.js'
import appointmentModel from '../modals/appointmentModel.js'
import userModel from '../modals/userModel.js'
import doctorModel from '../modals/doctorModel.js'

// Admin: get recipients from appointments (unique doctors or users)
export const getAdminRecipients = async (req, res) => {
  try {
    const { type } = req.query // 'doctors' | 'patients'
    if (!type || !['doctors', 'patients'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type' })
    }

    if (type === 'doctors') {
      const docs = await appointmentModel.distinct('docId')
      const doctors = await doctorModel.find({ _id: { $in: docs } }).select('name email image')
      return res.json({ success: true, recipients: doctors.map(d => ({ _id: d._id, name: d.name, email: d.email, image: d.image })) })
    } else {
      const usersIds = await appointmentModel.distinct('userId')
      const users = await userModel.find({ _id: { $in: usersIds } }).select('name email image')
      return res.json({ success: true, recipients: users.map(u => ({ _id: u._id, name: u.name, email: u.email, image: u.image })) })
    }
  } catch (error) {
    console.error('getAdminRecipients error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: send notifications to selected doctors or patients
export const adminSendNotification = async (req, res) => {
  try {
    const { recipientType, recipientIds, message } = req.body // recipientType: 'doctor' | 'user'
    if (!recipientType || !['doctor', 'user'].includes(recipientType) || !Array.isArray(recipientIds) || recipientIds.length === 0 || !message) {
      return res.status(400).json({ success: false, message: 'Invalid payload' })
    }

    const notifications = recipientIds.map(id => ({
      docId: recipientType === 'doctor' ? id : undefined,
      userId: recipientType === 'user' ? id : undefined,
      message,
      sentBy: 'admin',
    }))

    const inserted = await notificationModel.insertMany(notifications)
    res.json({ success: true, count: inserted.length })
  } catch (error) {
    console.error('adminSendNotification error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin: list notifications sent by admin with read status
export const getAdminNotifications = async (_req, res) => {
  try {
    const items = await notificationModel
      .find({ sentBy: 'admin' })
      .sort({ timestamp: -1 })
      .populate('docId', 'name email')
      .populate('userId', 'name email')
    res.json({ success: true, notifications: items })
  } catch (error) {
    console.error('getAdminNotifications error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Doctor: recipients (patients who booked with him)
export const getDoctorRecipients = async (req, res) => {
  try {
    const docId = req.docId
    const userIds = await appointmentModel.distinct('userId', { docId })
    const users = await userModel.find({ _id: { $in: userIds } }).select('name email image')
    res.json({ success: true, recipients: users.map(u => ({ _id: u._id, name: u.name, email: u.email, image: u.image })) })
  } catch (error) {
    console.error('getDoctorRecipients error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Doctor: send notification to selected patients
export const doctorSendNotification = async (req, res) => {
  try {
    const docId = req.docId
    const { userIds, message } = req.body
    if (!Array.isArray(userIds) || userIds.length === 0 || !message) {
      return res.status(400).json({ success: false, message: 'Invalid payload' })
    }

    const notifications = userIds.map(uid => ({ docId, userId: uid, message, sentBy: 'doctor' }))
    const inserted = await notificationModel.insertMany(notifications)
    res.json({ success: true, count: inserted.length })
  } catch (error) {
    console.error('doctorSendNotification error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Doctor: inbox (notifications addressed to this doctor)
export const getDoctorInbox = async (req, res) => {
  try {
    const docId = req.docId
    const items = await notificationModel
      // Show only notifications addressed to the doctor (e.g. from admin/system),
      // not the ones the doctor sent to patients
      .find({ docId, sentBy: { $ne: 'doctor' } })
      .sort({ timestamp: -1 })
      .populate('userId', 'name email')
    res.json({ success: true, notifications: items })
  } catch (error) {
    console.error('getDoctorInbox error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Doctor: mark read
export const markDoctorNotificationRead = async (req, res) => {
  try {
    const docId = req.docId
    const { notificationId } = req.body
    const notif = await notificationModel.findById(notificationId)
    if (!notif || String(notif.docId) !== String(docId)) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    if (!notif.isRead) {
      notif.isRead = true
      await notif.save()
    }
    res.json({ success: true })
  } catch (error) {
    console.error('markDoctorNotificationRead error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Doctor: sent notifications (messages the doctor sent to patients)
export const getDoctorSentNotifications = async (req, res) => {
  try {
    const docId = req.docId
    const items = await notificationModel
      .find({ docId, sentBy: 'doctor' })
      .sort({ timestamp: -1 })
      .populate('userId', 'name email image')
    res.json({ success: true, notifications: items })
  } catch (error) {
    console.error('getDoctorSentNotifications error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// User: inbox (notifications addressed to this user)
export const getUserInbox = async (req, res) => {
  try {
    const userId = req.userId
    const items = await notificationModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .populate('docId', 'name email')
    res.json({ success: true, notifications: items })
  } catch (error) {
    console.error('getUserInbox error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// User: mark read
export const markUserNotificationRead = async (req, res) => {
  try {
    const userId = req.userId
    const { notificationId } = req.body
    const notif = await notificationModel.findById(notificationId)
    if (!notif || String(notif.userId) !== String(userId)) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    if (!notif.isRead) {
      notif.isRead = true
      await notif.save()
    }
    res.json({ success: true })
  } catch (error) {
    console.error('markUserNotificationRead error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}



