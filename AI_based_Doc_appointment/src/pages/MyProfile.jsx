// import React, { useState } from 'react'
// import { assets } from '../assets/assets'

// const MyProfile = () => {

//   const [userData, setUserData] = useState({
//     name: 'Prachi Talavanekar',
//     image: assets.profile_pic,
//     email: 'prachitalavanekar29@gmail.com',
//     phone: '+91 9422509340',
//     address: {
//       line1: 'Pinguli Dhuri Temb Nagar',
//       line2: 'Tal-Kudal,Dist-Sindhudurg'
//     },
//     gender: 'Female',
//     dob: '2005-01-31'
//   })

//   const [isEdit, setIsEdit] = useState(false)

//   return (
//     <div className='max-w-lg flex flex-col gap-2 text-sm'>

//       <img className='w-36 rounded' src={userData.image} alt="" />
//       {
//         isEdit
//           ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4  outline-[#037c6e] ' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
//           : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//       }

//       <hr className='bg-zinc-400 h-[-1px] border-none' />
//       <div>
//         <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Email id:</p>
//           <p className='text-blue-500'>{userData.email}</p>
//           <p className='font-medium'>Phone:</p>
//           {
//             isEdit
//               ? <input className='bg-gray-100 max-w-52 outline-[#037c6e]' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
//               : <p className='text-blue-400'>{userData.phone}</p>
//           }
//           <p className='font-medium'>Address:</p>
//           {
//             isEdit
//               ? <p>
//                 <input className='bg-gray-50 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
//                 <br />
//                 <input className='bg-gray-50 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
//               </p>
//               : <p className='text-gray-500'>
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//           }
//         </div>
//       </div>

//       <div>
//         <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>
//             Gender:
//           </p>
//           {
//             isEdit
//               ? <select className='max-w-20 bg-gray-100 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               : <p className='text-gray-400'>{userData.gender}</p>
//           }

//           <p className='font-medium'>Birthday:</p>
//           {
//             isEdit
//               ? <input className='max-w-28 bg-gray-100 outline-[#037c6e]' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
//               : <p className='text-gray-400'>{userData.dob}</p>
//           }
//         </div>
//       </div>

//           <div className='mt-10'>
//             {
//             isEdit
//             ? <button className='border border-[#037c6e] px-8 py-2 rounded-full hover:bg-[#037c6e] hover:text-white transition-all' onClick={() =>setIsEdit(false)}>Save information</button>
//             : <button className='border border-[#037c6e] px-8 py-2 rounded-full hover:bg-[#037c6e] hover:text-white transition-all' onClick={() =>setIsEdit(true)}>Edit</button>
//             }
//           </div>

//     </div>
//   )
// }

// export default MyProfile

// // #037c6e



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { useContext } from 'react'
// import { AppContext } from '../context/AppContext'
// import { toast } from 'react-toastify'
// import axios from 'axios';



// const MyProfile = () => {
//   // const [userData, setUserData] = useState({
//   //   name: 'Prachi Talavanekar',
//   //   image: assets.profile_pic,
//   //   email: 'prachitalavanekar29@gmail.com',
//   //   phone: '+91 9422509340',
//   //   address: {
//   //     line1: 'Pinguli Dhuri Temb Nagar',
//   //     line2: 'Tal-Kudal,Dist-Sindhudurg'
//   //   },
//   //   gender: 'Female',
//   //   dob: '2005-01-31'
//   // })

//   const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)
//   const [image, setImage] = useState(false);
//   const [loading, setLoading] = useState(false);


//   // const updateUserProfileData = async () => {
//   //   try {
//   //     const formData = new FormData()


//   //     formData.append('name',userData.name)
//   //     formData.append('phone',userData.phone)
//   //     formData.append('address',JSON.stringify(userData.address))
//   //     formData.append('gender',userData.gender)
//   //     formData.append('dob',userData.dob)

//   //     image && formData.append('image',image)

//   //     const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,
//   //       {   headers: { Authorization: `Bearer ${token}` }})


//   //     if (data.success) {
//   //       toast.success(data.message)
//   //       await loadUserProfileData()
//   //       setIsEdit(false)
//   //       setImage(false)
//   //     } else{
//   //       toast.error(data.message)
//   //     }

//   //   } catch (error) {
//   //     toast.error(error.message)
//   //     console.log(error)
      
//   //   }
//   // }

//   const handleProfileUpdate = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("phone", form.phone);
//     formData.append("gender", form.gender);
//     formData.append("dob", form.dob);
//     formData.append("address", JSON.stringify(form.address));

//     if (image) {
//       formData.append("image", image);
//     }

//     const response = await axios.post("/api/user/update-profile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.data.success) {
//       toast.success("Profile updated successfully");
//       await loadUserProfileData(); // Refresh local state from server
//       setEditMode(false);
//     } else {
//       toast.error(response.data.message || "Update failed");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };



//   return userData && (
//     <div className="max-w-3xl w-full mx-auto bg-white shadow-md rounded-2xl px-6 py-8 space-y-6 border border-gray-100">

//       {/* Profile Header */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
//         {/* <img src={userData.image} alt="profile" className="w-24 h-24 rounded-full object-cover" /> */}

