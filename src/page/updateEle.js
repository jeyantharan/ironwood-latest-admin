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
    element4: '',
    element5: '',
    element6: '',
    element7: '',
    element8: '',
  });

  const [formDataA, setFormDataA] = useState({
    weather: '',
    event: ''
  });

  // Fetch data from the API
  const fetchDataEle = async () => {
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/element/header/En');
      const response1 = await axios.get('https://ironwood-latest-backend.vercel.app/element/getLink');
      
      setData(response.data);
      setFormDataA({
        weather: response1.data.Weather,
        event: response1.data.Event,
      });

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
        element4: data[4] || '',
        element5: data[5] || '',
        element6: data[6] || '',
        element7: data[7] || '',
        element8: data[8] || '',
      });
    }
  }, [data]);

  // Unified handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of formData or formDataA
    if (name.startsWith('element')) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormDataA({ ...formDataA, [name]: value });
    }
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
        ele7: formData.element4,
        ele8: formData.element5,
        ele9: formData.element6,
        ele10: formData.element7,
        ele11: formData.element8,
        ele12: data[4],
        ele13: data[5],
        ele14: data[6],
        ele15: data[7],
        ele16: data[8],
        Weather: formDataA.weather,
        Event: formDataA.event,
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
        <div>
          <label htmlFor="element4" className="block text-sm font-medium text-gray-700">Element 4</label>
          <input
            type="text"
            name="element4"
            id="element4"
            value={formData.element4}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element5" className="block text-sm font-medium text-gray-700">Element 5</label>
          <input
            type="text"
            name="element5"
            id="element5"
            value={formData.element5}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element6" className="block text-sm font-medium text-gray-700">Element 6</label>
          <input
            type="text"
            name="element6"
            id="element6"
            value={formData.element6}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element7" className="block text-sm font-medium text-gray-700">Element 7</label>
          <input
            type="text"
            name="element7"
            id="element7"
            value={formData.element7}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="element8" className="block text-sm font-medium text-gray-700">Element 8</label>
          <input
            type="text"
            name="element8"
            id="element8"
            value={formData.element8}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="Weather" className="block text-sm font-medium text-gray-700">Weather Link</label>
          <input
            type="text"
            name="weather"
            id="Weather"
            value={formDataA.weather}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="Event" className="block text-sm font-medium text-gray-700">Event Link</label>
          <input
            type="text"
            name="event"
            id="Event"
            value={formDataA.event}
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
