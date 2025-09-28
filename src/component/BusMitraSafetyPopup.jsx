// src/component/BusMitraSafetyPopup.jsx
import React from 'react';

const BusMitraSafetyPopup = ({ onConfirmStart, onCancel }) => {
  const sopItems = [
    "Follow traffic rules and maintain the speed limits, if limit exceeds it affects your driving score.",
    "Respect the passengers and maintain a polite demeanor.",
    "Greet the passengers with respect.",
    "Don't drive under the influence (DUI); you'll be replaced by other drivers if found guilty.",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Safety Information</h3>
        <p className="text-sm text-gray-600 mb-6">Before starting the journey be sure of below mentioned SOPs</p>
        
        <ul className="space-y-4 text-sm text-gray-700 mb-6">
          {sopItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-3 text-lg leading-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
        
        <button
          onClick={onConfirmStart}
          className="w-full bg-[#1e2a47] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-900 transition"
        >
          I agree / Start Journey
        </button>

        {onCancel && (
            <button
              onClick={onCancel}
              className="w-full mt-3 py-3 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
        )}
      </div>
    </div>
  );
};

export default BusMitraSafetyPopup;
