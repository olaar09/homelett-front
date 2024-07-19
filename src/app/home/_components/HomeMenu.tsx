
import Brands from '@/app/components/Brands';
import { Str } from '@/utils/consts';
import { Avatar } from 'antd';
import React from 'react';

const homeMenuItems = [
    {
        title: 'Streaming',
        icon: '',
        description: 'Enjoy unbeatable prices for premium streaming subscriptions',
        key: '/home/streaming',
        avatar: <div className='w-14 px-3'>
            <Brands brands={[...Str.brands].splice(0, 4)} size='smaller' />
        </div>
    },
    {
        title: 'Youtube Automation',
        icon: '',
        description: 'Earn unlimited income with only a youtube channel and Chat GPT',
        key: '/yt_automation',
        avatar: <div className='w-20 px-3'>
            <Brands brands={[...Str.brands].splice(7, 1)} size='small' />
        </div>
    },
    {
        title: 'Forex profits',
        icon: '',
        description: 'Learn 500+ profitable strategies making traders millions',
        key: '/forex',
        avatar: <div className='w-20 px-3'>
            <Brands brands={[...Str.brands].splice(8, 1)} size='small' />
        </div>
    },
    {
        title: 'SMM platform',
        icon: '',
        description: 'Buy followers for your Instagram starting @ only N1k ',
        key: '/smm',
        avatar: <div className='w-20 px-3'>
            <Brands brands={[...Str.brands].splice(9, 1)} size='small' />
        </div>
    },
    {
        title: 'Phone finance',
        icon: '',
        description: 'Get an IPhone and pay in installment. No credit check!',
        key: '/phone',
        avatar: <div className='w-20 px-3'>
            <Brands brands={[...Str.brands].splice(10, 1)} size='small' />
        </div>
    },
    {
        title: 'Digital skills',
        icon: '',
        description: 'Frontend, backend, python, data analysis courses from Udemy!',
        key: '/skills',
        avatar: <div className='w-20 px-3'>
            <Brands brands={[...Str.courseBrands].splice(0, 1)} size='small' />
        </div>
    }
]
const HomeMenu = () => {
    return (
        <div className=" py-4    grid grid-cols-2">
            {homeMenuItems.map((item) => {
                return <div className="h-40 0 py-3  px-2 flex flex-col ring-[0.2px]">
                    <div>
                        {item.avatar}
                    </div>
                    <div className='mt-1'>
                        <span className='font-bold text-xs'>{item.title}</span>
                    </div>
                    <div>
                        <span className='text-xs text-foreground-secondary'>{item.description}</span>
                    </div>
                </div>
            })}

        </div>
    );
};

export default HomeMenu;

