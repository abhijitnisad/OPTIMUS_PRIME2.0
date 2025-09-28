// src/component/BusMitraEndJourneyPopup.jsx
import React from 'react';

const BusMitraEndJourneyPopup = ({ onConfirmEnd, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-2">End Journey</h3>
        <p className="text-sm text-gray-600 mb-6">Are sure to end the journey?</p>
        
        <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside mb-8 ml-2">
          <li>Please check every passenger left the bus.</li>
          <li>Check for any belongings of passengers.</li>
        </ul>
        
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-gray-600 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmEnd}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition flex items-center justify-center space-x-2"
          >
            <span>End Journey</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusMitraEndJourneyPopup;