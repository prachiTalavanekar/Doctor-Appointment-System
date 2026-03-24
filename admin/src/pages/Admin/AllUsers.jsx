

import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');


  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        toast.success("User deleted");
        fetchUsers(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="m-5 max-w-full">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#037c6e]">All Users</h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037c6e] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-[#037c6e]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#037c6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                {searchQuery ? 'No matching users found' : 'No users found'}
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search criteria' : 'Users will appear here once they register'}
              </p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#037c6e] text-white">
                  <th className="py-4 px-6 text-left font-semibold rounded-tl-xl">User</th>
                  <th className="py-4 px-6 text-left font-semibold">Email</th>
                  <th className="py-4 px-6 text-left font-semibold rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      index === filteredUsers.length - 1 ? 'rounded-b-xl' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {user.image ? (
                          <img 
                            src={user.image} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#037c6e]/10 flex items-center justify-center mr-3">
                            <span className="text-[#037c6e] font-bold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-700">{user.email}</div>
                      {user.appointments?.length > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          {user.appointments.length} appointment{user.appointments.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => deleteUser(user._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {users.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
            <div>
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div>
              Total users: {users.length}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


export default AllUsers;


