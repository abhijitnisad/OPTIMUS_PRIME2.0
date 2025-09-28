// src/component/BusMitraSplash.jsx
import React from 'react';

const BusMitraSplash = () => {
  return (
    // Dark background matching the image
    <div className="flex h-screen w-full items-center justify-center bg-[#1e2a47]">
      <div className="text-center">
        
        {/* Logo/Icon */}
        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-[#1e2a47]">🚌</span>
        </div>
        
        {/* Name: Increased size (text-5xl) and applied bold style (font-extrabold) */}
        <h1 className="text-5xl font-extrabold text-white tracking-wide">BusMitra</h1>
        
        {/* Tagline: Slightly smaller and muted white */}
        <p className="text-base text-gray-300 mt-2">Your trusted travel companion</p>
      </div>
    </div>
  );
};

export default BusMitraSplash;