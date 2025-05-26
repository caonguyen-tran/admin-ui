import React, { useState, useEffect } from 'react';

const QuestionSetDialog = ({ isOpen, onClose, onSubmit, questionSet = null, mode = 'add', isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    readingPart: '',
    yearOf: '',
    isActive: true,
  });

  // Update form data when questionSet prop changes (for edit mode)
  useEffect(() => {
    if (questionSet) {
      setFormData({
        name: questionSet.name || '',
        description: questionSet.description || '',
        readingPart: questionSet.readingPart || '',
        yearOf: questionSet.yearOf || '',
        isActive: questionSet.isActive ?? true,
      });
    } else {
      // Reset form when opening for new question set
      setFormData({
        name: '',
        description: '',
        readingPart: '',
        yearOf: '',
        isActive: true,
      });
    }
  }, [questionSet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy of form data
    const {isActive, ...submitData} = formData;
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  const isEditMode = mode === 'edit';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Question Set' : 'Add New Question Set'}
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
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Question Set Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              placeholder="Enter question set name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div>
            <label htmlFor="readingPart" className="block text-sm font-semibold text-gray-700 mb-2">
              Reading Part
            </label>
            <input
              type="number"
              id="readingPart"
              name="readingPart"
              value={formData.readingPart}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              placeholder="Enter reading part"
            />
          </div>

          <div>
            <label htmlFor="yearOf" className="block text-sm font-semibold text-gray-700 mb-2">
              Year Release
            </label>
            <input
              type="number"
              id="yearOf"
              name="yearOf"
              value={formData.yearOf}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              placeholder="Enter year release"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
              Status
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-0 h-0 opacity-0 absolute"
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
              {isLoading ? 'Loading...' : isEditMode ? 'Update Question Set' : 'Add Question Set'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionSetDialog; 