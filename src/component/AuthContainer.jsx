// src/component/AuthContainer.jsx

import React, { useState } from 'react';
import BusMitraLogin from './BusMitraLogin';
import BusMitraOTP from './BusMitraOTP';
import BusMitraUserForm from './BusMitraUserForm';

const AuthContainer = ({ onAuthenticationComplete }) => {
    const [flowStep, setFlowStep] = useState('login'); // 'login', 'otp', or 'userForm'
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(new Array(4).fill(''));

    const PRIMARY_COLOR = 'bg-gray-800';

    // --- Flow Handlers ---
    const handleGetOTP = (number) => {
        setMobile(number);
        // API call to send OTP...
        setFlowStep('otp');
    };

    const handleLogin = (fullOtp) => {
        // API call to verify OTP...
        if (fullOtp.length === 4) {
            setFlowStep('userForm');
        }
    };

    const handleBackToLogin = () => {
        setFlowStep('login');
        setOtp(new Array(4).fill(''));
    };

    // --- Render Logic ---
    const renderContent = () => {
        switch (flowStep) {
            case 'login':
                return <BusMitraLogin mobile={mobile} setMobile={setMobile} onGetOTP={() => handleGetOTP(mobile)} />;
            case 'otp':
                return <BusMitraOTP 
                            mobile={mobile} 
                            otp={otp} 
                            setOtp={setOtp} 
                            onLogin={() => handleLogin(otp.join(''))} 
                            onEditNumber={handleBackToLogin}
                        />;
            case 'userForm':
                // User form calls this when Save/Skip is pressed
                return <BusMitraUserForm onComplete={onAuthenticationComplete} />;
            default:
                return null;
        }
    };

    return (
        // Simulates a smartphone frame: Fixed max size, border, shadow
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="w-full max-w-sm h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 flex flex-col">
                
                {/* Status Bar */}
                <div className="w-full h-8 bg-gray-900 flex items-center justify-center text-xs text-white">
                    <span className="font-semibold">BusMitra | 10:30 AM</span>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-8 overflow-y-auto">
                    {/* Common Logo/Title */}
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">BusMitra</h1>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;