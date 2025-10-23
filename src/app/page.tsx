export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            HomeLett Contract Signing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your rental agreements and notices digitally.
            Sign contracts securely and manage your housing documents online.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Notice Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contract Notices</h2>
              <p className="text-gray-600 mb-6">
                View and access your rental notices and important contract updates.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Access your notice using:</p>
                <code className="text-blue-600 font-mono text-sm">
                  /notice/[your-contract-id]
                </code>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• View contract notices</p>
                <p>• Download PDF documents</p>
                <p>• Check signature status</p>
              </div>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Agreements</h2>
              <p className="text-gray-600 mb-6">
                Access your rental agreements and manage your housing contracts.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Access your agreement using:</p>
                <code className="text-blue-600 font-mono text-sm">
                  /agreement/[your-contract-id]
                </code>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• View rental agreements</p>
                <p>• Download contract PDFs</p>
                <p>• Verify signatures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">
                Your contracts are protected with secure authentication and encryption.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">
                Access your documents on any device with our responsive design.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Loading</h3>
              <p className="text-sm text-gray-600">
                Quick document retrieval with automatic retry and error handling.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2024 HomeLett. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}