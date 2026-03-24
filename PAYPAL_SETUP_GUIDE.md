# PayPal Payment Integration Setup Guide

## Overview
This guide will help you set up PayPal payment integration for your medical appointment booking system.

## Prerequisites
1. PayPal Developer Account (sandbox for testing, live for production)
2. PayPal Client ID and Client Secret

## Setup Steps

### 1. PayPal Developer Account Setup
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Login with your PayPal account
3. Create a new app:
   - Choose "Default Application" 
   - Select "Sandbox" for testing or "Live" for production
   - Copy your Client ID and Client Secret

### 2. Environment Configuration

#### Frontend (.env)
```
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id-here
VITE_BACKEND_URL=http://localhost:4000
```

#### Backend (.env)
```
PAYPAL_CLIENT_ID=your-paypal-client-id-here
PAYPAL_CLIENT_SECRET=your-paypal-client-secret-here
PAYPAL_MODE=sandbox
FRONTEND_URL=http://localhost:5173
```

### 3. Test with Sandbox
For testing, use PayPal's sandbox environment:
- Use sandbox Client ID and Secret
- Test with sandbox PayPal accounts
- Sandbox URL: `https://api.sandbox.paypal.com`

### 4. Production Setup
When ready for production:
- Use live Client ID and Secret
- Change PayPal URLs from sandbox to live
- Production URL: `https://api.paypal.com`

## Features Implemented
- ✅ PayPal button integration in MyAppointments page
- ✅ Secure payment processing with PayPal SDK
- ✅ Payment verification on backend
- ✅ Appointment status update after successful payment
- ✅ Payment details storage in database
- ✅ Responsive UI for both mobile and desktop

## How It Works
1. User clicks "Pay with PayPal" button on appointment
2. PayPal payment interface loads
3. User completes payment through PayPal
4. Backend verifies payment with PayPal API
5. Appointment status updated to "paid"
6. User sees payment confirmation

## Security Features
- Payment verification through PayPal API
- User authentication required
- Appointment ownership verification
- Secure token-based API communication
- Payment details encrypted storage

## Testing
1. Start the backend server
2. Start the frontend development server
3. Create an appointment
4. Use PayPal sandbox credentials to test payment
5. Verify payment status updates correctly

## Troubleshooting
- Ensure environment variables are set correctly
- Check PayPal credentials are for the correct environment (sandbox/live)
- Verify network connectivity for PayPal API calls
- Check browser console for any JavaScript errors
- Monitor backend logs for API errors

## Support
For issues with PayPal integration, check:
1. PayPal Developer Documentation
2. Application logs
3. Network requests in browser developer tools