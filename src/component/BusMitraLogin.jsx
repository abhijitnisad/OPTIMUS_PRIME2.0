// src/component/BusMitraLogin.jsx
import React, { useState } from 'react';

const BusMitraLogin = ({ onGetOTP }) => {
  const [mobileNumber, setMobileNumber] = useState('+91 9876543210'); // Pre-filled for demo

  const handleLogin = () => {
    // In a real app, you'd send the number to an API
    if (mobileNumber.length > 5) {
      onGetOTP(mobileNumber);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white p-6">
      <div className="flex flex-col items-center pt-20 flex-grow">
        {/* Logo/Header */}
        <div className="w-12 h-12 bg-[#1e2a47] rounded-full flex items-center justify-center mb-4">
          <span className="text-xl text-white">🚌</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">BusMitra</h1>

        <div className="mt-16 text-center w-full max-w-xs">
          <h2 className="text-xl font-semibold mb-2">Welcome to BusMitra</h2>
          <p className="text-gray-500 mb-8 text-sm">Login using your mobile number to sign in</p>

          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 text-left mb-1">
            Your mobile number
          </label>
          <input
            id="mobile"
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-[#1e2a47] focus:border-[#1e2a47] mb-12 outline-none"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#1e2a47] text-white py-3 rounded-lg font-semibold shadow-md transition duration-150 hover:bg-blue-900 active:bg-blue-800"
          >
            Get OTP
          </button>
        </div>
      </div>

      <div className="text-center pb-4 text-xs text-gray-500 max-w-xs mx-auto">
        <p>By proceeding, you agree to our <span className="font-semibold text-[#1e2a47]">Privacy policy</span> and <span className="font-semibold text-[#1e2a47]">Terms and Conditions</span></p>
      </div>
    </div>
  );
};

export default BusMitraLogin;