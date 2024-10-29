"use client"
// components/KornBalanceCard.tsx
import Brands from '@/app/components/Brands';
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Str } from '@/utils/consts';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, message, Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import PlanInfoDrawer from '../../../components/HouseProductDrawer';

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
    const [openPlans, setOpenPlans] = useState(false)


    const onOpenPlansModal = () => {
        setOpenPlans(true)
    }


    const activePlan = authContext.currentUser?.active_sub;

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm h-52 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500">{authContext.currentUser?.house?.house_name} </p>
                        <h2 className="text-xs font-thin mt-1">{authContext.currentUser?.house?.address}</h2>
                        <span className='mt-4 block text-foreground-secondary'>Balance : {balance}</span>
                    </div>
                    <div className="mt-0 flex gap-x-6">
                        <Tag color='green' className='border-0 flex gap-x-2 items-center'>
                            <Icon icon={'lets-icons:check-fill'} />
                            <span> Systems are active</span>
                        </Tag>
                    </div>

                </div>
                <div className="mt-4 flex justify-between gap-x-6 px-2">
                    <Brands size={"small"} brands={[...Str.brands]} />

                    <Link className='flex items-center gap-x-2 cursor-pointer hover:opacity-85 transition-all duration-100' href={'/plans'}>
                        <span className='font-normal text-sm'>{activePlan?.plan.plan_name ?? 'Select a plan'}</span>
                        <Icon icon={'oui:arrow-down'} />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default KornBalanceCard;
