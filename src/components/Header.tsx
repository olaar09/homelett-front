export default function Header() {
    return (
        <header className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center">
                <span className="text-xl font-semibold text-black">Homelett</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1">
                    <span>Buy</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1">
                    <span>Sell</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors flex items-center space-x-1">
                    <span>Agents</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </nav>

            <div className="flex items-center space-x-4">
                <button className="hidden md:block text-gray-600 hover:text-black transition-colors text-sm font-medium">
                    Sign in
                </button>
                <button className="md:hidden p-2">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
