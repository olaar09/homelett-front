
import Brands from '@/app/components/Brands';
import { IProduct } from '@/app/interfaces/IProduct';
import { Str } from '@/utils/consts';
import { Avatar } from 'antd';
import React from 'react';

const getAvatar = (type: string) => {
    switch (type) {
        case 'streaming':
            return <div className='w-14 px-3'>
                <Brands brands={[...Str.brands].splice(0, 4)} size='smaller' />
            </div>
        case 'yt_automation':
            return <div className='w-20 px-3'>
                <Brands brands={[...Str.brands].splice(7, 1)} size='small' />
            </div>
        case 'forex':
            return <div className='w-20 px-3'>
                <Brands brands={[...Str.brands].splice(8, 1)} size='small' />
            </div>
        case 'phone':
            return <div className='w-20 px-3'>
                <Brands brands={[...Str.brands].splice(10, 1)} size='small' />
            </div>
        case 'skills':
            return <div className='w-20 px-3'>
                <Brands brands={[...Str.courseBrands].splice(0, 1)} size='small' />
            </div>
        case 'utilities':
            return <div className='w-14 px-3'>
                <Brands brands={[...Str.utilityBrands].splice(0, 4)} size='smaller' />
            </div>
        case 'smm':
            return <div className='w-20 px-3'>
                <Brands brands={[...Str.brands].splice(9, 1)} size='small' />
            </div>

        default:
            break;
    }
}

const HomeMenu = ({ onClick, products }: { products: IProduct[], onClick: (item: any) => void }) => {
    return (
        <div className=" py-4    grid grid-cols-2">
            {(products ?? []).map((item) => {
                return <div onClick={() => onClick(item)} className="h-40 0 py-3  px-2 flex flex-col border-[0.2px]">
                    <div>
                        {getAvatar(item.tag)}
                    </div>
                    <div className='mt-1'>
                        <span className='font-bold text-xs'>{item.title}</span>
                    </div>
                    <div>
                        <span className='text-xs text-foreground-secondary'>{item.total_selection}</span>
                    </div>
                </div>
            })}

        </div>
    );
};

export default HomeMenu;

