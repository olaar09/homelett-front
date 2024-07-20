
import Brands from '@/app/components/Brands';
import { IProduct } from '@/app/interfaces/IProduct';
import { Str } from '@/utils/consts';
import { getAvatar } from '@/utils/helpers';
import React from 'react';


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

