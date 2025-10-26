import React from 'react';
import RightHero from './RightHero';
import LeftHero from './LeftHero';
import TrustedBy from './TrustedBy';

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-4 min-h-screen flex items-center flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch min-h-[0vh] lg:min-h-[70vh] w-full">
                {/* Left Column - Content */}
                <LeftHero />

                {/* Right Column - House Background - Hidden on mobile */}
                <div className="hidden lg:block">
                    <RightHero />
                </div>
            </div>

            {/* Mobile Features Section */}
            <div className="lg:hidden w-full mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#F0F9F4]">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-xs font-medium text-gray-700">Rent Collection</div>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#F0F4FF]">
                        <div className="text-2xl mb-2">📋</div>
                        <div className="text-xs font-medium text-gray-700">Billing</div>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#FFFBEB]">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-xs font-medium text-gray-700">Utility Metering</div>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#F5F3FF]">
                        <div className="text-2xl mb-2">📝</div>
                        <div className="text-xs font-medium text-gray-700">Document Signing</div>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#F0FDF4]">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-xs font-medium text-gray-700">Record Keeping</div>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col items-center justify-center text-center bg-[#FEF2F2]">
                        <div className="text-2xl mb-2">📈</div>
                        <div className="text-xs font-medium text-gray-700">Analytics</div>
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <TrustedBy />
        </div>
    );
}
