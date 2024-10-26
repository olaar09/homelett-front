"use client"
import { Str } from '@/utils/consts';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center text-white">
      <div className="flex justify-between w-full p-4">
        <div className=" p-2 rounded flex items-center gap-x-2">
          <img src='/logo.png' className='w-6 rounded-md border' />
          <span>Bubble</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-100 rounded-full p-2 focus:outline-none"
          >
            <div className="w-6 h-6 rounded flex justify-center items-center">
              <Icon className='text-black' icon={'radix-icons:hamburger-menu'} />
            </div>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
              <Link href={'/login'}>
                <span className="block px-4 py-2 hover:bg-gray-200">Login</span>
              </Link>
              <Link href={'/request-invite'}>
                <span className="block px-4 py-2 hover:bg-gray-200">Create Account</span>
              </Link>

              <Link href={Str.whatsappHelp}>
                <span className="block px-4 py-2 hover:bg-gray-200">Contact Support</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8 md:mt-24 lg:px-10 px-4">
        <h1 className="text-5xl font-bold-family">DO MORE WITH YOUR MONEY</h1>
        <p className="mt-4 text-sm px-8">Save in USD, Spend in Naira <br /> 🤑 Grow your money 🤑</p>
        <p className=" text-xs max-w-xs mx-auto mt-10 text-foreground-secondary">
          Korn money is a financial services platform, not a bank. Banking services are provided by Korn's bank partner(s). Prepaid debit cards issued by Safe Haven Microfinance Bank.
        </p>
      </div>
      <div className='mt-10'>
        <img className='w-40' src='/shopping-bag.png' />
        <img className='w-40' src="/dollar.png" />
      </div>
      <div className='flex flex-grow  flex-col justify-end pb-10'>
        <div className="mt-12 md:mt-16 ">
          <Link href={'/request-invite'}>
            <button className="bg-white font-bold-family text-black py-2 px-4 rounded-full text-lg font-bold">
              Click here to get started
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
}
