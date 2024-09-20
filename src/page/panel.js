import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Panel = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    ShortDescription: '',
    Image: null,
    Map: '',
    Type: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null); // Ref for the file input

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setImagePreview(URL.createObjectURL(files[0])); // Create a URL for the selected file
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    console.log(dataToSend);
    
    try {
      const response = await axios.post('https://ironwood-backend.vercel.app/place/createPlace', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      // Show success popup
      setShowPopup(true);

      // Clear the form, image preview, and file input
      setFormData({
        Name: '',
        Description: '',
        ShortDescription: '',
        Image: null,
        Map: '',
        Type: '',
        Phone:'',
        DirMap:''
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-6">ADD PLACES</h1>
        <Link to="/view">
          <button  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          View All Places
          </button>
        </Link>
        </div>
       
        <form className="space-y-6" onSubmit={handleSubmit}>
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

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              id="phone"
              name="Phone"
              placeholder="Enter phone number"
              value={formData.Phone}
              onChange={handleChange}
              rows="4"
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
              ref={fileInputRef} // Attach ref to the file input
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
              Submit
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">Success!</h2>
            <p className="mt-2">The form was submitted successfully.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-zinc-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
