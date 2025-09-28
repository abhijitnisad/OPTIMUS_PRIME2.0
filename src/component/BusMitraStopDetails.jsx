// src/component/BusMitraStopDetails.jsx
import React from 'react';

// Passenger list with Punjabi names (Remains consistent)
const passengers = [
    { id: 1, name: 'Sukhdev Singh 45 Male', status: 'UL 11', icon: '↑' },
    { id: 2, name: 'Ranjit Kaur 38 Female', status: 'UL 12', icon: '↓' },
    { id: 3, name: 'Gurbaksh Gill 22 Male', status: 'UL 13', icon: '↑' },
    { id: 4, name: 'Simranjeet Kaur 26 Female', status: 'UL 14', icon: '↑' },
    { id: 5, name: 'Manpreet Singh 30 Male', status: 'UL 15', icon: '↓' },
    { id: 6, name: 'Harmanjot Kaur 20 Female', status: 'UL 16', icon: '↑' },
];

const PassengerRow = ({ data }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center space-x-4">
            <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${data.icon === '↑' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {data.icon}
            </span>
            <span className="text-sm font-semibold text-gray-800">{data.status}</span>
        </div>
        <p className="text-sm text-gray-700 font-medium flex-1 pl-4">{data.name}</p>
        <button className='text-sm text-gray-400'>...</button>
    </div>
);

const BusMitraStopDetails = ({ onBackToJourney, tripData, nextStop }) => {
  const currentRoute = `${tripData.origin} to ${tripData.destination}`;

  // Dynamically derive display information from the passed nextStop object
  const stopName = nextStop ? nextStop.location : 'Loading Stop';
  const etaTime = nextStop ? nextStop.time : 'N/A'; // Use scheduled time for display
  
  const displayInfo = {
    stats: '48 Passengers • 15 Stops',
    distance: '18 KM' 
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <header className="p-4 pt-8 bg-[#1e2a47] text-white flex items-center justify-between">
        <div className='flex items-center'>
            <span onClick={onBackToJourney} className="mr-3 text-lg cursor-pointer">←</span>
            <h1 className="text-xl font-semibold">Stop Details</h1>
        </div>
      </header>
      
      <div className="p-4 bg-white border-b border-gray-200">
          <h2 className="text-md font-bold text-gray-800">{currentRoute}</h2>
          <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600 font-medium">{displayInfo.stats}</p>
              <span className="text-sm text-gray-500 cursor-pointer">ⓘ Info</span>
          </div>
          
          <div className="flex justify-between items-center text-sm font-semibold text-gray-600 mt-4 py-2 border-t border-gray-100">
              <span>ETA: {etaTime}</span>
              <span>{displayInfo.distance}</span>
          </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Stop - {stopName}</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
              {passengers.map(p => (
                  <PassengerRow key={p.id} data={p} />
              ))}
          </div>
      </div>
      
      <footer className="w-full bg-white border-t border-gray-200 p-4 shadow-2xl">
          <button
            onClick={onBackToJourney}
            className="w-full bg-[#1e2a47] text-white py-3 rounded-lg font-semibold shadow-md transition hover:bg-blue-900"
          >
            Back to Journey
          </button>
      </footer>
    </div>
  );
};

export default BusMitraStopDetails;