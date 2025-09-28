// src/component/BusMitraOTP.jsx
import React, { useState, useEffect } from 'react';

const BusMitraOTP = ({ mobileNumber = '+91 9876543210', onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handler for OTP input change and auto-focus
  const handleOtpChange = (index, value) => {
    // Only allow single digit input
    const char = value.slice(-1); 
    if (!/^\d*$/.test(char)) return; // Only accept digits

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (char && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleLoginOrGetStarted = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      onVerify(fullOtp);
    } else {
      alert("Please enter the full 4-digit OTP.");
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
          <p className="text-gray-500 mb-8 text-sm">
            Enter the verification code sent to <span className="font-semibold">{mobileNumber}</span>
            <span className="text-blue-600 ml-2 cursor-pointer">✏️</span>
          </p>

          {/* OTP Input fields */}
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="tel"
                maxLength="1"
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-[#1e2a47] outline-none"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onFocus={(e) => e.target.select()} // Select existing text on focus
              />
            ))}
          </div>

          <div className="flex justify-end text-sm mb-12">
            {timer > 0 ? (
                <span className="text-gray-500">Resend in <span className="text-red-500 font-semibold">{timer}s</span></span>
            ) : (
                <button 
                    onClick={() => setTimer(30)} 
                    className="text-blue-600 font-semibold hover:text-blue-800"
                >
                    Resend OTP
                </button>
            )}
          </div>

          <button
            onClick={handleLoginOrGetStarted}
            className="w-full bg-[#1e2a47] text-white py-3 rounded-lg font-semibold shadow-md transition duration-150 hover:bg-blue-900 active:bg-blue-800"
          >
            Login / Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusMitraOTP;