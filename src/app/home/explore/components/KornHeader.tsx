// components/Header.tsx
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tag } from 'antd';
import Link from 'next/link';
import React, { useContext } from 'react';

const KornHeader: React.FC = () => {
    const authContext = useContext(AuthContext)
    const usdRate = authContext.currentUser?.configs?.find((cg) => cg.korn_key == 'usd_rate')
    const utilService = new UtilService()

    const rate = utilService.formatMoney(
        `${usdRate?.value}`, "en-NG",
        "NGN"
    )

    const nairaUnit = utilService.formatMoney(
        `${(1)}`,

    )

    return (
        <div className="flex justify-between items-center p-4">
            <div className='flex items-center'>
                <img src='/logo.jpg' className='w-6 rounded' />
                <h1 className="text-2xl font-bold">Korn</h1>
            </div>




        </div>
    );
};

export default KornHeader;
