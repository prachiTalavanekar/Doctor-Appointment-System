import React from 'react';
import logo from '../assets/logo1.png'; // adjust path as needed

const Footer = () => {
  return (
    <footer className="bg-[#01302b] text-white py-10 mt-16 mb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="MediSync AI" className="h-10 mb-4" />
          <p className="text-sm text-gray-400">
            MediSync AI helps you access trusted doctors, symptoms analysis, and nearby clinics using smart AI technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Doctors</a></li>
            <li><a href="#" className="hover:text-white">Symptom Checker</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📧 support@medisync.ai<br />
            📍 Kudal, India<br />
            📞 +91 98765 43210
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediSync AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
