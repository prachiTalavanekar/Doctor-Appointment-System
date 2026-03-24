import React, { useContext, useState } from 'react'
import { assets } from '../../assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail("")
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Add Doctor</h1>
        <p className='text-sm text-gray-500 mt-2'>Fill in the details below to add a new doctor to the platform.</p>
      </div>

      <div className='bg-white px-6 sm:px-8 py-8 border border-[#037c6e]/40 rounded-3xl w-full max-w-5xl max-h-[80vh] overflow-y-auto shadow-lg'>
        <div className='flex flex-col md:flex-row items-start gap-6 mb-8'>
          <div className='flex flex-col items-center'>
            <label htmlFor="doc-img" className='relative group cursor-pointer'>
              <div className='w-24 h-24 rounded-2xl bg-[#e3fcf3] border-2 border-dashed border-[#037c6e]/30 flex items-center justify-center overflow-hidden shadow-sm'>
                {docImg ? (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(docImg)} alt="Doctor" />
                ) : (
                  <div className='flex flex-col items-center text-[#037c6e]/70'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#037c6e] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
                Upload Photo
              </div>
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className='text-xs text-gray-500 mt-10 text-center'>Upload a clear, professional photo<br />JPG or PNG format</p>
          </div>

          <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-gray-700'>Doctor Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors"
                type="text" 
                placeholder='Full name' 
                required 
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-gray-700'>Email Address</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                type="email" 
                placeholder='Email address' 
                required 
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                type="password" 
                placeholder='Set password' 
                required 
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-gray-700'>Speciality</label>
              <select 
                onChange={(e) => setSpeciality(e.target.value)} 
                value={speciality} 
                className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors"
              >
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-5'>
            <div className='bg-gray-50 rounded-2xl p-5'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Professional Details</h3>
              
              <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium text-gray-700'>Education</label>
                  <input 
                    onChange={(e) => setDegree(e.target.value)} 
                    value={degree} 
                    className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                    type="text" 
                    placeholder='Medical degree' 
                    required 
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>Experience</label>
                    <select 
                      onChange={(e) => setExperience(e.target.value)} 
                      value={experience} 
                      className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors"
                    >
                      <option value="1 Year">1 Year</option>
                      <option value="2 Year">2 Years</option>
                      <option value="3 Year">3 Years</option>
                      <option value="4 Year">4 Years</option>
                      <option value="5 Year">5 Years</option>
                      <option value="6 Year">6 Years</option>
                      <option value="7 Year">7 Years</option>
                      <option value="8 Year">8 Years</option>
                      <option value="9 Year">9 Years</option>
                      <option value="10 Year">10 Years</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>Fees ($)</label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium'>$</span>
                      <input 
                        onChange={(e) => setFees(e.target.value)} 
                        value={fees} 
                        className="pl-8 w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                        type="number" 
                        placeholder='0.00' 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='bg-gray-50 rounded-2xl p-5'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Contact Information</h3>
              
              <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium text-gray-700'>Address Line 1</label>
                  <input 
                    onChange={(e) => setAddress1(e.target.value)} 
                    value={address1} 
                    className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                    type="text" 
                    placeholder="Street address" 
                    required 
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium text-gray-700'>Address Line 2</label>
                  <input 
                    onChange={(e) => setAddress2(e.target.value)} 
                    value={address2} 
                    className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
                    type="text" 
                    placeholder="City, State, ZIP" 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 bg-gray-50 rounded-2xl p-5'>
          <label className='text-sm font-medium text-gray-700 mb-2 block'>About Doctor</label>
          <textarea 
            onChange={(e) => setAbout(e.target.value)} 
            value={about} 
            className="w-full outline-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#037c6e] focus:border-transparent hover:bg-[#f0fbf7ff] transition-colors" 
            placeholder="Write a brief description about the doctor's expertise, qualifications, and experience..." 
            rows={4} 
            required 
          />
        </div>

        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-end'>
          <button 
            type='button' 
            onClick={() => { 
              setName('');
              setEmail('');
              setPassword('');
              setExperience('1 Year');
              setFees('');
              setAbout('');
              setSpeciality('General physician');
              setDegree('');
              setAddress1('');
              setAddress2('');
              setDocImg(false);
            }} 
            className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium'
          >
            Clear Form
          </button>
          <button 
            type='submit' 
            className='bg-[#037c6e] px-6 py-3 text-white rounded-xl cursor-pointer shadow hover:bg-[#02665d] transition font-medium flex items-center'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor