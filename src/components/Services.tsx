export default function Services() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Connect Block */}
                <div className="bg-blue-600 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" fill="white" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
                        <p className="text-white/90 mb-6 leading-relaxed">
                            Securely access financial accounts for statements, transactions, and identity
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
                            <span>Start with Connect</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* DirectPay Block */}
                <div className="bg-gray-50 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="40" fill="blue" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-4">DirectPay</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Collect bank payments in your web or mobile app. No cards. No chargebacks
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mb-4">
                            <span>Start with DirectPay</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div className="text-sm text-gray-500">
                            <span>In Partnership with </span>
                            <span className="font-medium text-purple-600">flutterwave</span>
                        </div>
                    </div>
                </div>

                {/* Percept Block */}
                <div className="bg-black rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <rect x="20" y="20" width="60" height="60" fill="gray" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Percept</h3>
                        <p className="text-white/90 mb-6 leading-relaxed">
                            Money operations and reconciliation for all your corporate accounts, in one dashboard
                        </p>
                        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
                            <span>Request access</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
