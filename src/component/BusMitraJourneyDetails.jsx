// src/component/BusMitraJourneyDetails.jsx
import React, { useState, useEffect } from 'react';

// Define common stops for both directions
const commonStops = {
    OUTWARD: [
        { id: 1, time: '08:00 AM', location: 'Amritsar', passengers: 12, luggage: 12, isCurrent: true, eta: '1 hr 15 min' },
        { id: 2, time: '09:00 AM', location: 'Beas', passengers: 4, luggage: 18, isCurrent: false, eta: '2 hr 00 min' },
        { id: 3, time: '09:45 AM', location: 'Phagwara', passengers: 6, luggage: 17, isCurrent: false, eta: '3 hr 30 min' },
        { id: 4, time: '10:30 AM', location: 'Jalandhar', passengers: 6, luggage: 17, isCurrent: false, eta: '4 hr 00 min' },
        { id: 5, time: '11:00 AM', location: 'Phillaur', passengers: 11, luggage: 10, isCurrent: false, eta: '5 hr 00 min' },
        { id: 6, time: '11:30 AM', location: 'Ludhiana', passengers: 0, luggage: 0, isCurrent: false, eta: '0 hr 00 min' },
    ],
    RETURN: [
        { id: 6, time: '12:00 PM', location: 'Ludhiana', passengers: 0, luggage: 0, isCurrent: true, eta: '30 min' },
        { id: 5, time: '12:30 PM', location: 'Phillaur', passengers: 11, luggage: 10, isCurrent: false, eta: '1 hr 00 min' },
        { id: 4, time: '01:00 PM', location: 'Jalandhar', passengers: 6, luggage: 17, isCurrent: false, eta: '1 hr 45 min' },
        { id: 3, time: '01:45 PM', location: 'Phagwara', passengers: 6, luggage: 17, isCurrent: false, eta: '2 hr 30 min' },
        { id: 2, time: '02:30 PM', location: 'Beas', passengers: 4, luggage: 18, isCurrent: false, eta: '3 hr 30 min' },
        { id: 1, time: '03:30 PM', location: 'Amritsar', passengers: 12, luggage: 12, isCurrent: false, eta: '0 hr 00 min' },
    ]
};

// --- Sub-Components (TimelineStop, StaticMapPlaceholder, etc.) are omitted for brevity ---

// --- TimelineStop component
const TimelineStop = ({ data, finalDestination }) => (
    <div className="flex items-start">
        <div className="flex flex-col items-center mr-3">
            <div className={`w-3 h-3 rounded-full ${data.isCurrent ? 'bg-green-500 ring-2 ring-green-200' : 'bg-gray-400'}`}></div>
            {!data.location.includes(finalDestination) && (<div className="w-0.5 h-16 bg-gray-300"></div>)}
        </div>
        <div className="flex-1 pb-4">
            <div className='flex justify-between items-center'>
                <div>
                    <p className={`text-sm font-semibold ${data.isCurrent ? 'text-green-600' : 'text-gray-800'}`}>{data.time}</p>
                    <p className="text-md font-bold text-gray-800">{data.location}</p>
                </div>
                <div className='flex space-x-4 text-xs font-semibold text-gray-600'>
                    <div className='flex items-center space-x-1'><span className='text-green-500'>↑</span><span>{data.passengers}</span></div>
                    <div className='flex items-center space-x-1'><span className='text-red-500'>↓</span><span>{data.luggage}</span></div>
                </div>
            </div>
        </div>
    </div>
);

// --- StaticMapPlaceholder component
const StaticMapPlaceholder = ({ isReturn }) => {
    // Determine map markers/labels based on direction
    const startCity = isReturn ? 'Ludhiana' : 'Amritsar';
    const endCity = isReturn ? 'Amritsar' : 'Ludhiana';

    const pathD = isReturn 
        ? "M 85 10 C 90 25, 75 30, 70 35 L 60 40 C 50 50, 10 65, 25 80"
        : "M 25 80 C 10 65, 50 50, 60 40 L 70 35 C 75 30, 90 25, 85 10";
        
    const startMarkerPos = isReturn ? { cx: 85, cy: 10 } : { cx: 25, cy: 80 };
    const endMarkerPos = isReturn ? { cx: 25, cy: 80 } : { cx: 85, cy: 10 };

    return (
        <div className="relative w-full h-52 bg-gray-100 border-t border-gray-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center [background-color: #f0f0f0] opacity-80"></div>
            
            {/* --- RE-INSERTED CITY NAMES --- */}
            <div className="absolute inset-0 p-4 text-xs font-semibold">
                {/* End City (Top/Bottom position flips based on direction) */}
                <p className={`absolute ${isReturn ? 'bottom-[20%]' : 'top-[35%]' } right-[20%] text-blue-600 z-10`}>{endCity}</p>
                
                {/* Start City (Position flips based on direction) */}
                <p className={`absolute ${isReturn ? 'top-[35%]' : 'bottom-[20%]' } left-[25%] text-green-600 z-10`}>{startCity}</p>
                
                {/* Mid-Route City */}
                <p className="absolute bottom-[40%] right-[40%] text-gray-600 z-10">Phagwara</p>
            </div>
            {/* ----------------------------- */}

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={pathD} fill="none" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle {...startMarkerPos} r="1.5" fill="#1e2a47" stroke="white" strokeWidth="0.5" />
                <circle {...endMarkerPos} r="1.5" fill="#1e2a47" stroke="white" strokeWidth="0.5" />
            </svg>

            <a href="#" className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full shadow-md z-20">
                OPEN MAP VIEW
            </a>
        </div>
    );
};
// --- End Sub-Components ---


const BusMitraJourneyDetails = ({ tripData, onEndJourney, onShowStopDetails }) => {
  const [activeTab, setActiveTab] = useState('Journey Details'); 
  const [journeyStatus, setJourneyStatus] = useState('driving'); 
  
  const journeyStopData = commonStops[tripData.direction];
  
  const activeIndex = journeyStopData.findIndex(stop => stop.isCurrent) || 0;
  const nextStop = journeyStopData[activeIndex + 1] || journeyStopData[journeyStopData.length - 1];

  const nextStopName = nextStop.location;
  const nextStopETA = nextStop.eta;
  const finalDestinationName = journeyStopData[journeyStopData.length - 1].location;
  
  // Simulation for Approaching/Arrived states (5s each)
  useEffect(() => {
    if (journeyStatus === 'driving') {
      const approachingTimer = setTimeout(() => { setJourneyStatus('approaching'); }, 5000);
      return () => clearTimeout(approachingTimer);
    } else if (journeyStatus === 'approaching') {
      const arrivedTimer = setTimeout(() => { setJourneyStatus('arrived'); }, 5000);
      return () => clearTimeout(arrivedTimer);
    } 
  }, [journeyStatus]);

  const handlePrimaryButtonClick = () => {
    if (journeyStatus === 'arrived') {
        if (nextStopName === finalDestinationName) {
            onEndJourney(); 
        } else {
            // FIX: Pass the specific nextStop object for display
            onShowStopDetails(nextStop); 
        }
    } else {
      console.log('Driving...');
    }
  };

  const primaryButtonText = () => {
    if (journeyStatus !== 'arrived') { return 'Continue Trip'; }
    return nextStopName === finalDestinationName ? 'End Journey' : 'Complete Boarding';
  };
  
  // Dynamic Banner Content
  let bannerContent = null;
  if (journeyStatus === 'approaching') {
      bannerContent = ( <div className="absolute top-0 w-full bg-yellow-500 text-white text-center py-2 text-sm font-semibold z-10 animate-pulse"> Approaching {nextStopName} in {nextStopETA} </div> );
  } else if (journeyStatus === 'arrived') {
      bannerContent = ( <div className="absolute top-0 w-full bg-green-600 text-white text-center py-2 text-sm font-bold z-10"> Now arriving {nextStopName} </div> );
  }

  const tripInfo = {
    route: `${tripData.origin} to ${tripData.destination}`,
    stats: '48 Passengers • 15 Stops',
    time: '3.5 HOURS',
    distance: '3.5 hrs • 142 kms'
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white relative">
      {bannerContent}
      
      <header className={`p-4 pt-8 text-white flex items-center justify-between bg-[#1e2a47] transition-all duration-300 ${journeyStatus !== 'driving' ? 'mt-8' : ''}`}>
        <div className='flex items-center'>
            <span className="mr-3 text-lg cursor-pointer">←</span>
            <h1 className="text-xl font-semibold">{tripInfo.route}</h1>
        </div>
        <span className="text-sm font-semibold text-gray-300 border border-gray-500/50 rounded-md px-2 py-1">{tripInfo.time}</span>
      </header>
      
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <p className="text-sm text-gray-600 font-medium">{tripInfo.stats}</p>
          <span className="text-sm text-gray-500 cursor-pointer">ⓘ Info</span>
      </div>

      <div className="flex-grow overflow-y-auto">
        <StaticMapPlaceholder isReturn={tripData.direction === 'RETURN'} />
        
        {/* Next Stop Card */}
        <div className='bg-white p-4 rounded-lg shadow-md border-t border-gray-200'>
            <h4 className='text-sm font-bold text-gray-800 mb-2'>Next Stop</h4>
            <div className='flex justify-between items-center text-sm'>
                <p className='text-gray-600 font-semibold'>{nextStopName}</p>
                <div className='flex space-x-4 text-xs font-semibold text-gray-600'>
                    <span className='text-green-500'>↑ {nextStop.passengers} (Boarding)</span>
                    <span className='text-red-500'>↓ {nextStop.luggage} (Alighting)</span>
                </div>
            </div>
            <p className='text-xs text-gray-500 mt-1'>ETA: {nextStopETA}</p>
        </div>
        
        {/* Tabs and Timeline */}
        <div className='flex justify-center bg-white border-b border-gray-200 mt-4'>
            <button onClick={() => setActiveTab('Journey Details')} className={`py-2 px-6 text-sm font-semibold transition ${activeTab === 'Journey Details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Journey Details</button>
            <button onClick={() => setActiveTab('Stop Details')} className={`py-2 px-6 text-sm font-semibold transition ${activeTab === 'Stop Details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Stop Details</button>
        </div>

        <div className="p-4 pt-4">
            <p className="text-sm text-gray-500 font-medium mb-4">{tripInfo.distance}</p>
            {journeyStopData.map((stop, index) => (
                <TimelineStop key={index} data={stop} finalDestination={finalDestinationName} />
            ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex space-x-4">
        <button className="flex-1 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition">Emergency Stop</button>
        <button
          onClick={handlePrimaryButtonClick}
          className={`flex-1 py-3 rounded-lg font-semibold text-white transition ${journeyStatus === 'arrived' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={journeyStatus !== 'arrived'}
        >
          {primaryButtonText()}
        </button>
      </div>
    </div>
  );
};

export default BusMitraJourneyDetails;