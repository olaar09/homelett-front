import AddressInput from './AddressInput';

export default function LeftHero() {
    return (
        <div className="space-y-8 pt-16 md:pt-24">
            {/* Hero Section */}
            <div>
                {/* Announcement Banner */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-8 hover:border-blue-500 transition-colors cursor-pointer group">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        NEW
                    </span>
                    <span className="text-sm font-medium text-black">
                        Homelett Widget 2.0 is Live!
                    </span>
                    <svg className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-7xl lg:text-8xl font-bold text-black mb-6 leading-tight text-left">
                    Make the easy move
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-8 leading-relaxed text-left max-w-lg">
                    Get a cash offer and explore the ways we can help you sell your home.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 mb-8">
                    {/* Primary Button */}
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Get started for free
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Secondary Button */}
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Contact Sales
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Address Input Field */}
                {/*       <AddressInput /> */}
            </div>
        </div>
    );
}