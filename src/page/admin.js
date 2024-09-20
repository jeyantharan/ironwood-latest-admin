import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link to="/panel">
        <div className="bg-white hover:bg-gray-300 shadow-lg rounded-lg p-6 max-w-sm mx-auto text-center cursor-pointer">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            Ironwood Admin
          </h1>
          <br />
            
        </div>
      </Link>
    </div>
  );
};

export default Admin;
