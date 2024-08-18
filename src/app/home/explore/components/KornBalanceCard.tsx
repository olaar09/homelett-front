// components/KornBalanceCard.tsx
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from 'antd';
import Link from 'next/link';
import React, { useContext } from 'react';

const KornBalanceCard: React.FC = () => {
    const authContext = useContext(AuthContext)
    const utilService = new UtilService()

    const balance = utilService.formatMoney(
        `${(authContext.currentUser?.finance?.balance ?? 0)}`,
        "en-NG",
        "NGN"
    )
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm h-52 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500">Cash Balance</p>
                    <h2 className="text-4xl font-bold mt-4">$0.00</h2>
                    <span className='mt-2 block text-foreground-secondary'>{balance}</span>
                </div>
                <Link href={'/home/add_fund_nuban'}>
                    <span className='flex items-center gap-x-2 py-0'>
                        <p className="text-gray-500 text-xs">View Nuban</p>
                        <Icon className='text-lg text-foreground-secondary' icon={'iconamoon:arrow-right-2'} />
                    </span>
                </Link>

            </div>
            <div className="mt-4 flex space-x-6">

                <button className="flex-1 bg-gray-100 py-2 rounded-xl px-4">
                    <Link href="/home/add_fund">
                        <span> Add Fund </span>
                    </Link>
                </button>

                <button className="flex-1 bg-gray-100 py-2 rounded-xl">Cash Out</button>
            </div>
        </div>
    );
};

export default KornBalanceCard;
