import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const MobileAppDownloadPage = () => {
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
                                <p className="text-xs text-gray-500">Resident App</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon icon="mdi:check" className="text-green-600 text-sm" />
                        </div>
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
                            Download the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Truvend App</span>
                        </h2>
                        <p className="text-gray-600 text-base">
                            Get the mobile app for the best experience managing your home and payments.
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

                    {/* Simple Features */}
                    <div className="mt-6 flex justify-center space-x-6 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Icon icon="mdi:lightning-bolt" className="text-purple-500" />
                            <span>Quick Payments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon icon="mdi:bell-outline" className="text-orange-500" />
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon icon="mdi:chart-line" className="text-teal-500" />
                            <span>Analytics</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileAppDownloadPage; 