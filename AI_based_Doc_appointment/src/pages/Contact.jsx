// import React from 'react'
// import { assets } from '../assets/assets'

// const Contact = () => {

  


//   return (
//     <div>
//       <div className='text-center text-2xl pt-10 text-gray-500'>
//         <p>
//           CONTACT <span className='font-medium' style={{ color: '#037c6e ' }}>US</span>
//         </p>
//       </div>

//       <div className='flex my-10 flex-col justify-center md:flex-row gap-10 mb:28 text-sm'>
//         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
//         <div className='flex flex-col justify-center items-start gap-6'>
//           <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
//           <p className='text-gray-500'>
//             416520 kudal , Sindhudurg ,<br/> Maharashtra
//           </p>
//           <p className='text-gray-500'>Tel : (415) 555-0132</p>
//           <p className='font-semibold text-lg text-gray-600'>Careers at MEDISYNC AI</p>
//           <p className='text-gray-500'>Learn more about our team and job openings.</p>
//           <button className='border boerder-black px-8 py-4 text-sm hover:bg-[#037c6e] hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact







import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-20 py-10 bg-gray-50">
      {/* Heading */}
      <h2 className="text-center text-3xl font-semibold text-gray-600">
        CONTACT <span className="text-[#037c6e]">US</span>
      </h2>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-12 mt-12 items-center md:items-start">
        {/* Image */}
        <img
          loading="lazy"
          className="w-full md:max-w-[400px] rounded-lg shadow-md object-cover"
          src={assets.contact_image}
          alt="Contact our team"
        />

        {/* Info Section */}
        <div className="flex flex-col gap-6 text-gray-600 w-full md:max-w-[500px]">
          {/* Office Info */}
          <div>
            <p className="text-xl font-bold mb-2">Our Office</p>
            <p className="text-gray-500 leading-relaxed">
              416520 Kudal, Sindhudurg,<br />Maharashtra
            </p>
            <p className="text-gray-500 mt-1">Tel : (415) 555-0132</p>
            <p className="text-gray-500 mt-1">Email : contact@medisync.ai</p>
          </div>

          {/* Careers Info */}
          <div>
            <p className="text-xl font-bold mb-2">Careers at MEDISYNC AI</p>
            <p className="text-gray-500 mb-4">
              Learn more about our team and job openings.
            </p>
            <button
              onClick={() => navigate('/careers')}
              aria-label="Explore job openings at MEDISYNC AI"
              className="bg-white border border-[#037c6e] text-[#037c6e] px-6 py-3 rounded hover:bg-[#037c6e] hover:text-white transition-all duration-300"
            >
              Explore Jobs
            </button>
          </div>

          {/* Contact Form (Optional) */}
          <div>
            <p className="text-xl font-bold mb-2">Send Us a Message</p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 border border-gray-300 rounded"
                required
              />
              <textarea
                placeholder="Your Message"
                className="px-4 py-2 border border-gray-300 rounded resize-none"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#037c6e] text-white px-6 py-2 rounded hover:bg-[#02655b] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
