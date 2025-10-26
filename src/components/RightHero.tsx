import React from "react";
import Image from 'next/image';

const transactionTypes = {
    "Rent Collection": { icon: "💰", color: "#F0F9F4" },
    "Billing": { icon: "📋", color: "#F0F4FF" },
    "Utility Metering": { icon: "⚡", color: "#FFFBEB" },
    "Document Signing": { icon: "📝", color: "#F5F3FF" },
    "Record Keeping": { icon: "📊", color: "#F0FDF4" },
    "Analytics": { icon: "📈", color: "#FEF2F2" },
};

const RightHero = () => {
    const transactions = [
        { type: "Rent Collection", company: "Capital Construction", amount: "$11419.00", method: "ACH", angle: 0, distance: 200 },
        { type: "Billing", company: "Clean Glass Co", angle: 60, distance: 200 },
        { type: "Utility Metering", company: "Top Roofing Inc", amount: "$4389.00", method: "AM EX", angle: 120, distance: 200 },
        { type: "Document Signing", company: "Precision Co", amount: "$4389.00", method: "VISA", angle: 180, distance: 200 },
        { type: "Record Keeping", company: "Arg Constructions", amount: "$1880.00", method: "ACH", angle: 240, distance: 200 },
        { type: "Analytics", company: "Elite Concrete", amount: "$8419.00", method: "VISA", angle: 300, distance: 200 },
    ];

    // Calculate positions based on angle and distance from center (in pixels)
    const containerWidth = 600;
    const containerHeight = 600;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    const getCardStyle = (angle: number, distance: number) => {
        const radians = (angle * Math.PI) / 180;
        const x = centerX + distance * Math.cos(radians);
        const y = centerY + distance * Math.sin(radians);
        return {
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
        };
    };

    // Calculate line endpoints
    const getLineCoordinates = (angle: number, distance: number) => {
        const radians = (angle * Math.PI) / 180;
        // Adjust for card size (cards are ~140px wide)
        const cardOffset = 70; // half card width in pixels
        const adjustedDistance = distance - cardOffset;
        const x = centerX + adjustedDistance * Math.cos(radians);
        const y = centerY + adjustedDistance * Math.sin(radians);
        // Convert to percentage for SVG
        return {
            x: (x / containerWidth) * 100,
            y: (y / containerHeight) * 100
        };
    };

    return (
        <>
            <style>{`
                @keyframes subtle-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes pulse-line {
                    0% {
                        stroke-dashoffset: 0;
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        stroke-dashoffset: -10;
                        opacity: 0.3;
                    }
                }
            `}</style>
            <div className="relative w-full h-[600px] overflow-hidden">
                {/* SVG for connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <defs>
                        <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#7c9687" stopOpacity="0.2">
                                <animate attributeName="stop-opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="#8fa396" stopOpacity="0.7">
                                <animate attributeName="stop-opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                            </stop>
                        </linearGradient>
                    </defs>
                    {transactions.map((transaction, index) => {
                        const coords = getLineCoordinates(transaction.angle, transaction.distance);
                        return (
                            <line
                                key={index}
                                x1="50%"
                                y1="50%"
                                x2={`${coords.x}%`}
                                y2={`${coords.y}%`}
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeDasharray="4,2"
                                opacity="0.8"
                                style={{
                                    animation: `pulse-line 2s ease-in-out infinite ${index * 0.2}s`
                                }}
                            />
                        );
                    })}
                </svg>

                {/* Central Handle Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-24 h-24 bg-white border-2 rounded-full flex items-center justify-center relative" style={{ borderColor: '#dbe8e3' }}>
                        <Image
                            src="/icon.svg"
                            alt="Homelett App Icon"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                    </div>
                </div>

                {/* Transaction Cards */}
                {transactions.map((transaction, index) => {
                    const typeInfo = transactionTypes[transaction.type as keyof typeof transactionTypes];
                    const cardStyle = getCardStyle(transaction.angle, transaction.distance);

                    return (
                        <div
                            key={index}
                            className="absolute z-20"
                            style={cardStyle}
                        >
                            <div className="p-4 rounded-lg w-[120px] h-[120px] flex flex-col items-center justify-center text-center"
                                style={{
                                    backgroundColor: typeInfo.color,
                                }}>
                                <div className="text-3xl mb-2">{typeInfo.icon}</div>
                                <div className="text-xs font-medium text-gray-700">{transaction.type}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RightHero;
