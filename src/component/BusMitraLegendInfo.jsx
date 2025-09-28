// src/component/BusMitraLegendInfo.jsx
import React from 'react';

const LegendItem = ({ icon, text, description }) => (
  <div className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
    <div className="w-12 text-2xl text-gray-700 flex items-center justify-center pt-1">
      {icon === 'person' && <span>👤</span>}
      {icon === 'stop' && <span>🛑</span>}
      {icon === 'mile' && <span>🧭</span>}
      {icon === 'ascend' && <span className="text-green-600">↑</span>}
      {icon === 'drop' && <span className="text-red-600">↓</span>}
    </div>
    <div className="flex-1">
      <p className="text-md font-semibold text-gray-800">{text}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  </div>
);

const BusMitraLegendInfo = ({ onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Legend Information</h3>
      
      <div>
        <LegendItem icon="person" text="Passengers" description="Total count of travelers." />
        <LegendItem icon="stop" text="Stops" description="Scheduled halt points on the route." />
        <LegendItem icon="mile" text="Kilometres / Miles" description="Distance covered/remaining." />
        <LegendItem icon="ascend" text="Passenger Boarding" description="Passengers getting on the bus." />
        <LegendItem icon="drop" text="Passenger Alighting" description="Passengers getting off the bus." />
      </div>

      <button
        onClick={onClose}
        className="w-full mt-6 py-2 text-sm font-semibold text-[#1e2a47] border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  );
};

export default BusMitraLegendInfo;