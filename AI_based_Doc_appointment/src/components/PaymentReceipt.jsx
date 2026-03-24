import React from 'react';
import { toast } from 'react-toastify';

const PaymentReceipt = ({ appointment, onClose }) => {
  const downloadReceipt = () => {
    const receiptContent = `
MEDISYNC AI - PAYMENT RECEIPT
==============================

Appointment Details:
- Doctor: ${appointment.docData.name}
- Specialty: ${appointment.docData.speciality}
- Date: ${appointment.slotDate}
- Time: ${appointment.slotTime}

Payment Details:
- Amount: $${appointment.amount}
- Payment Method: ${appointment.paymentMethod}
- Transaction ID: ${appointment.paypalOrderId}
- Payment Date: ${new Date(appointment.paymentDetails?.paymentDate).toLocaleDateString()}

Patient Details:
- Name: ${appointment.userdata.name}
- Email: ${appointment.userdata.email}

Thank you for using MediSync AI!
    `;
    
    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${appointment._id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Receipt downloaded successfully!');
  };

  const emailReceipt = () => {
    toast.info('Receipt email feature coming soon!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Payment Receipt</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-center mb-4">
            <h4 className="font-bold text-green-600 text-lg">✅ Payment Successful!</h4>
            <p className="text-sm text-gray-600">Transaction completed</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-semibold">{appointment.docData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Appointment:</span>
              <span className="font-semibold">{appointment.slotDate} at {appointment.slotTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">${appointment.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">{appointment.paymentMethod}</span>
            </div>
            {appointment.paymentDetails?.paymentDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-semibold">
                  {new Date(appointment.paymentDetails.paymentDate).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold text-xs">{appointment.paypalOrderId}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={downloadReceipt}
            className="bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            📄 Download Receipt
          </button>
          <button 
            onClick={emailReceipt}
            className="bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            📧 Email Receipt
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Keep this receipt for your records. Contact support if you have any questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;