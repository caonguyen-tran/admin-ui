import React, { useState, useEffect } from 'react';
import Loading from '../../common/Loading';

const UserDialog = ({ isOpen, onClose, onSubmit, user = null, mode = 'add', roles = [], isLoading = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    userId: '',
    role: 'FREE_USER',
  });

  // Update form data when user prop changes (for edit mode)
  useEffect(() => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      userId: user?.id || '',
      role: user?.role || 'FREE_USER',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy of form data and remove email
    const { email, ...submitData } = formData;
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  const isEditMode = mode === 'edit';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isEditMode}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base ${
                isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isEditMode}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base ${
                isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password {isEditMode && <span className="text-gray-500 text-sm font-normal">(leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required={!isEditMode}
              disabled={isEditMode}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base ${
                isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base bg-white`}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
              Account Status
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className={`w-0 h-0 opacity-0 absolute`}
                disabled={true}
              />
              <span className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-not-allowed ${
                formData.isActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform cursor-not-allowed ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              {isLoading ? 'Loading...' : isEditMode ? 'Update Status' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog; 