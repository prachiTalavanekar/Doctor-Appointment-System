import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)


  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          console.log(data.token)
        } else{
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          console.log(data.token)
        } else{
          toast.error(data.message)
        }

      }
    } catch (error) {
      // error handling code might be here
      console.error("Login error:", error);
    }

  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-[#037c6e] to-[#048a7b] px-8 py-6 text-center'>
            <h2 className='text-2xl font-bold text-white'>
              {state} Portal
            </h2>
            <p className='text-white/90 text-sm mt-1'>
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form Section */}
          <div className='px-8 py-8 space-y-6'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Email Address
              </label>
              <div className='relative'>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="password" 
                  placeholder="Enter your password"
                  required 
                />
              </div>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-[#037c6e] to-[#048a7b] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#026157] hover:to-[#037c6e] transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>

            {/* Toggle Section */}
            <div className='text-center pt-4 border-t border-gray-200'>
              <p className='text-gray-600 text-sm'>
                {state === 'Admin' 
                  ? "Are you a Doctor? " 
                  : "Are you an Admin? "
                }
                <span 
                  className="text-[#037c6e] font-semibold hover:text-[#026157] transition-colors duration-200 hover:underline cursor-pointer"
                  onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
                >
                  Switch to {state === 'Admin' ? 'Doctor' : 'Admin'} Login
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-gray-500 text-xs'>
            Secure access to medical administration system
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login