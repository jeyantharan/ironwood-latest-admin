import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextInputForm = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    element1: '',
    element2: '',
    element3: '',
  });

  // Fetch data from the API
  const fetchDataEle = async () => {
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/element/header/En');
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDataEle();
  }, []);

  // Update formData when data is fetched
  useEffect(() => {
    if (data) {
      setFormData({
        element1: data[1] || '',
        element2: data[2] || '',
        element3: data[3] || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('https://ironwood-latest-backend.vercel.app/element/updateNav', {
        ele1: formData.element1,
        ele2: formData.element2,
        ele3: formData.element3,
        ele4: data[1],
        ele5: data[2],
        ele6: data[3],
      });
      console.log('Update successful:', response.data);
      setSuccessMessage('Successfully updated!'); // Set success message

      // Clear the message after 3 seconds and then refresh the page
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload(); // Refresh the page
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.error('Error updating data:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Navigation Bar</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>} {/* Success message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="element1" className="block text-sm font-medium text-gray-700">Element 1</label>
          <input
            type="text"
            name="element1"
            id="element1"
            value={formData.element1}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element2" className="block text-sm font-medium text-gray-700">Element 2</label>
          <input
            type="text"
            name="element2"
            id="element2"
            value={formData.element2}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element3" className="block text-sm font-medium text-gray-700">Element 3</label>
          <input
            type="text"
            name="element3"
            id="element3"
            value={formData.element3}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TextInputForm;
