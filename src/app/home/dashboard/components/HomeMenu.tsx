
import Brands from '@/app/components/Brands';
import { IProduct } from '@/app/interfaces/IProduct';
import { AuthContext } from '@/contexts/AuthContext';
import { Str } from '@/utils/consts';
import { getAvatar } from '@/utils/helpers';
import { message } from 'antd';
import React, { useContext, useState } from 'react';
import SingleProductDrawer from './SingleProductDrawer';
import { useRouter } from 'next/navigation';
import APIUtil from '@/services/APIUtil';
import UtilService from '@/services/UtilService';
import ResellerProductDrawer from '../../_components/ResellerProductDrawer';
import ProductChildrenDrawer from './Products/ProductChildrenDrawer';
import ProductDrawer from './Products/ProductDrawer';


const HomeMenu = ({ homeProducts }: { homeProducts: IProduct[] }) => {
    const authContext = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const apiUtils = new APIUtil();
    const utilsService = new UtilService();
    const router = useRouter()

    const isReseller = authContext.currentUser?.is_reseller == 1;

    const onTapMenu = (item: IProduct) => {
        switch (item.tag) {
            case 'skills':
            case 'utilities':
                router.push('/home/digital')
                router.push('/home/digital')
                break;
            case 'yt_automation':
            case 'forex':
                setSelectedProduct(item)
                break;
            case 'smm':
                message.success('coming soon..')
                break;
            case 'phone':
                message.success('coming soon..')
                break;
            default:
                setSelectedProduct(item)
                break;
        }
    }

    return (
        <>
            {!isReseller && <ProductDrawer
                product={selectedProduct}
                open={selectedProduct != null}
                onClose={() => setSelectedProduct(null)}
            />
            }

            {isReseller && <ResellerProductDrawer
                product={selectedProduct}
                open={selectedProduct != null}
                onClose={() => setSelectedProduct(null)}
            />
            }

            <div className=" py-4    grid grid-cols-2">
                {(homeProducts ?? []).map((item) => {
                    return <div onClick={() => onTapMenu(item)} className="h-40 0 py-3  px-2 flex flex-col border-[0.2px]">
                        <div>
                            {getAvatar(item.tag, item.title)}
                            {<img className='h-5 w-5 rounded-full' src={item.extra_icon} />}
                        </div>
                        <div className='mt-1'>
                            <span className='font-bold text-xs'>{item.title}</span>
                        </div>
                        <div>
                            <span className='text-xs text-foreground-secondary'>{item.extra}</span>
                        </div>
                    </div>
                })}

            </div>
        </>
    );
};

export default HomeMenu;

