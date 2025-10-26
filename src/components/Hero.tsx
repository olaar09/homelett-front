'use client';

import React, { useState } from 'react';
import RightHero from './RightHero';
import LeftHero from './LeftHero';

export default function Hero() {
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 min-h-screen flex items-center flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch min-h-[0vh] lg:min-h-[70vh] w-full">
                {/* Left Column - Content */}
                <LeftHero onDownloadClick={() => setIsDownloadModalOpen(true)} />

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

            {/* Download Modal */}
            {isDownloadModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
                    onClick={() => setIsDownloadModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-t-xl md:rounded-lg p-6 max-w-md w-full md:w-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drag Handle - Mobile Only */}
                        <div className="md:hidden flex justify-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Download Homelett App</h2>
                            <button
                                onClick={() => setIsDownloadModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="https://play.google.com/store/apps/details?id=co.truvend.admin&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src="/famicons--logo-google-playstore.svg"
                                        alt="Google Play"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">Download for Android</p>
                                    <p className="text-sm text-gray-600">Get it on Google Play</p>
                                </div>
                            </a>

                            <a
                                href="https://apps.apple.com/ng/app/homelett/id6746981644"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src="/ion--logo-apple-appstore.svg"
                                        alt="App Store"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">Download for iOS</p>
                                    <p className="text-sm text-gray-600">Available on the App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
