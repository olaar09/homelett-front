import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, message, Select } from 'antd';
import InputField from '@/app/components/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import APIUtil from '@/services/APIUtil';
import { AuthContext } from '@/contexts/AuthContext';
import { AxiosError } from 'axios';
import { useRequest } from 'ahooks';
const { Option } = Select;

// Define props type for SubscriptionInfoDrawer
interface SubscriptionInfoDrawerProps {
    open: boolean;
    onClose: () => void;
    selected: any
}

const SubscriptionInfoDrawer: React.FC<SubscriptionInfoDrawerProps> = ({ open, onClose, selected }) => {

    return (
        <Drawer
            placement="top"
            closable={false}
            onClose={onClose}
            open={open}
            height={400} // Adjust the height as needed
            bodyStyle={{ paddingBottom: 80 }} // Add padding to the bottom
            drawerStyle={{}} // Rounded corners at the top
        >
            <div className='py-2 '>
                <div className='flex items-center flex-col gap-y-5 w-full mt-6'>

                    <div className='w-full px-3 justify-between flex'>
                        <span className="text-xl">{selected?.title} </span>
                        <Icon className=' cursor-pointer text-2xl' icon={'iconoir:cancel'} onClick={onClose}>Cancel</Icon>
                    </div>

                    <div className=' flex flex-col items-start w-full border-b border-t px-3 py-1'>
                        <span>Email</span>
                        <p className='pt-1 text-foreground-secondary text-sm'>{selected?.username}</p>
                    </div>

                    <div className=' flex flex-col items-start w-full border-b border-t px-3 py-1'>
                        <span>Password</span>
                        <p className='pt-1 text-foreground-secondary text-sm'>{selected?.password}</p>
                    </div>

                    {selected?.profileName &&
                        <div className=' flex flex-col items-start w-full border-b border-t px-3 py-1'>
                            <span>Profile Name</span>
                            <p className='pt-1 text-foreground-secondary text-sm'>{selected?.profileName}</p>
                        </div>
                    }

                    {selected?.profilePin &&
                        <div className=' flex flex-col items-start w-full border-b border-t px-3 py-1'>
                            <span>Profile Pin</span>
                            <p className='pt-1 text-foreground-secondary text-sm'>{selected?.profilePin}</p>
                        </div>
                    }

                </div>

            </div>
        </Drawer>
    );
};

export default SubscriptionInfoDrawer;
