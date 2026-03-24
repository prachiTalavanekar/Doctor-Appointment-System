import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets_admin/assets'

const DoctorProfile = () => {
  const { doctorProfile, getDoctorProfile, updateDoctorProfile, loading, dToken } = useContext(DoctorContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address: {
      line1: '',
      line2: ''
    },
    available: true
  })

  useEffect(() => {
    if (dToken) {
      getDoctorProfile()
    }
  }, [dToken])

  useEffect(() => {
    if (doctorProfile) {
      setFormData({
        name: doctorProfile.name || '',
        speciality: doctorProfile.speciality || '',
        degree: doctorProfile.degree || '',
        experience: doctorProfile.experience || '',
        about: doctorProfile.about || '',
        fees: doctorProfile.fees || '',
        address: {
          line1: doctorProfile.address?.line1 || '',
          line2: doctorProfile.address?.line2 || ''
        },
        available: doctorProfile.available !== undefined ? doctorProfile.available : true
      })
    }
  }, [doctorProfile])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await updateDoctorProfile(formData)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (doctorProfile) {
      setFormData({
        name: doctorProfile.name || '',
        speciality: doctorProfile.speciality || '',
        degree: doctorProfile.degree || '',
        experience: doctorProfile.experience || '',
        about: doctorProfile.about || '',
        fees: doctorProfile.fees || '',
        address: {
          line1: doctorProfile.address?.line1 || '',
          line2: doctorProfile.address?.line2 || ''
        },
        available: doctorProfile.available !== undefined ? doctorProfile.available : true
      })
    }
    setIsEditing(false)
  }

  if (loading && !doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
          <button 
            onClick={getDoctorProfile}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Refresh Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional information</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${doctorProfile.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{doctorProfile.available ? 'Available' : 'Unavailable'}</span>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="relative inline-block">
                <img 
                  src={doctorProfile.image || assets.doctor_icon} 
                  alt="Doctor" 
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-teal-100"
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                  doctorProfile.available ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-4">{doctorProfile.name}</h2>
              <p className="text-teal-600 font-medium">{doctorProfile.speciality}</p>
              <p className="text-gray-600 text-sm mt-1">{doctorProfile.degree}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-800">{doctorProfile.experience}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-teal-600">${doctorProfile.fees}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doctorProfile.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doctorProfile.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Professional Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-600">{doctorProfile.email}</div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>
                  {isEditing ? (
                    <select
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Speciality</option>
                      <option value="General physician">General physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatricians</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.speciality}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.degree}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  {isEditing ? (
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                      <option value="4 Years">4 Years</option>
                      <option value="5 Years">5 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.experience}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee ($)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">${doctorProfile.fees}</div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address Line 1</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.line1"
                        value={formData.address.line1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.address?.line1}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address Line 2</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.line2"
                        value={formData.address.line2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{doctorProfile.address?.line2}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                {isEditing ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 min-h-[100px]">{doctorProfile.about}</div>
                )}
              </div>

              {/* Availability */}
              {isEditing && (
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Available for appointments</label>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile