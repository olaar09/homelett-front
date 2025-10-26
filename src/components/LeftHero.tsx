import Image from 'next/image';
import AddressInput from './AddressInput';

export default function LeftHero() {
    return (
        <div className="space-y-6 md:space-y-8 pt-8 md:pt-16 lg:pt-24">
            {/* Hero Section */}
            <div>
                {/* Announcement Banner */}
                <div className="inline-flex items-center gap-2 px-1 py-2  rounded-full  mb-8 hover:border-blue-500 transition-colors cursor-pointer group bg-gray-100">
                    <span className="px-3 py-1 bg-[#289264] text-white text-xs font-semibold rounded-full">
                        NEW
                    </span>
                    <span className="text-xs font-medium text-black">
                        Buy prepaid meters, Pay in installments.
                    </span>
                    <svg className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-black mb-4 md:mb-6 leading-[1.4] text-left">
                    Propel Your
                    <span className="mt-1 block" > Rental Business </span>
                </h1>

                {/* Description */}
                <p className="text-sm md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed text-left max-w-lg">
                    Simplify how you manage your multi-tenant properties.
                    Increase your revenue and save time with Homelett — AI powered, smart property assistant.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
                    {/* Primary Button */}
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#289264] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                        <span className="text-sm md:text-base text-white"> Download App</span>
                        <Image src="/material-symbols-light--mobile-outline.svg" alt="Download App" width={20} height={20} className="w-5 h-5 text-white" />
                    </button>

                    {/* Secondary Button */}
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto">
                        <span className="text-sm md:text-base"> Contact Support</span>
                        <Image src="/material-symbols-light--support-agent-sharp.svg" alt="Support" width={20} height={20} className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div >
    );
}