//         {
//           isEdit
//             ? <label htmlFor="image">
//               <div className='inline-block relative cursor-pointer'>
//                 <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//                 <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />

//               </div>
//               <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//             </label>
//             : <img className="w-36 rounded" src={userData.image} alt="" />
//         }

//         {
//           isEdit
//             ? <input
//               type="text"
//               value={userData.name}
//               onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
//               className="text-2xl font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-md outline-[#037c6e] w-full sm:w-auto"
//             />
//             : <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">{userData.name}</h2>
//         }
//       </div>

//       <hr className="border-t border-dashed border-gray-300" />

//       {/* Contact Info */}
//       <div>
//         <h3 className="text-[#037c6e] font-semibold mb-3">Contact Information</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
//           <p className="font-medium">Email:</p>
//           <p className="text-blue-600 break-words">{userData.email}</p>

//           <p className="font-medium">Phone:</p>
//           {
//             isEdit
//               ? <input
//                 type="text"
//                 value={userData.phone}
//                 onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-60"
//               />
//               : <p className="text-blue-500">{userData.phone}</p>
//           }

//           <p className="font-medium">Address:</p>
//           {
//             isEdit
//               ? <div className="space-y-2 w-full">
//                 <input
//                   value={userData.address.line1}
//                   onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
//                   className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
//                 />
//                 <input
//                   value={userData.address.line2}
//                   onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
//                   className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
//                 />
//               </div>
//               : <p className="text-gray-600 whitespace-pre-line">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//           }
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div>
//         <h3 className="text-[#037c6e] font-semibold mb-3">Basic Information</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
//           <p className="font-medium">Gender:</p>
//           {
//             isEdit
//               ? <select
//                 value={userData.gender}
//                 onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               : <p className="text-gray-600">{userData.gender}</p>
//           }

//           <p className="font-medium">Birthday:</p>
//           {
//             isEdit
//               ? <input
//                 type="date"
//                 value={userData.dob}
//                 onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
//               />
//               : <p className="text-gray-600">{userData.dob}</p>
//           }
//         </div>
//       </div>

//       {/* Edit Button */}
//       <div className="text-center pt-4">
//         <button
//           onClick={handleProfileUpdate}
//           className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
//         >
//           Save information
//         </button>
//          <button
//           onClick={() => setIsEdit(true)}
//           className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   )
// }

// export default MyProfile



import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize the form state using userData values
  const [form, setForm] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
    gender: userData?.gender || '',
    dob: userData?.dob || '',
    address: userData?.address || { line1: '', line2: '' },
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('gender', form.gender);
    formData.append('dob', form.dob);
    formData.append('address', JSON.stringify(form.address));

    if (image) formData.append('image', image);

    try {
      const response = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      address: {
        ...prevForm.address,
        [name]: value,
      },
    }));
  };

  return userData && (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#037c6e] to-[#048a7b] px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-white/90 text-sm">Manage your personal information and preferences</p>
              </div>
              <div className="hidden sm:block">
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Image */}
              <div className="relative group">
                {isEdit ? (
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="relative">
                      <img
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-[#037c6e]/20 shadow-lg group-hover:shadow-xl transition-all duration-300"
                        src={image ? URL.createObjectURL(image) : userData.image || '/path/to/default-image.jpg'}
                        alt="Profile"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#037c6e] rounded-full p-2 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                      </div>
                    </div>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden accept="image/*" />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-[#037c6e]/20 shadow-lg"
                      src={userData.image}
                      alt="Profile"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#037c6e] rounded-full p-2 shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Name and Status */}
              <div className="flex-1 text-center lg:text-left">
                {isEdit ? (
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="text-3xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors w-full lg:w-auto"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h2>
                )}
                
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active Profile
                  </div>
                  <div className="bg-[#e3fcf3] text-[#037c6e] px-3 py-1 rounded-full text-sm font-medium">
                    Verified User
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-3">
                {isEdit ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleProfileUpdate}
                      disabled={loading}
                      className="bg-[#037c6e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#026157] transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEdit(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-[#037c6e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#026157] transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#037c6e] rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                    Email Address
                  </label>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-900 font-medium">{userData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Phone Number
                  </label>
                  {isEdit ? (
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-900 font-medium">{userData.phone}</p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Address
                  </label>
                  {isEdit ? (
                    <div className="space-y-3">
                      <input
                        name="line1"
                        value={form.address.line1}
                        onChange={handleAddressChange}
                        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors"
                        placeholder="Address Line 1"
                      />
                      <input
                        name="line2"
                        value={form.address.line2}
                        onChange={handleAddressChange}
                        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors"
                        placeholder="Address Line 2"
                      />
                    </div>
                  ) : (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {userData.address.line1}
                        <br />
                        {userData.address.line2}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#037c6e] rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Gender
                  </label>
                  {isEdit ? (
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-900 font-medium">{userData.gender}</p>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#037c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Date of Birth
                  </label>
                  {isEdit ? (
                    <input
                      type="date"
                      name="dob"
                      value={form.dob || ""}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#037c6e] focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-900 font-medium">{userData.dob}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

