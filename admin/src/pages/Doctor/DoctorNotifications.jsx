import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorNotifications = () => {
  const { getNotificationRecipients, sendDoctorNotification, getDoctorInbox, markDoctorNotificationRead, getDoctorSent } = useContext(DoctorContext)
  const [recipients, setRecipients] = useState([])
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [message, setMessage] = useState('')
  const [inbox, setInbox] = useState([])
  const [sent, setSent] = useState([])
  const [activeTab, setActiveTab] = useState('send') // 'send', 'inbox', 'sent'

  const load = async () => {
    const r = await getNotificationRecipients()
    setRecipients(r)
    const [i, s] = await Promise.all([getDoctorInbox(), getDoctorSent()])
    setInbox(i)
    setSent(s)
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    if (!search) return recipients
    const q = search.toLowerCase()
    return recipients.filter(r => r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q))
  }, [recipients, search])

  const toggle = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const send = async () => {
    if (!message.trim() || selectedIds.length === 0) return
    const ok = await sendDoctorNotification({ userIds: selectedIds, message: message.trim() })
    if (ok) {
      setMessage('')
      setSelectedIds([])
      const [i, s] = await Promise.all([getDoctorInbox(), getDoctorSent()])
      setInbox(i)
      setSent(s)
    }
  }

  const markRead = async (id) => {
    const ok = await markDoctorNotificationRead(id)
    if (ok) setInbox(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
  }

  // Get unread count for inbox badge
  const unreadCount = inbox.filter(n => !n.isRead).length

  return (
    <div className="w-full min-h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Communication Hub</h1>
          <p className="text-gray-600 mt-2">Manage your patient notifications and messages</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('send')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'send'
                ? 'text-[#037c6e] border-b-2 border-[#037c6e] bg-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Notification
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'text-[#037c6e] border-b-2 border-[#037c6e] bg-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Inbox
            {unreadCount > 0 && (
              <span className="bg-[#037c6e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'sent'
                ? 'text-[#037c6e] border-b-2 border-[#037c6e] bg-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Sent
            {sent.length > 0 && (
              <span className="bg-gray-200 text-gray-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {sent.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Send Notification Tab */}
          {activeTab === 'send' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Compose Message</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Recipients</label>
                    <div className="relative mb-4">
                      <input 
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        placeholder="Search patients by name or email" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#037c6e] focus:border-transparent" 
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl max-h-60 overflow-y-auto">
                      {filtered.length > 0 ? (
                        filtered.map(u => (
                          <label key={u._id} className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(u._id)} 
                              onChange={() => toggle(u._id)} 
                              className="h-5 w-5 text-[#037c6e] rounded focus:ring-[#037c6e] border-gray-300" 
                            />
                            <div className="flex items-center gap-3">
                              {u.image ? (
                                <img 
                                  src={u.image} 
                                  alt={u.name} 
                                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentElement.innerHTML = `
                                      <div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                      </div>
                                      <div>
                                        <div class="font-medium text-gray-800">${u.name}</div>
                                        <div class="text-xs text-gray-500">${u.email}</div>
                                      </div>
                                    `;
                                  }}
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-800">{u.name}</div>
                                <div className="text-xs text-gray-500">{u.email}</div>
                              </div>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-medium">No patients found</p>
                          <p className="text-sm mt-1">Try adjusting your search criteria</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedIds.length > 0 && (
                      <div className="mt-3 text-sm text-gray-600">
                        Selected: {selectedIds.length} patient{selectedIds.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Message Content</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      value={message} 
                      onChange={e => setMessage(e.target.value)} 
                      rows={8} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#037c6e] focus:border-transparent" 
                      placeholder="Write your notification message here..." 
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Tips for effective notifications</h3>
                        <p className="text-xs text-blue-700 mt-1">Keep messages clear, concise, and actionable. Personalize when possible for better engagement.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={send} 
                    disabled={!message.trim() || selectedIds.length === 0}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                      !message.trim() || selectedIds.length === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#037c6e] text-white hover:bg-[#02665d] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inbox Tab */}
          {activeTab === 'inbox' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Received Messages</h2>
                <span className="bg-[#037c6e] text-white text-sm font-medium px-3 py-1 rounded-full">
                  {inbox.length} {inbox.length === 1 ? 'message' : 'messages'}
                </span>
              </div>
              
              {inbox.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#037c6e]/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No messages received</h3>
                  <p className="text-gray-500 max-w-md mx-auto">You don't have any notifications in your inbox. Messages from admins will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {[...inbox].reverse().map(n => (
                    <div 
                      key={n._id} 
                      className={`border rounded-xl p-5 transition-all ${
                        n.isRead 
                          ? 'border-gray-200 bg-white' 
                          : 'border-[#037c6e]/30 bg-[#037c6e]/5 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          {n.userId?.image ? (
                            <img 
                              src={n.userId.image} 
                              alt={n.userId.name || 'User'} 
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm mr-3"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentElement.innerHTML = `
                                  <div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <div class="font-medium text-gray-800">
                                      From: ${n.sentBy === 'admin' ? 'Administrator' : n.userId?.name || 'System'}
                                    </div>
                                    <div class="text-xs text-gray-500">
                                      ${new Date(n.timestamp).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </div>
                                  </div>
                                `;
                              }}
                            />
                          ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-800">
                              From: {n.sentBy === 'admin' ? 'Administrator' : n.userId?.name || 'System'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(n.timestamp).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        {!n.isRead && (
                          <span className="bg-[#037c6e] text-white text-xs font-bold px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-4">
                        {n.message}
                      </div>
                      
                      <div className="flex justify-end">
                        {!n.isRead && (
                          <button 
                            onClick={() => markRead(n._id)}
                            className="text-sm bg-[#037c6e] text-white px-3 py-1.5 rounded-lg hover:bg-[#02665d] transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sent Tab */}
          {activeTab === 'sent' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Sent Notifications</h2>
                <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  {sent.length} {sent.length === 1 ? 'notification' : 'notifications'}
                </span>
              </div>
              
              {sent.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#037c6e]/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No notifications sent</h3>
                  <p className="text-gray-500 max-w-md mx-auto">You haven't sent any notifications yet. Use the "Send Notification" tab to communicate with your patients.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {[...sent].reverse().map(n => {
                    return (
                      <div key={n._id} className="border border-gray-200 rounded-xl p-5 bg-white">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center">
                            {n.userId?.image ? (
                              <img 
                                src={n.userId.image} 
                                alt={n.userId.name || 'Patient'} 
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm mr-3"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentElement.innerHTML = `
                                    <div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <div class="font-medium text-gray-800">
                                        To: ${n.userId?.name || 'Unknown Patient'}
                                      </div>
                                      <div class="text-xs text-gray-500">
                                        ${new Date(n.timestamp).toLocaleDateString('en-US', { 
                                          weekday: 'short', 
                                          year: 'numeric', 
                                          month: 'short', 
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </div>
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-800">
                                To: {n.userId?.name || 'Unknown Patient'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(n.timestamp).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                          <span className={`text-xs font-medium px-3 py-1 rounded-md ${
                            n.isRead 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {n.isRead ? 'Seen' : 'Unseen'}
                          </span>
                        </div>
                        
                        <div className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                          {n.message}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorNotifications