'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    return (
        <header className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto relative">
            <div className="flex items-center space-x-2">
                <Image
                    src="/icon.svg"
                    alt="Homelett Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                />
                <span className="text-xl font-semibold text-[#289264]">Homelett</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">


                <a href="https://truvend.co" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1">
                    <span>Are you an agent? Earn with us</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </nav>

            <div className="flex items-center space-x-4">
                {/* Download App Button - Hidden on mobile */}
                <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#289264] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <span className="text-xs md:text-sm text-white">Download App</span>
                    <Image src="/material-symbols-light--mobile-outline.svg" alt="Download App" width={20} height={20} className="w-5 h-5 text-white" />
                </button>

                {/* Mobile Hamburger Menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
                    <nav className="flex flex-col py-4 px-4">
                        <a
                            href="#"
                            className="py-3 text-gray-600 hover:text-black transition-colors border-b border-gray-100"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                            }}
                        >
                            Features
                        </a>
                        <a
                            href="https://truvend.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 text-gray-600 hover:text-black transition-colors border-b border-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Referral
                        </a>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsDownloadModalOpen(true);
                            }}
                            className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#289264] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full"
                        >
                            <span className="text-sm text-white">Download App</span>
                            <Image src="/material-symbols-light--mobile-outline.svg" alt="Download App" width={20} height={20} className="w-5 h-5 text-white" />
                        </button>
                    </nav>
                </div>
            )}

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
                                    <Image
                                        src="/famicons--logo-google-playstore.svg"
                                        alt="Google Play"
                                        width={48}
                                        height={48}
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
                                    <Image
                                        src="/ion--logo-apple-appstore.svg"
                                        alt="App Store"
                                        width={48}
                                        height={48}
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
        </header>
    );
}
