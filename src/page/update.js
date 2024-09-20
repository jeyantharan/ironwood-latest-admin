import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Update = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    ShortDescription: '',
    Image: null,
    Map: '',
    Type: '',
    Phone: '',
    DirMap: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const { _id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://ironwood-backend.vercel.app/place/${_id}`);
      const data = response.data.En;
      setFormData({
        Name: data.Name,
        Description: data.Description,
        ShortDescription: data.ShortDescription,
        Image: data.Image,
        Map: data.Map,
        Type: data.Type,
        Phone: data.Phone,
        DirMap: data.DirMap
      });
      setImagePreview(data.Image);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Appending form fields, including the image file
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        if (key === 'Image' && formData.Image instanceof File) {
          dataToSend.append(key, formData.Image);
        } else {
          dataToSend.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await axios.put(`https://ironwood-backend.vercel.app/place/${_id}`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setShowPopup(true);

      // Reset the form
      setFormData({
        Name: '',
        Description: '',
        ShortDescription: '',
        Image: null,
        Map: '',
        Type: '',
        Phone: '',
        DirMap: ''
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Hide popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to update data. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className='flex justify-between mb-6'>
          <h1 className="text-2xl font-bold">Update Place</h1>
          <Link to="/view">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              View All Places
            </button>
          </Link>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input
              type="text"
              id="shortDescription"
              name="ShortDescription"
              value={formData.ShortDescription}
              onChange={handleChange}
              placeholder="Enter short description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="Description"
              placeholder="Enter description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              name="Image"
              onChange={handleChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={fileInputRef}
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Uploaded Preview" className="w-full h-auto rounded-lg" />
              </div>
            )}
          </div>

          {/* Map URL */}
          <div>
            <label htmlFor="map" className="block text-sm font-medium text-gray-700 mb-2">Map URL</label>
            <input
              type="text"
              id="map"
              name="Map"
              value={formData.Map}
              onChange={handleChange}
              placeholder="Enter map URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Map Direction URL */}
          <div>
            <label htmlFor="dirmap" className="block text-sm font-medium text-gray-700 mb-2">Map Direction URL</label>
            <input
              type="text"
              id="dirmap"
              name="DirMap"
              value={formData.DirMap}
              onChange={handleChange}
              placeholder="Enter direction URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              id="type"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Happy-Hours">Happy-Hours</option>
              <option value="Food-Shops">Food-Shops</option>
              <option value="Rentals">Rentals</option>
              <option value="Spa">Spa</option>
              <option value="SkiLifts">SkiLifts</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">Success!</h2>
            <p className="mt-2">The form was updated successfully.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
