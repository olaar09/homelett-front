import React from 'react';
import RightHero from './RightHero';
import LeftHero from './LeftHero';
import TrustedBy from './TrustedBy';

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-4 min-h-screen flex items-center flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch min-h-[70vh] w-full">
                {/* Left Column - Content */}
                <LeftHero />

                {/* Right Column - House Background */}
                <RightHero />
            </div>

            {/* Trusted By Section */}
            <TrustedBy />
        </div>
    );
}
