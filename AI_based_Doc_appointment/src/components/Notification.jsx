import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const Notification = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [items, setItems] = useState([])

  const load = async () => {
    if (!token) return
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notification/inbox`, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) setItems(data.notifications)
    } catch (e) {
      // silent
    }
  }

  const markRead = async (id) => {
    try {
      await axios.post(`${backendUrl}/api/user/notification/mark-read`, { notificationId: id }, { headers: { Authorization: `Bearer ${token}` } })
      setItems(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
      // Optionally refresh unread badge
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new Event('refresh-unread'))
      }
    } catch (e) {}
  }

  useEffect(() => { load() }, [token])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#037c6e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {items.filter(n => !n.isRead).length}
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-[#037c6e]/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No notifications yet</h3>
          <p className="text-gray-500">We'll notify you when something important happens</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {items.map(n => (
            <div 
              key={n._id} 
              className={`rounded-xl p-5 transition-all duration-200 border ${
                n.isRead 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-[#037c6e]/20 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 w-3 h-3 rounded-full ${n.isRead ? 'bg-gray-300' : 'bg-[#037c6e]'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="font-medium">
                        {n.sentBy === 'doctor' ? "Doctor's Notification" : 'Admin Notification'}
                      </span>
                      {n.docId?.name && (
                        <span className="bg-[#037c6e]/10 text-[#037c6e] px-2 py-1 rounded-md text-xs font-medium">
                          {n.docId.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {new Date(n.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`text-gray-800 ${n.isRead ? '' : 'font-medium'}`}>
                      {n.message}
                    </p>
                    {n.type === 'video_call' && (n.meta?.roomPath || n.meta?.roomUrl) && (
                      <div className="mt-3">
                        <a
                          href={n.meta.roomPath ? `${window.location.origin}${n.meta.roomPath}` : n.meta.roomUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                        >
                          Join video call
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {!n.isRead && (
                  <button 
                    onClick={() => markRead(n._id)} 
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg bg-[#037c6e] text-white hover:bg-[#026356] transition-colors duration-200 font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notification