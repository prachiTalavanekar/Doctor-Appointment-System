import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ABOUT <span className="text-[#037c6e]">US</span>
          </h1>
          <div className="w-24 h-1 bg-[#037c6e] mx-auto rounded-full"></div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Revolutionizing healthcare access through seamless digital appointments
          </p>
        </div>

        {/* About Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-2/5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                src={assets.about_image}
                alt="About us"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#037c6e] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Our <span className="text-[#037c6e]">MEDISYNC AI</span> Platform
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Streamlines the process of booking medical appointments online. We aim to connect patients with trusted healthcare professionals quickly and efficiently.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The platform minimizes manual effort and ensures timely access to care, bridging the gap between patients and healthcare providers.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h3>
                <p className="text-gray-600">
                  With user-friendly features, patients can easily search, schedule, and manage appointments. The system also allows doctors to organize consultations and track patient visits. Automated notifications keep users updated, while secure data handling ensures privacy and reliability for all users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-[#037c6e]/10 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To revolutionize healthcare access through seamless digital appointments. We aim to empower patients with timely and convenient medical care. By fostering efficient doctor-patient interactions, we reduce delays and improve outcomes. We envision a future where healthcare is just a few clicks away for everyone.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-[#037c6e]/10 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, reliable, and efficient healthcare appointment services that bridge the gap between patients and healthcare providers. We strive to enhance the patient experience through innovative technology while maintaining the highest standards of data security and privacy.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            WHY <span className="text-[#037c6e]">CHOOSE US</span>
          </h2>
          <div className="w-24 h-1 bg-[#037c6e] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#037c6e]/10 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Efficiency</h3>
            <p className="text-gray-600">
              Streamlined appointment scheduling that fits into your busy lifestyle. Our intelligent system optimizes your time and reduces waiting periods.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#037c6e]/10 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Convenience</h3>
            <p className="text-gray-600">
              Access to a network of trusted healthcare professionals in your area. Book appointments anytime, anywhere with our mobile-friendly platform.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#037c6e]/10 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Personalization</h3>
            <p className="text-gray-600">
              Tailored recommendations and reminders to help you stay on top of your health. Our AI-powered system learns your preferences for better care.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#037c6e] to-[#048a7b] rounded-3xl p-8 md:p-12 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-gray-200">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
              <div className="text-gray-200">Expert Doctors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Support</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-200">Specialties</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;