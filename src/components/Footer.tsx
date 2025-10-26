export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-800">
                    <p className="text-sm">© 2024 HomeLett. All rights reserved.</p>
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <a href="tel:+2348112755857" className="text-sm hover:text-[#289264] transition-colors">
                            +234 811 275 5857
                        </a>
                        <a href="mailto:hello@homelett.co" className="text-sm hover:text-[#289264] transition-colors">
                            hello@homelett.co
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
