import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)


  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-[#037c6e] to-[#048a7b] px-8 py-6 text-center'>
            <h2 className='text-3xl font-bold text-white mb-2'>
              {state === 'Sign Up' ? "Create Account" : "Welcome Back"}
            </h2>
            <p className='text-white/90 text-sm'>
              {state === 'Sign Up'
                ? "Join us to book your appointments easily"
                : "Sign in to access your appointments"
              }
            </p>
          </div>

          {/* Form Section */}
          <div className='px-8 py-8 space-y-6'>
            {state === 'Sign Up' && (
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <div className='relative'>
                  <input
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Email Address
              </label>
              <div className='relative'>
                <input
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#037c6e] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className='w-full bg-gradient-to-r from-[#037c6e] to-[#048a7b] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#026157] hover:to-[#037c6e] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              {state === 'Sign Up' ? "Create Account" : "Sign In"}
            </button>

            {/* Toggle Section */}
            <div className='text-center pt-4 border-t border-gray-200'>
              <p className='text-gray-600 text-sm'>
                {state === 'Sign Up'
                  ? "Already have an account? "
                  : "Don't have an account? "
                }
                <button
                  type="button"
                  onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                  className='text-[#037c6e] font-semibold hover:text-[#026157] transition-colors duration-200 hover:underline'
                >
                  {state === 'Sign Up' ? "Sign in here" : "Create one here"}
                </button>
              </p>
              {state === 'Login' && (
                <div className='mt-3'>
                  <a href='/forgot-password' className='text-sm text-[#037c6e] hover:underline'>Forgot password?</a>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-gray-500 text-xs'>
            Secure and trusted by thousands of users
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login



// #037c6e