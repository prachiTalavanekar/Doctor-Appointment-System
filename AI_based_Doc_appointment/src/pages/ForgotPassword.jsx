import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log('POST', backendUrl + '/api/user/forgot-password', { email })
      const { data } = await axios.post(backendUrl + '/api/user/forgot-password', { email })
      if (data.success) toast.success(data.message)
      else toast.error(data.message)
    } catch (e1) {
      toast.error(e1.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <form onSubmit={submit} className='bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-[#037c6e] to-[#048a7b] px-8 py-6 text-center'>
            <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V9a2 2 0 00-2-2m0 0V5a2 2 0 012-2m-2 2H9m10 0a2 2 0 012 2M9 7a2 2 0 00-2 2m0 0a2 2 0 002 2m-2-2a2 2 0 012 2m-2-2V9a2 2 0 002-2m0 0V5a2 2 0 00-2-2m2 2H9' />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              Reset Password
            </h2>
            <p className='text-white/90 text-sm'>
              Don't worry, we'll help you get back in
            </p>
          </div>

          {/* Form Section */}
          <div className='px-8 py-8 space-y-6'>
            <div className='text-center mb-6'>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Enter your email address and we'll send you a secure link to reset your password.
              </p>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                  </svg>
                </div>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder='Enter your email address'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-[#037c6e] to-[#048a7b] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#026157] hover:to-[#037c6e] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Back to Login Link */}
            <div className='text-center pt-4 border-t border-gray-200'>
              <p className='text-gray-600 text-sm'>
                Remember your password?{' '}
                <a
                  href='/login'
                  className='text-[#037c6e] font-semibold hover:text-[#026157] transition-colors duration-200 hover:underline'
                >
                  Back to Sign In
                </a>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-gray-500 text-xs'>
            🔒 Your information is secure and protected
          </p>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword



