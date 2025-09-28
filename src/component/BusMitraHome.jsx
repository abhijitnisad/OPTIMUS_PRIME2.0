// src/component/BusMitraHome.jsx
import React from 'react';

const BusMitraHome = ({ onStartJourney }) => {
  const stats = {
    earnings: '460.86',
    speedRating: '3.8',
    drivingRating: '4.2',
    score: 78
  };

  const currentTrip = {
    origin: 'Amritsar',
    destination: 'Ludhiana',
    route: '43 Passengers • 15 Stops',
    distance: '142 kms, 3.5 hrs',
    departure: 'Amritsar 8:00 AM',
    arrival: 'Ludhiana 11:30 AM',
    hoursLeft: '1.5',
  };
  
  const StatBox = ({ title, value }) => (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </div>
  );
  
  const DrivingScoreMeter = ({ score }) => {
    const rotation = (score / 100) * 270 - 135; 

    return (
      <div className="flex flex-col items-center p-4">
        <div className="relative w-40 h-20 overflow-hidden">
          {/* Arcs (Red, Yellow, Green) and Needle logic remain the same */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[8px] border-gray-200"></div>
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[8px] border-red-500 [clip-path:polygon(50%_0%,_50%_50%,_0%_50%,_0%_0%)] [transform:rotate(-45deg)]"></div>
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[8px] border-yellow-500 [clip-path:polygon(50%_0%,_50%_50%,_0%_50%,_0%_0%)] [transform:rotate(45deg)]"></div>
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[8px] border-green-500 [clip-path:polygon(50%_0%,_50%_50%,_0%_50%,_0%_0%)] [transform:rotate(135deg)]"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full z-10"></div>
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0.5 h-16 bg-gray-700 origin-bottom rounded-full"
            style={{ transform: `translateX(-50%) translateY(4px) rotate(${rotation}deg)` }}
          ></div>
        </div>
        
        <p className="text-xl font-bold text-green-600 mt-2">{score}%</p>
        <p className="text-xl font-semibold text-gray-800 mt-1">Driving Score</p>
      </div>
    );
  };


  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50"> 
      <header className="p-4 pt-8 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">BusMitra</h1> 
          <span className="text-xl text-yellow-500 cursor-pointer">🔔</span>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Good Evening, Augustine!</h2>
        <p className="text-xs text-gray-500 mb-4">Here is your upcoming journey</p>

        {/* Current Trip Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className='flex justify-between items-start'>
            <p className="text-sm font-semibold text-gray-800">{currentTrip.origin} - {currentTrip.destination}</p>
            <p className="text-xs text-gray-500">{currentTrip.distance}</p>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">{currentTrip.route}</p>
          
          <div className="flex justify-between items-end mt-4">
              <div className="text-gray-600 space-y-1 text-sm">
                  <p className='flex items-center text-xs'><span className='w-2 h-2 rounded-full bg-green-500 mr-2'></span> {currentTrip.departure}</p>
                  <p className='flex items-center text-xs'><span className='w-2 h-2 rounded-full bg-red-500 mr-2'></span> {currentTrip.arrival}</p>
              </div>
              <div className="text-center bg-green-100/70 text-green-700 p-2 rounded-lg">
                  <p className="text-3xl font-bold">{currentTrip.hoursLeft}</p>
                  <p className="text-xs font-semibold">hours left</p>
              </div>
          </div>
        </div>
      </header>

      {/* Stats Section - Scrollable Area (FIXED TO PREVENT OVERLAP) */}
      <section className="p-4 flex-grow overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Your Stats</h3>
        
        {/* Earnings */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
            <p className="text-2xl font-extrabold text-gray-800">
                <span className='text-base font-semibold'>₹</span> {stats.earnings}
            </p>
            <p className="text-sm text-gray-500 font-medium mt-1">Total Earnings</p> 
        </div>
        
        {/* Ratings */}
        <div className="flex justify-around items-end bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
            <StatBox title="Speed Rating" value={stats.speedRating} />
            <div className='w-px h-10 bg-gray-200'></div>
            <StatBox title="Driving Rating" value={stats.drivingRating} />
        </div>
        
        {/* Driving Score */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-center">
            <DrivingScoreMeter score={stats.score} />
        </div>
        
        {/* FIX: Increased Spacer Height (h-20) to ensure the meter is fully above the footer */}
        <div className="h-20"></div> 
      </section>

      {/* Fixed bottom navigation */}
      <footer className="w-full bg-white border-t border-gray-200 p-3 shadow-2xl flex justify-around items-center">
        <button className="flex flex-col items-center text-xs text-gray-800"><span className="text-xl">🏠</span>Home</button>
        <button onClick={onStartJourney} className="flex flex-col items-center text-xs text-gray-500 hover:text-gray-800"><span className="text-xl">🚌</span>Journeys</button>
        <button className="flex flex-col items-center text-xs text-gray-500 hover:text-gray-800"><span className="text-xl">👤</span>Profile</button>
      </footer>
    </div>
  );
};

export default BusMitraHome;