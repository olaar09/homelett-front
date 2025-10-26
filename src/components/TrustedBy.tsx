import React from 'react';

const TrustedBy = () => {
    const companies = [
        {
            name: "Carbon",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2L4 8V16C4 23.73 10.27 30 18 30S32 23.73 32 16V8L20 2" stroke="#7C3AED" strokeWidth="2" fill="none" />
                    <path d="M16 2L4 8L16 14L28 8L16 2Z" fill="#7C3AED" />
                </svg>
            ),
            text: "carbon",
            color: "#7C3AED"
        },
        {
            name: "Renmoney",
            icon: (
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                </div>
            ),
            text: "renmoney",
            color: "#14B8A6"
        },
        {
            name: "Flutterwave",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M16 6C20 10 24 14 24 16C24 18 20 22 16 22C12 22 8 18 8 16C8 14 12 10 16 6Z" fill="#F97316" fillOpacity="0.8" />
                    <path d="M16 6C20 14 24 18 24 16C24 14 20 10 16 16" fill="#10B981" fillOpacity="0.8" />
                </svg>
            ),
            text: "flutterwave",
            color: "#1E40AF"
        },
        {
            name: "Evolve Credit",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="2" />
                    <path d="M12 6C10 8 8 10 8 12C8 14 10 16 12 18C14 16 16 14 16 12C16 10 14 8 12 6Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
                </svg>
            ),
            text: "evolve credit",
            color: "#8B5CF6"
        },
        {
            name: "Paystack",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="8" width="24" height="16" rx="3" fill="#003B88" />
                    <path d="M10 14h12M10 18h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            text: "paystack",
            color: "#003B88"
        },
        {
            name: "Interswitch",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="#FF6900" strokeWidth="2.5" />
                    <path d="M12 12h8M12 16h8M12 20h6" stroke="#FF6900" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            text: "interswitch",
            color: "#FF6900"
        },
        {
            name: "Kuda Bank",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4C9 4 4 9 4 16C4 23 9 28 16 28C23 28 28 23 28 16C28 9 23 4 16 4Z" fill="#40196D" />
                    <path d="M16 10V22M10 16H22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            ),
            text: "kuda",
            color: "#40196D"
        },
        {
            name: "TeamApt",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <rect x="6" y="6" width="20" height="20" rx="4" fill="#00AEEF" />
                    <path d="M12 16l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            text: "teamapt",
            color: "#00AEEF"
        }
    ];

    return (
        <div className="py-12 px-4 w-full">
            <div className="max-w-7xl mr-auto">
                <p className="text-sm text-gray-500 mb-6">Trusted by</p>
                <div className="flex flex-wrap items-center justify-start gap-8 lg:gap-12">
                    {companies.map((company, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                                {company.icon}
                            </div>
                            <span className="text-sm font-medium lowercase" style={{ color: company.color }}>
                                {company.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
