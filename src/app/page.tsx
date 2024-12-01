"use client"
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <img
          src="/logo.png"
          alt="Bubble Logo"
          className="w-16 h-16 mx-auto mb-6"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Login or sign up to get started
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full group hover:bg-blue-600 bg-blue-500 text-white py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
              <Icon
                icon="solar:login-2-line-duotone"
                className="w-5 h-5 group-hover:scale-110 transition-transform"
              />
              Login
            </button>
          </Link>

          <Link href="/request-invite" className="w-full sm:w-auto">
            <button className="w-full group hover:bg-purple-600 bg-purple-500 text-white py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
              <Icon
                icon="solar:user-plus-rounded-line-duotone"
                className="w-5 h-5 group-hover:scale-110 transition-transform"
              />
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
