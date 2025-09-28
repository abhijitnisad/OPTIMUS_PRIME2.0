// src/component/BusMitraJourneyList.jsx
import React, { useState } from 'react';

const JourneyCard = ({ journey, onSelect }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3 flex flex-col">
    <div className='flex justify-between items-start'>
        <h4 className="font-semibold text-gray-800">{journey.origin} to {journey.destination}</h4>
        <span className='text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full'>{journey.indicator}</span>
    </div>
    <p className="text-sm text-gray-500 mt-1">{journey.route}</p>
    <div className='flex justify-between items-center mt-3'>
        <p className="text-sm text-gray-700">{journey.time}</p>
        <button
            // ACTION: Ensure the correct ID is passed to trigger the flow (1 or 2)
            onClick={() => onSelect(journey.id)} 
            className="text-xs py-2 px-4 rounded-full font-semibold bg-gray-200 text-gray-700 transition hover:bg-gray-300"
        >
            VIEW DETAILS &gt;
        </button>
    </div>
  </div>
);

const BusMitraJourneyList = ({ onSelectJourney }) => {
  // Use unique IDs (1 and 2) that map to OUTWARD_TRIP and RETURN_TRIP in App.jsx
  const todayJourneys = [
    { id: 1, origin: 'Amritsar', destination: 'Ludhiana', route: '48 Passengers • 15 Stops', time: '6:50 AM', indicator: 'IN 4 HOURS' }, // Maps to OUTWARD_TRIP (ID 1)
    { id: 2, origin: 'Jalandhar', destination: 'Patiala', route: '45 Passengers • 12 Stops', time: '12:10 PM', indicator: 'IN 10 HOURS' }, 
  ];

  const tomorrowJourneys = [
    // Use a placeholder ID (e.g., 1 or 2) for the tomorrow journey to test the flow
    { id: 1, origin: 'Ludhiana', destination: 'Chandigarh', route: '50 Passengers • 18 Stops', time: '12:10 PM', indicator: 'TOMORROW' }, 
  ];
  
  const [activeTab, setActiveTab] = useState('Upcoming'); 

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <header className="p-4 pt-8 bg-[#1e2a47] text-white flex items-center">
        <span className="mr-3 text-lg cursor-pointer">←</span>
        <h1 className="text-xl font-semibold">Journeys</h1>
      </header>

      <div className='bg-white p-4 flex justify-start space-x-8 border-b border-gray-200'>
        <button 
            onClick={() => setActiveTab('Upcoming')}
            className={`font-semibold pb-1 transition ${activeTab === 'Upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
            Upcoming
        </button>
        <button 
            onClick={() => setActiveTab('Past')}
            className={`font-semibold pb-1 transition ${activeTab === 'Past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
            Past
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === 'Upcoming' && (
            <>
                <h3 className="text-lg font-bold text-gray-800 mb-3 mt-2">Today</h3>
                <div className="mb-6">
                    {todayJourneys.map(j => (
                        <JourneyCard key={j.id} journey={j} onSelect={onSelectJourney} />
                    ))}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3">Tomorrow</h3>
                <div>
                    {tomorrowJourneys.map(j => (
                        <JourneyCard key={j.id} journey={j} onSelect={onSelectJourney} />
                    ))}
                </div>
            </>
        )}
        {activeTab === 'Past' && (
            <p className='text-center text-gray-500 mt-10'>No past journeys found.</p>
        )}
      </div>
      
      {/* Primary Bottom Button - Always triggers the first trip for flow stability */}
      <footer className="w-full bg-white border-t border-gray-200 p-4 shadow-2xl flex justify-center">
          <button
            // ACTION: Explicitly select the first trip ID (ID 1: Amritsar to Ludhiana)
            onClick={() => { onSelectJourney(1); }} 
            className="flex items-center space-x-2 bg-[#1e2a47] text-white py-3 px-8 rounded-lg font-semibold shadow-md transition hover:bg-blue-900"
          >
            <span className='text-lg'>🚌</span>
            <span>Journey</span>
          </button>
      </footer>
    </div>
  );
};

export default BusMitraJourneyList;