"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, message, Select } from 'antd';
import InputField from '@/app/components/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import APIUtil from '@/services/APIUtil';
import { AuthContext } from '@/contexts/AuthContext';
import { AxiosError } from 'axios';
import { useRequest } from 'ahooks';
import Brands from '@/app/components/Brands';
import Link from 'next/link';
import { Str } from '@/utils/consts';
import UtilService from '@/services/UtilService';
import { IProduct } from '../interfaces/IProduct';
import { IHousePlan } from '../interfaces/IRegisterRequest';
import HouseProductDrawer from '../components/HouseProductDrawer';
import { useRouter } from 'next/navigation';
const { Option } = Select;

// Define props type for PlanPage
interface PlanPageProps {
    open: boolean;
    onClose: () => void;
}

const PlanPage: React.FC<PlanPageProps> = ({ open, onClose }) => {
    const authContext = useContext(AuthContext)
    const [selected, setSelected] = useState<IHousePlan | null>(null)
    const util = new APIUtil()
    const router = useRouter();


    return (
        <>
            <HouseProductDrawer
                product={selected}
                open={selected != null}
                onClose={function (status: boolean): void {
                    setSelected(null)
                    if (status) {
                        router.push('/home/explore')
                    }
                }}
            />

            <div className="w-full  py-1 ">
                <Link href={"/home/explore"}>
                    <div className="flex items-center gap-x-2  px-2 py-2">
                        <Icon
                            icon={"octicon:arrow-left-24"}
                            className=" text-xl  text-foreground"
                        />
                        <span className="text-sm"> Available subscription plans </span>
                    </div>
                </Link>
                <div className='py-2 '>
                    <div className='flex items-center flex-col gap-y-5 w-full mt-6'>
                        {authContext.currentUser?.house_plans?.map((opt) => {
                            const extraIcons = opt.products.map(product => product.bubble_product.extra_icon);

                            return <div onClick={() => {
                                setSelected(opt)
                            }} className=' flex flex-row  w-full gap-x-1 items-center border-b  px-3 py-1'>


                                <div className='w-11/12'>
                                    <div className='w-auto flex px-3'>
                                        <Brands size={'small'} brands={['/logos/wifi.png', ...extraIcons]} />
                                    </div>

                                    <span className='text-xs'>{opt?.plan_name}</span>
                                    <p className='text-xs text-foreground-secondary'>{new UtilService().formatMoney(`${opt.plan_price}`)}</p>

                                    <p className='pt-3 pb-1 text-foreground-secondary text-xs'>{opt.plan_description}</p>
                                </div>

                                <Button type='link' className=' text-black justify-center flex items-center gap-x-2 pl-2 pr-1  rounded-lg'>
                                    <Icon icon={'solar:alt-arrow-right-outline'} />
                                </Button>
                            </div>
                        })}


                    </div>

                </div>
            </div>
        </>
    );
};

export default PlanPage;
