import React from 'react';
import Image from 'next/image';

const TrustedBy = () => {
    // Sample landlord avatars - you can replace these with actual profile images
    const landlordAvatars = [
        { src: '/avatar-1.jpg', name: 'James K.' },
        { src: '/avatar-2.jpg', name: 'Sarah M.' },
        { src: '/avatar-3.jpg', name: 'David L.' },
        { src: '/avatar-4.jpg', name: 'Emma T.' },
        { src: '/avatar-5.jpg', name: 'Michael R.' },
    ];

    return (
        <div className="py-0 px-4 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-start gap-6 md:gap-8">
                    {/* Landlord Avatars */}
                    {/*        <div className="flex items-center">
                        {landlordAvatars.map((landlord, index) => (
                            <div
                                key={index}
                                className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                                style={{
                                    marginLeft: index > 0 ? '-12px' : '0',
                                    zIndex: landlordAvatars.length - index,
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                                    {landlord.name.split(' ')[0][0]}
                                </div>
                            </div>
                        ))}
                    </div> */}

                    {/* Text and Star Rating */}
                    <div className="flex flex-col items-start gap-2">
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-xs md:text-sm font-semibold text-gray-900">
                                Trusted by over <span className="text-[#289264]">500 landlords</span>
                            </span>
                        </div>
                        {/* 5-Star Rating */}
                        <div className="hidden md:flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-5 h-5 text-yellow-400 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">5.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
