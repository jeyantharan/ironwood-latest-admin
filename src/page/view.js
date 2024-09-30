import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function View() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  let newArray = [];

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/place/allPlace');
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index].En;
        
        element._id = response.data[index]._id

        newArray.push(element)

      }
      setData(newArray);
      
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    
    if (confirmDelete) {
      try {
        await axios.delete(`https://ironwood-latest-backend.vercel.app/place/${id}`);
        // If delete was successful, filter the deleted item from the UI
        setData((prevData) => prevData.filter((item) => item._id !== id));
        setSuccessMessage('Item successfully deleted!');
      } catch (err) {
        setError('Error deleting the item.');
      }
    }
  };

  return (
    <div className="p-8">
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Image</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{item._id}</td>
                <td className="px-4 py-2 text-sm">{item.Name}</td>
                <td className="px-4 py-2 text-sm">{item.Type}</td>
                <td className="px-4 py-2 text-sm">{item.Phone}</td>
                <td className="px-4 py-2 text-sm">
                  <img
                    src={item.Image}
                    alt="Item"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm">
                  <Link
                    to={`/update/${item._id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
