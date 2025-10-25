import React from "react";

const transactionTypes = {
    "PRE-PAY": { icon: "🏢", color: "bg-green-50" },
    "PAYMENT": { icon: "💳", color: "bg-green-50" },
    "WAIVER REQUEST": { icon: "📄", color: "bg-purple-50" },
};

const RightHero = () => {
    const transactions = [
        { type: "PRE-PAY", company: "Capital Construction", amount: "$11419.00", method: "ACH", position: "top-left" },
        { type: "WAIVER REQUEST", company: "Clean Glass Co", position: "top-right" },
        { type: "PAYMENT", company: "Top Roofing Inc", amount: "$4389.00", method: "AM EX", position: "middle-left" },
        { type: "PRE-PAY", company: "Precision Co", amount: "$4389.00", method: "VISA", position: "middle-right" },
        { type: "PAYMENT", company: "Arg Constructions", amount: "$1880.00", method: "ACH", position: "bottom-center" },
    ];

    const getPositionClasses = (position: string) => {
        const positions: Record<string, string> = {
            "top-left": "top-[5%] left-[5%]",
            "top-middle": "top-[5%] left-[50%] -translate-x-1/2",
            "top-right": "top-[5%] right-[5%]",
            "middle-left": "top-[35%] left-[5%]",
            "middle-center": "top-[35%] left-[50%] -translate-x-1/2",
            "middle-right": "top-[35%] right-[5%]",
            "bottom-center": "bottom-[5%] left-[50%] -translate-x-1/2",
            "bottom-right": "bottom-[5%] right-[5%]",
        };
        return positions[position] || "";
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            {/* SVG for connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {/* Lines connecting cards to center handle */}
                {transactions.map((_, index) => (
                    <line
                        key={index}
                        x1="50%"
                        y1="50%"
                        x2={index === 1 || index === 4 || index === 6 ? "50%" : index <= 2 ? (index === 0 ? "10%" : index === 2 ? "90%" : "50%") : index <= 4 ? (index === 3 ? "10%" : "50%") : index === 5 ? "90%" : index === 6 ? "50%" : "85%"}
                        y2={
                            index === 1 || index === 4 || index === 6 ? (index === 1 ? "15%" : index === 4 ? "55%" : "85%") :
                                index === 0 || index === 2 || index === 3 || index === 5 || index === 7 ?
                                    (index === 0 ? "10%" : index === 2 ? "10%" : index === 3 ? "45%" : index === 5 ? "45%" : "10%") : "10%"
                        }
                        stroke="#e5e7eb"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                        opacity="0.5"
                    />
                ))}
            </svg>

            {/* Central Handle Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-24 h-24 bg-white border-2 rounded-full flex items-center justify-center relative" style={{ borderColor: '#289264' }}>
                    <span className="font-semibold text-sm" style={{ color: '#289264' }}>Homelett</span>
                    {/* Small arc on top */}

                </div>
            </div>

            {/* Transaction Cards */}
            {transactions.map((transaction, index) => {
                const typeInfo = transactionTypes[transaction.type as keyof typeof transactionTypes];

                return (
                    <div
                        key={index}
                        className={`absolute ${getPositionClasses(transaction.position)} z-20`}
                    >
                        <div className={`${typeInfo.color} p-4 rounded-xl border border-gray-200 min-w-[180px]`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{typeInfo.icon}</span>
                                <span className="text-xs font-semibold text-gray-700">{transaction.type}</span>
                            </div>

                            {transaction.amount && (
                                <div className="text-lg font-bold text-gray-900 mb-2">{transaction.amount}</div>
                            )}

                            <div className="flex items-center justify-between gap-2">
                                {transaction.method && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.method === "ACH" ? "bg-gray-200 text-gray-700" :
                                        transaction.method === "VISA" ? "bg-blue-600 text-white" :
                                            transaction.method === "AM EX" ? "bg-blue-500 text-white" :
                                                "bg-orange-500 text-white"
                                        }`}>
                                        {transaction.method}
                                    </span>
                                )}
                            </div>

                            <div className="text-sm font-medium text-gray-900 mt-2">{transaction.company}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RightHero;
