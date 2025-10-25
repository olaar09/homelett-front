import React from "react";

const transactionTypes = {
    "PRE-PAY": { icon: "🏢", color: "bg-green-50", typeColor: "text-gray-600" },
    "PAYMENT": { icon: "💳", color: "bg-green-50", typeColor: "text-gray-600" },
    "WAIVER REQUEST": { icon: "📄", color: "bg-purple-50", typeColor: "text-gray-600" },
};

const RightHero = () => {
    const transactions = [
        { type: "PRE-PAY", company: "Capital Construction", amount: "$11419.00", method: "ACH", angle: 0, distance: 180 },
        { type: "WAIVER REQUEST", company: "Clean Glass Co", angle: 60, distance: 180 },
        { type: "PAYMENT", company: "Top Roofing Inc", amount: "$4389.00", method: "AM EX", angle: 120, distance: 180 },
        { type: "PRE-PAY", company: "Precision Co", amount: "$4389.00", method: "VISA", angle: 180, distance: 180 },
        { type: "PAYMENT", company: "Arg Constructions", amount: "$1880.00", method: "ACH", angle: 240, distance: 180 },
        { type: "PAYMENT", company: "Elite Concrete", amount: "$8419.00", method: "VISA", angle: 300, distance: 180 },
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
                        <div className={`${typeInfo.color} p-3 rounded-lg border border-gray-200 w-[140px]`}>
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="text-lg">{typeInfo.icon}</span>
                                <span className={`text-xs font-medium ${typeInfo.typeColor}`}>{transaction.type}</span>
                            </div>

                            {transaction.amount && (
                                <div className="text-sm font-bold text-gray-900 mb-1.5">{transaction.amount}</div>
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

                            <div className="text-xs font-medium text-gray-700">{transaction.company}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RightHero;
