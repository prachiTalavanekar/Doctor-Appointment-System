import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: 'How do I book an appointment with a doctor?',
    answer:
      'Simply click the "Book Appointment" button, choose a doctor, select your preferred time slot, and confirm your booking.',
  },
  {
    question: 'Can I cancel or reschedule my appointment?',
    answer:
      'Yes, you can easily cancel or reschedule your appointment from your account dashboard under "My Appointments".',
  },
  {
    question: 'Is the AI Medical Assistant reliable?',
    answer:
      'Our AI assistant provides accurate responses based on trained medical data, but it does not replace a certified doctor\'s advice.',
  },
  {
    question: 'Will I get reminders for my appointments?',
    answer:
      'Yes, our system will send you timely reminders through notifications and email before your appointment.',
  },
  {
    question: 'Are online consultations available?',
    answer:
      'Yes, many of our doctors offer secure video consultations. You can choose the consultation mode during booking.',
  },
  {
    question: 'Is my medical information secure?',
    answer:
      'Absolutely. We follow strict privacy protocols and use encryption to ensure all your health data remains confidential and secure.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div id="faq" className="flex flex-col items-center gap-6 py-12 text-gray-800 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-3xl px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#037c6e]/10 rounded-full mb-4">
          <FaQuestionCircle className="text-[#037c6e] text-2xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Frequently Asked <span className="text-[#037c6e]">Questions</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Get answers to common queries about booking appointments, using our features, and more.
        </p>
      </div>

      <div className="w-full max-w-4xl px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                  ? 'shadow-lg border-[#037c6e]/30' 
                  : 'hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-gray-800 font-medium pr-4">{faq.question}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-300 flex-shrink-0 ${
                    activeIndex === index 
                      ? 'rotate-180 text-[#037c6e]' 
                      : 'text-gray-400'
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <button 
          onClick={handleContactSupport}
          className="px-6 py-3 bg-[#037c6e] text-white rounded-xl hover:bg-[#02665d] transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;