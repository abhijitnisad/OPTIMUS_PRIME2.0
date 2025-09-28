// src/component/BusMitraUserForm.jsx

import React, { useState } from 'react';

const BusMitraUserForm = ({ onSave, onSkip }) => {
  const [formData, setFormData] = useState({
    name: 'Gurpreet Singh', // Changed name
    email: 'gurpreet.driver@busmitra.in', // Changed email
    age: '35', // Changed age
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Placeholder logic - this is where you would call your server API.
    if (formData.name && formData.email && formData.age) {
        onSave(formData);
    } else {
        alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white p-6">
      <div className="flex flex-col items-center pt-20 flex-grow">
        
        {/* Logo/Header */}
        <div className="mx-auto w-12 h-12 bg-[#1e2a47] rounded-full flex items-center justify-center mb-4">
          <span className="text-xl text-white">🚌</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">BusMitra</h1>

        <div className="text-center w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-2">Enter your information</h2>
          <p className="text-gray-500 mb-8 text-sm">Fill-up your personal information for seamless experience</p>

          <form onSubmit={handleSave} className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e2a47] focus:border-[#1e2a47] outline-none"
                placeholder="Jaspreet Kaur" // Placeholder for Punjab theme
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e2a47] focus:border-[#1e2a47] outline-none"
                placeholder="driver.info@busmitra.in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                inputMode="numeric"
                className="mt-1 w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e2a47] focus:border-[#1e2a47] outline-none"
                placeholder="30"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between items-center pt-10">
              <button
                type="button"
                onClick={onSkip}
                className="text-gray-500 font-semibold py-3 px-6 hover:text-[#1e2a47]"
              >
                Skip
              </button>
              <button
                type="submit"
                className="bg-[#1e2a47] text-white py-3 px-10 rounded-lg font-semibold shadow-md transition duration-150 ease-in-out hover:bg-blue-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusMitraUserForm;