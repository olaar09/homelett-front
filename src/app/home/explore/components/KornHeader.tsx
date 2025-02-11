// components/Header.tsx
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Tag } from 'antd';
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
                <img src='/favicon.png' className='w-8 rounded' />
                <h1 className="text-2xl font-bold"></h1>
            </div>

            <div className='flex items-center gap-x-2 justify-between text-sm'>
                <span className=' truncate w-full  px-1 block'> Hi, {authContext.currentUser?.fullname} </span>
                {/*   <Link href="/home/add_fund">
                    <Button type="link" className=" h-8  bg-gray-300 rounded-full  justify-center flex items-center">
                        <span className="text-foreground text-xs"> Add Money </span>
                        <Icon className="text-foreground text-lg" icon={'iconamoon:arrow-right-2'} />
                    </Button>
                </Link> */}
            </div>
        </div>
    );
};

export default KornHeader;
