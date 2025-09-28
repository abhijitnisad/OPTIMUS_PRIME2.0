import React, { useState, useEffect } from 'react';

// --- ALL COMPONENT IMPORTS ---
import BusMitraSplash from "./component/BusMitraSplash.jsx"; 
import BusMitraLogin from "./component/BusMitraLogin.jsx";   
import BusMitraOTP from "./component/BusMitraOTP.jsx";       
import BusMitraUserForm from "./component/BusMitraUserForm.jsx"; 
import BusMitraHome from "./component/BusMitraHome.jsx"; 
import BusMitraJourneyList from "./component/BusMitraJourneyList.jsx"; 
import BusMitraJourneyDetails from "./component/BusMitraJourneyDetails.jsx"; 
import BusMitraStopDetails from "./component/BusMitraStopDetails.jsx"; 
import BusMitraJourneyComplete from "./component/BusMitraJourneyComplete.jsx"; 
import BusMitraSafetyPopup from "./component/BusMitraSafetyPopup.jsx"; 
import BusMitraEndJourneyPopup from "./component/BusMitraEndJourneyPopup.jsx"; 
import BusMitraLegendInfo from "./component/BusMitraLegendInfo.jsx"; 


// Define the two main journey directions (Punjab Theme)
const OUTWARD_TRIP = { id: 1, direction: 'OUTWARD', origin: 'Amritsar', destination: 'Ludhiana' };
const RETURN_TRIP = { id: 2, direction: 'RETURN', origin: 'Ludhiana', destination: 'Amritsar' };


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash'); 
  const [currentJourney, setCurrentJourney] = useState(OUTWARD_TRIP); 
  const [nextStopData, setNextStopData] = useState(null); 
  const [currentStopIndex, setCurrentStopIndex] = useState(0); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  // Modal Visibility States
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showLegendModal, setShowLegendModal] = useState(false);


  // --- INITIAL/AUTH FLOW HANDLERS ---
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        if (isLoggedIn) {
             setCurrentScreen('home');
        } else {
             setCurrentScreen('login'); 
        }
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [currentScreen, isLoggedIn]);

  const handleGoHome = () => setCurrentScreen('home');
  const handleViewJourneys = () => setCurrentScreen('journeyList');
  const handleGetOTP = () => setCurrentScreen('otp');
  
  // Simulated Auth Check
  const handleVerifyOTP = (otp) => {
    if (otp && otp.length === 4) {
        setIsLoggedIn(true); 
        setCurrentScreen('userForm'); 
    } else {
        alert("Simulated: Invalid OTP. Try again.");
    }
  };
  const handleSaveForm = (formData) => { setCurrentScreen('home'); };
  
  // --- JOURNEY FLOW HANDLERS ---
  const handleSelectJourney = (journeyId) => {
    setCurrentJourney(journeyId === OUTWARD_TRIP.id ? OUTWARD_TRIP : RETURN_TRIP);
    setCurrentStopIndex(0); 
    setShowSafetyModal(true); // <--- Triggers Safety Modal for screen transition
  };

  const handleConfirmStart = () => {
      setShowSafetyModal(false);
      // FIX: SCREEN TRANSITION OCCURS HERE
      setCurrentScreen('journeyDetails'); 
  };

  const handleShowStopDetails = (nextStop) => {
      setNextStopData(nextStop); 
      setCurrentScreen('stopDetails');
  };
  
  const handleBackToJourney = () => {
      setCurrentStopIndex(prevIndex => prevIndex + 1); 
      setNextStopData(null);
      setCurrentScreen('journeyDetails');
  };

  const handlePromptEndJourney = () => setShowEndModal(true); 
  const handleConfirmEnd = () => {
      setShowEndModal(false);
      setCurrentScreen('journeyComplete'); 
  };


  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <BusMitraSplash />;
      case 'login': return <BusMitraLogin onGetOTP={handleGetOTP} />;
      case 'otp': return <BusMitraOTP onVerify={handleVerifyOTP} />;
      case 'userForm': return <BusMitraUserForm onSave={handleSaveForm} onSkip={handleGoHome} />;
        
      case 'home': return <BusMitraHome onStartJourney={handleViewJourneys} />;
      case 'journeyList':
        return (<BusMitraJourneyList 
                onSelectJourney={handleSelectJourney}
                outwardId={OUTWARD_TRIP.id}
                returnId={RETURN_TRIP.id}
            />);
      case 'journeyDetails':
        return (
          <BusMitraJourneyDetails 
            tripData={currentJourney}
            currentStopIndex={currentStopIndex} 
            onEndJourney={handlePromptEndJourney} 
            onShowStopDetails={handleShowStopDetails}
            onShowLegend={() => setShowLegendModal(true)} 
          />
        );
      case 'stopDetails':
        return <BusMitraStopDetails 
            tripData={currentJourney} 
            nextStop={nextStopData} 
            onBackToJourney={handleBackToJourney} 
        />;
      case 'journeyComplete': return <BusMitraJourneyComplete onDone={handleGoHome} />;
        
      default: return <BusMitraHome onStartJourney={handleViewJourneys} />;
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-xl min-h-screen bg-gray-100 relative">
      {renderScreen()}
      
      {/* --- Overlay Modals (Must be outside renderScreen) --- */}
      
      {/* 1. Safety Checklist (Triggers on VIEW DETAILS click) */}
      {showSafetyModal && (
          <BusMitraSafetyPopup 
              onConfirmStart={handleConfirmStart} 
              onCancel={() => setShowSafetyModal(false)}
          />
      )}
      
      {/* 2. End Journey Confirmation */}
      {showEndModal && (
          <BusMitraEndJourneyPopup 
              onConfirmEnd={handleConfirmEnd} 
              onCancel={() => setShowEndModal(false)}
          />
      )}
      
      {/* 3. Legend/Information Display */}
      {showLegendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-40">
            <BusMitraLegendInfo onClose={() => setShowLegendModal(false)}/>
          </div>
      )}
    </div>
  );
};

export default App;