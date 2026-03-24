import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const SendNotification = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [notificationText, setNotificationText] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [history, setHistory] = useState([]);
  const { getNotificationRecipients, sendAdminNotification, getAdminNotificationHistory } = useContext(AdminContext);

  useEffect(() => {
    const load = async () => {
      setSelectedIds([]);
      setSearchQuery('');
      const list = await getNotificationRecipients(activeTab);
      setRecipients(list);
      const h = await getAdminNotificationHistory();
      setHistory(h);
    };
    load();
  }, [activeTab]);

  const filteredRecipients = useMemo(() => {
    if (!searchQuery) return recipients;
    const q = searchQuery.toLowerCase();
    return recipients.filter(r => r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q));
  }, [recipients, searchQuery]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSendNotification = async () => {
    if (selectedIds.length === 0 || !notificationText.trim()) return;
    const ok = await sendAdminNotification({
      recipientType: activeTab === 'doctors' ? 'doctor' : 'user',
      recipientIds: selectedIds,
      message: notificationText.trim(),
    });
    if (ok) {
      setNotificationText('');
      setSelectedIds([]);
      const h = await getAdminNotificationHistory();
      setHistory(h);
    }
  };

  // Function to select/deselect all recipients
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRecipients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRecipients.map(r => r._id));
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-gray-50 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[70vh]">
        {/* Left: Send Notification */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#037c6e]">Send Notification</h2>
            <div className="w-10 h-10 rounded-full bg-[#037c6e]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex space-x-2 mb-6 bg-gray-100 p-1 rounded-xl">
            {['doctors', 'patients'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                  setSelectedIds([]);
                  setNotificationText('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#037c6e] text-white shadow'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Search {activeTab === 'doctors' ? 'Doctor' : 'Patient'}
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#037c6e] focus:border-transparent"
                placeholder={`Search ${activeTab === 'doctors' ? 'doctor' : 'patient'} by name or email`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Select All and Count */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedIds.length > 0 && selectedIds.length === filteredRecipients.length}
                onChange={toggleSelectAll}
                className="h-4 w-4 text-[#037c6e] rounded focus:ring-[#037c6e]"
              />
              <label htmlFor="selectAll" className="ml-2 text-sm text-gray-600">
                Select All
              </label>
            </div>
            <div className="text-sm text-gray-500">
              {selectedIds.length} of {filteredRecipients.length} selected
            </div>
          </div>

          {/* Recipients list */}
          <div className="border border-gray-200 rounded-xl max-h-64 overflow-y-auto mb-5">
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map(r => (
                <label key={r._id} className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(r._id)}
                    onChange={() => toggleSelect(r._id)}
                    className="h-4 w-4 text-[#037c6e] rounded focus:ring-[#037c6e]"
                  />
                  <div className="flex items-center gap-3">
                    {r.image ? (
                      <img src={r.image} className="w-10 h-10 rounded-full object-cover" alt={r.name} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{r.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[180px]">{r.email}</div>
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No {activeTab} found</p>
              </div>
            )}
          </div>

          {/* Notification Input */}
          <div className="mt-2">
            <label className="block mb-2 font-medium text-gray-700">
              Notification Message
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#037c6e] focus:border-transparent"
              placeholder="Type your notification message here..."
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-500">
                {notificationText.length}/500 characters
              </div>
              <button
                onClick={handleSendNotification}
                disabled={selectedIds.length === 0 || !notificationText.trim()}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center ${
                  selectedIds.length === 0 || !notificationText.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#037c6e] text-white hover:bg-[#02665d] hover:shadow-md'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Notification
              </button>
            </div>
          </div>
        </div>

        {/* Right: Notification History */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#037c6e]">Notification History</h2>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#037c6e]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#037c6e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </div>
          </div>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <div className="w-20 h-20 rounded-full bg-[#037c6e]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No notifications sent yet</h3>
              <p className="text-gray-500">Your notification history will appear here once you send notifications</p>
            </div>
          ) : (
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {history.map((item) => (
                <li key={item._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-sm text-gray-600">
                        To: <strong className="text-gray-800">{item.docId?.name || item.userId?.name || 'Unknown Recipient'}</strong>
                      </span>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isRead 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.isRead ? 'Seen' : 'Unseen'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{item.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendNotification;