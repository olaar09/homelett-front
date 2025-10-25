import React from "react";

const transactionTypes = {
    "PRE-PAY": { icon: "🏢", color: "#fefefe", typeColor: "text-gray-600", gradientFrom: "#ffffff", gradientMid: "#f8f8f8", gradientTo: "#f5f5f5" },
    "PAYMENT": { icon: "💳", color: "#fefefe", typeColor: "text-gray-600", gradientFrom: "#ffffff", gradientMid: "#f8f8f8", gradientTo: "#f5f5f5" },
    "WAIVER REQUEST": { icon: "📄", color: "#fefefe", typeColor: "text-gray-600", gradientFrom: "#ffffff", gradientMid: "#f8f8f8", gradientTo: "#f5f5f5" },
};

const RightHero = () => {
    const transactions = [
        { type: "PRE-PAY", company: "Capital Construction", amount: "$11419.00", method: "ACH", angle: 0, distance: 200 },
        { type: "WAIVER REQUEST", company: "Clean Glass Co", angle: 60, distance: 200 },
        { type: "PAYMENT", company: "Top Roofing Inc", amount: "$4389.00", method: "AM EX", angle: 120, distance: 200 },
        { type: "PRE-PAY", company: "Precision Co", amount: "$4389.00", method: "VISA", angle: 180, distance: 200 },
        { type: "PAYMENT", company: "Arg Constructions", amount: "$1880.00", method: "ACH", angle: 240, distance: 200 },
        { type: "PAYMENT", company: "Elite Concrete", amount: "$8419.00", method: "VISA", angle: 300, distance: 200 },
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
            `}</style>
            <div className="relative w-full h-[600px] overflow-hidden">
                {/* SVG for connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {transactions.map((transaction, index) => {
                        const coords = getLineCoordinates(transaction.angle, transaction.distance);
                        return (
                            <line
                                key={index}
                                x1="50%"
                                y1="50%"
                                x2={`${coords.x}%`}
                                y2={`${coords.y}%`}
                                stroke="#e5e7eb"
                                strokeWidth="1.5"
                                strokeDasharray="3,3"
                                opacity="0.5"
                            />
                        );
                    })}
                </svg>

                {/* Central Handle Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-24 h-24 bg-white border-2 rounded-full flex items-center justify-center relative" style={{ borderColor: '#289264' }}>
                        <span className="font-semibold text-base" style={{ color: '#289264' }}>Homelett</span>
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
                            <div className="p-3 rounded-lg border border-gray-200 w-[140px] min-h-[130px] flex flex-col justify-between relative overflow-hidden"
                                style={{
                                    backgroundColor: typeInfo.color,
                                    background: `linear-gradient(110deg, ${typeInfo.gradientFrom} 0%, ${typeInfo.gradientMid} 25%, ${typeInfo.gradientTo} 50%, ${typeInfo.gradientMid} 75%, ${typeInfo.gradientFrom} 100%)`,
                                    backgroundSize: '200% 100%',
                                    animation: 'subtle-shimmer 4s ease-in-out infinite'
                                }}>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <span className="text-lg">{typeInfo.icon}</span>
                                        <span className={`text-xs font-medium ${typeInfo.typeColor}`}>{transaction.type}</span>
                                    </div>

                                    {transaction.amount && (
                                        <div className="text-sm font-bold text-gray-900 mb-1.5">{transaction.amount}</div>
                                    )}

                                    {!transaction.amount && (
                                        <div className="text-sm font-bold text-gray-900 mb-1.5 opacity-0">Placeholder</div>
                                    )}

                                    <div className="flex items-center justify-between gap-1.5 mb-1">
                                        {transaction.method && (
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${transaction.method === "ACH" ? "bg-gray-200 text-gray-700" :
                                                transaction.method === "VISA" ? "bg-blue-600 text-white" :
                                                    transaction.method === "AM EX" ? "bg-blue-500 text-white" :
                                                        "bg-orange-500 text-white"
                                                }`}>
                                                {transaction.method}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs font-medium text-gray-700 relative z-10">{transaction.company}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RightHero;
