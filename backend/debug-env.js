import dotenv from 'dotenv'
dotenv.config()

console.log('=== Environment Variables Debug ===')
console.log('GMAIL_USER:', process.env.GMAIL_USER)
console.log('GMAIL_APP_PASSWORD:', JSON.stringify(process.env.GMAIL_APP_PASSWORD))
console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length)
console.log('MAIL_FROM:', process.env.MAIL_FROM)

// Check if there are any hidden characters
if (process.env.GMAIL_APP_PASSWORD) {
    const password = process.env.GMAIL_APP_PASSWORD
    console.log('Password bytes:', [...password].map(c => c.charCodeAt(0)))
    console.log('Password trimmed:', password.trim())
    console.log('Password trimmed length:', password.trim().length)
}