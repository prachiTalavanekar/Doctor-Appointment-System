import { sendMail } from './utils/mailer.js'
import dotenv from 'dotenv'

dotenv.config()

async function testEmailConfig() {
    try {
        console.log('🔍 Testing email configuration...')
        
        await sendMail({
            to: 'prachitalavanekar29@gmail.com',
            subject: 'MediSync AI - Email Test',
            html: '<h3>Email Configuration Test</h3><p>If you receive this email, the password reset functionality should work!</p>',
            text: 'Email Configuration Test - If you receive this email, the password reset functionality should work!'
        })
        
        console.log('✅ Email test completed successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Email test failed:', error.message)
        process.exit(1)
    }
}

testEmailConfig()