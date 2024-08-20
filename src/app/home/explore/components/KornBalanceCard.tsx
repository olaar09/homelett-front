// components/KornBalanceCard.tsx
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const KornBalanceCard: React.FC = () => {
    const authContext = useContext(AuthContext)
    const utilService = new UtilService()
    const router = useRouter();
    const balance = utilService.formatMoney(
        `${(authContext.currentUser?.finance?.balance ?? 0)}`,
        "en-NG",
        "NGN"
    )

    const usdRate = authContext.currentUser?.configs?.find((cg) => cg.korn_key == 'usd_rate')
    const rate = usdRate ? usdRate.value : 0;

    const usdBalance = Number(authContext.currentUser?.finance?.balance ?? 0) / Number(rate)
    const isPendingNuban = authContext.currentUser?.nuban && authContext.currentUser?.nuban.status == 'pending'
    const nuban = authContext.currentUser?.nuban

    const bankInfo = authContext.currentUser?.bank_info

    const onCashout = () => {
        if (false && isPendingNuban) {
            message.warning('Please click on verify account to verify and activate withdrawal')
        } else if (!bankInfo) {
            message.warning('Please click on profile and add your bank information to withdraw')
        } else {
            router.push('/home/add_fund')
        }

    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm h-52 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500">Cash Balance</p>
                    <h2 className="text-4xl font-bold mt-4">{utilService.formatMoney(`${usdBalance}`)}</h2>
                    <span className='mt-2 block text-foreground-secondary'>{balance}</span>
                </div>
                <Link href={'/home/add_fund_nuban'}>
                    <span className='flex items-center gap-x-2 py-0'>
                        <p className="text-gray-500 text-xs">{isPendingNuban ? 'Verify account' : 'View Nuban'}</p>
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

                <button onClick={onCashout} className="flex-1 bg-gray-100 py-2 rounded-xl">
                    <span> Cash Out</span>
                </button>
            </div>
        </div>
    );
};

export default KornBalanceCard;
