// src/component/BusMitraJourneyComplete.jsx
import React from 'react';

const BusMitraJourneyComplete = ({ onDone }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-white p-6 items-center justify-center">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Journey Completed Successfully</h1>
        <p className="text-gray-500 mb-10 max-w-xs mx-auto">
          The journey has been completed successfully. You can now relax and prepare for the next trip.
        </p>
        
        <button
          onClick={onDone}
          className="w-full max-w-xs bg-[#1e2a47] text-white py-3 rounded-lg font-semibold shadow-md transition hover:bg-blue-900"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default BusMitraJourneyComplete;
