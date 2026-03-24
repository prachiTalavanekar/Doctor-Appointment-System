import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import axios from 'axios';

const PayPalPayment = ({ 
  appointmentId, 
  amount, 
  currency = "USD",
  onSuccess,
  onError,
  backendUrl,
  token,
  doctorName = "Doctor"
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error

  // PayPal initial options
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: currency,
    intent: "capture",
    "disable-funding": "credit,card", // Only show PayPal payment option
  };
  
  // Check if PayPal Client ID is available
  if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 text-sm font-semibold">⚠️ PayPal Configuration Error</p>
        <p className="text-red-600 text-xs mt-1">PayPal Client ID not found. Please contact support.</p>
      </div>
    );
  }

  const createOrder = async (data, actions) => {
    try {
      setLoading(true);
      setPaymentStatus('processing');
      
      return actions.order.create({
        purchase_units: [
          {
            description: `Medical Appointment - ${doctorName}`,
            amount: {
              currency_code: currency,
              value: amount.toString(),
            },
            custom_id: appointmentId,
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW'
        }
      });
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast.error('Failed to create payment order');
      setPaymentStatus('error');
      setLoading(false);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      setLoading(true);
      
      const details = await actions.order.capture();
      
      // Send payment confirmation to backend with simplified data
      const response = await axios.post(
        `${backendUrl}/api/user/paypal-payment-success`,
        {
          appointmentId,
          paypalOrderId: data.orderID,
          paypalPaymentId: details.id,
          payerInfo: details.payer,
          amount: amount,
          currency: currency
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setPaymentStatus('success');
        toast.success('✅ Payment Successful! Appointment Confirmed!');
        if (onSuccess) {
          onSuccess(details);
        }
      } else {
        setPaymentStatus('error');
        toast.error('Payment verification failed: ' + response.data.message);
        if (onError) {
          onError(response.data.message);
        }
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      setPaymentStatus('error');
      
      let errorMessage = 'Payment failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const onErrorHandler = (err) => {
    console.error('PayPal error:', err);
    toast.error('Payment failed. Please try again.');
    setLoading(false);
    if (onError) {
      onError(err);
    }
  };

  // Test function to simulate payment success
  const testPaymentSuccess = async () => {
    try {
      setLoading(true);
      console.log('Testing payment flow...');
      
      const response = await axios.post(
        `${backendUrl}/api/user/paypal-payment-success`,
        {
          appointmentId,
          paypalOrderId: 'test-order-id-' + Date.now(),
          paypalPaymentId: 'test-payment-id-' + Date.now(),
          payerInfo: { email_address: 'test@test.com' },
          amount: amount,
          currency: currency
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('Test payment response:', response.data);

      if (response.data.success) {
        toast.success('Test payment successful!');
        if (onSuccess) {
          onSuccess({ id: 'test-payment' });
        }
      } else {
        toast.error('Test payment failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Test payment error:', error);
      toast.error('Test payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = (data) => {
    console.log('PayPal payment cancelled:', data);
    toast.info('Payment was cancelled.');
    setLoading(false);
  };

  return (
    <div className="paypal-payment-container">
      <PayPalScriptProvider options={initialOptions}>
        {/* Payment Header */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            💳 Secure Payment with PayPal
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Appointment with {doctorName}</p>
              <p className="text-2xl font-bold text-green-600">${amount} {currency}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">🔒</span>
                <span>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-semibold text-green-800">Payment Successful!</p>
                <p className="text-green-600 text-sm">Your appointment has been confirmed.</p>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-red-800">Payment Failed</p>
                <p className="text-red-600 text-sm">Please try again or contact support.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-6">
            <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing payment...
            </div>
          </div>
        )}
        
        {/* PayPal Buttons */}
        {paymentStatus !== 'success' && (
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
              height: 50
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onErrorHandler}
            onCancel={onCancel}
            disabled={loading || paymentStatus === 'processing'}
          />
        )}
        
        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Payments are secured by PayPal. Your payment information is encrypted and protected.
          </p>
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;