import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { IoNotifications } from "react-icons/io5";


const Navbar = () => {

    const navigate = useNavigate();

    const { token, setToken, userData, unreadCount, refreshUnreadCount } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)
    // const [token, setToken] = useState(true)

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    // Close profile dropdown on outside click (for touch/mobile)
    useEffect(() => {
        const handler = (e) => {
            if (!profileRef.current) return
            if (!profileRef.current.contains(e.target)) setProfileOpen(false)
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])


    return (
        <div className='flex items-center justify-between text-sm py-4 mb-4 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-50 cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex item-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-[#B0DB9C] w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-[#B0DB9C] w-3/5 m-auto hidden' />

                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-[#B0DB9C] w-3/5 m-auto hidden' />

                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-[#B0DB9C] w-3/5 m-auto hidden' />

                </NavLink>
                <NavLink to='/notification' onClick={() => setTimeout(refreshUnreadCount, 500)}>
                    <div className="relative">
                        <IoNotifications className="text-2xl cursor-pointer text-[#037c6e] hover:text-[#025c52] transition-colors" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </div>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {/* Mobile Notification Icon - shown only on mobile when user is logged in */}
                {token && userData && (
                    <NavLink to='/notification' onClick={() => setTimeout(refreshUnreadCount, 500)} className='md:hidden'>
                        <div className="relative">
                            <IoNotifications className="text-xl cursor-pointer text-[#037c6e] hover:text-[#025c52] transition-colors" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] leading-none px-1 py-0.5 rounded-full min-w-[14px] text-center">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </div>
                    </NavLink>
                )}
                
                {
                    token && userData ?
                        <div ref={profileRef} className='flex items-center gap-2 cursor-pointer group relative'>
                            <button aria-haspopup="menu" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)} className='flex items-center gap-2'>
                                <img className='w-8 rounded-full' src={userData.image} alt="" />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            </button>

                            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${profileOpen ? 'block' : 'hidden'} group-hover:block`}>
                                <div className='min-w-56 bg-[#f7fbf5] rounded-lg shadow-lg flex flex-col gap-3 p-4 border border-[#d7f0e6]'>
                                    <p onClick={() => { setProfileOpen(false); navigate('/dashboard') }} className='hover:text-black cursor-pointer'>Dashboard</p>
                                    <p onClick={() => { setProfileOpen(false); navigate('/my-profile') }} className='hover:text-black cursor-pointer'>My profile</p>
                                    <p onClick={() => { setProfileOpen(false); navigate('/my-appointments') }} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={() => { setProfileOpen(false); logout() }} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>

                        :
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:inline-block bg-[#037c6e] text-white px-6 py-2 rounded-full font-medium shadow-md border border-[#037c6e] hover:bg-white hover:text-[#037c6e] transition duration-300 ease-in-out cursor-pointer"
                        >
                            Create Account
                        </button>


                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* ------------ mobile menu ----------- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden bg-white transition-all `}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About Us</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                        
                        {/* Notification link in mobile menu - only show if user is logged in */}
                        {token && userData && (
                            <NavLink 
                                onClick={() => {
                                    setShowMenu(false);
                                    setTimeout(refreshUnreadCount, 500);
                                }} 
                                to='/notification'
                                className='flex items-center gap-2'
                            >
                                <div className="relative flex items-center gap-2 px-4 py-2 rounded">
                                    <IoNotifications className="text-xl text-[#037c6e]" />
                                    <span>Notifications</span>
                                    {unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs leading-none px-2 py-1 rounded-full">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                        </span>
                                    )}
                                </div>
                            </NavLink>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar




// ECFAE5 DDF6D2 CAE8BD B0DB9C













