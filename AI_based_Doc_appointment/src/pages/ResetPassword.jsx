import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const q = useQuery()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const email = q.get('email') || ''
  const token = q.get('token') || ''

  useEffect(() => {
    if (!email || !token) {
      toast.error('Invalid reset link')
      navigate('/login')
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (password !== confirm) return toast.error('Passwords do not match')
    try {
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/user/reset-password', { email, token, password })
      if (data.success) {
        toast.success('Password reset successful. Please login.')
        navigate('/login')
      } else toast.error(data.message)
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
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              Set New Password
            </h2>
            <p className='text-white/90 text-sm'>
              Create a strong password for your account
            </p>
          </div>

          {/* Form Section */}
          <div className='px-8 py-8 space-y-6'>
            <div className='text-center mb-6'>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Choose a strong password with at least 8 characters including letters, numbers, and symbols.
              </p>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                  </svg>
                </div>
                <input
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder='Enter new password'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <input
                  type='password'
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  placeholder='Confirm new password'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>

            {/* Password Requirements */}
            <div className='bg-gray-50 rounded-lg p-4'>
              <h4 className='text-sm font-medium text-gray-700 mb-2'>Password Requirements:</h4>
              <ul className='text-xs text-gray-600 space-y-1'>
                <li className='flex items-center'>
                  <svg className='w-3 h-3 text-[#037c6e] mr-2' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                  At least 8 characters long
                </li>
                <li className='flex items-center'>
                  <svg className='w-3 h-3 text-[#037c6e] mr-2' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                  Include letters and numbers
                </li>
                <li className='flex items-center'>
                  <svg className='w-3 h-3 text-[#037c6e] mr-2' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                  Both passwords must match
                </li>
              </ul>
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
                  Resetting Password...
                </div>
              ) : (
                'Reset Password'
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
            🔒 Your new password will be encrypted and stored securely
          </p>
        </div>
      </div>

    </div>
  )
}

export default ResetPassword



