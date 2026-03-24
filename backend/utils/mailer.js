import nodemailer from 'nodemailer'

// Gmail transporter using App Passwords
// Requires env: GMAIL_USER, GMAIL_APP_PASSWORD
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export async function sendMail({ to, subject, html, text }) {
    try {
        console.log('Attempting to send email to:', to)
        console.log('Gmail user:', process.env.GMAIL_USER)
        console.log('Gmail password length:', process.env.GMAIL_APP_PASSWORD?.length)
        
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            throw new Error('Gmail credentials not configured properly in .env file')
        }
        
        const from = process.env.MAIL_FROM || process.env.GMAIL_USER
        console.log('Sending from:', from)
        
        const result = await transporter.sendMail({ from, to, subject, html, text })
        console.log('✅ Email sent successfully! Message ID:', result.messageId)
        return result
    } catch (error) {
        console.error('❌ Email sending failed:', error.message)
        throw error
    }
}

export default transporter


