export default function Footer() {
    return (
        <>
            {/* Bottom Section */}
            <div className="px-4 text-center mb-12 mt-20">
                <h2 className="text-3xl font-bold text-black mb-4">
                    Build for the future of digital finance.
                </h2>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-10">
                <button className="w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>
        </>
    );
}
