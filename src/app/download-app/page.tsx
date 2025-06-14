"use client";

import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const DownloadAppPage = () => {
    const handleAndroidDownload = () => {
        window.open("https://play.google.com/store/apps/details?id=com.truvend.app", "_blank");
    };

    const handleiOSDownload = () => {
        window.open("https://apps.apple.com/ng/app/truvend/id6746784465", "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Icon icon="mdi:home" className="text-white text-lg" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Homelett</h1>
                                <p className="text-xs text-gray-500">Resident Platform</p>
                            </div>
                        </div>
                        <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                <div className="max-w-sm w-full text-center">
                    {/* Mobile Phone Illustration */}
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <div className="w-20 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-xl flex items-center justify-center border-2 border-white">
                                <div className="w-16 h-32 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center">
                                    <Icon icon="mdi:home" className="text-white text-2xl mb-1" />
                                    <div className="w-10 h-0.5 bg-white/30 rounded-full mb-0.5"></div>
                                    <div className="w-8 h-0.5 bg-white/20 rounded-full mb-0.5"></div>
                                    <div className="w-9 h-0.5 bg-white/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Get Started with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Truvend App</span>
                        </h2>
                        <p className="text-gray-600 text-base">
                            To get started as a new resident, please download our mobile app and complete your registration there.
                        </p>
                    </div>

                    {/* Download Buttons */}
                    <div className="space-y-3">
                        {/* Android Download Button */}
                        <button
                            onClick={handleAndroidDownload}
                            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-lg group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                        <Icon icon="mdi:android" className="text-white text-xl" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500 font-medium">Download for</p>
                                        <p className="text-base font-bold text-gray-900">Android</p>
                                    </div>
                                </div>
                                <Icon icon="mdi:arrow-right" className="text-gray-400 group-hover:text-green-500 transition-colors duration-300 text-lg" />
                            </div>
                        </button>

                        {/* iOS Download Button */}
                        <button
                            onClick={handleiOSDownload}
                            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-lg group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                        <Icon icon="mdi:apple" className="text-white text-xl" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500 font-medium">Download for</p>
                                        <p className="text-base font-bold text-gray-900">iOS</p>
                                    </div>
                                </div>
                                <Icon icon="mdi:arrow-right" className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 text-lg" />
                            </div>
                        </button>
                    </div>

                    {/* Steps */}
                    <div className="mt-8 text-left">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Next Steps:</h3>
                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-start space-x-2">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 text-xs font-bold">1</span>
                                </div>
                                <p>Download the Truvend app from your app store</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 text-xs font-bold">2</span>
                                </div>
                                <p>Complete your registration and verification</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-blue-600 text-xs font-bold">3</span>
                                </div>
                                <p>Start managing your home and payments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadAppPage; 