import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, message, Select } from 'antd';
import InputField from '@/app/components/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import APIUtil from '@/services/APIUtil';
import { AuthContext } from '@/contexts/AuthContext';
import { AxiosError } from 'axios';
import { useRequest } from 'ahooks';
const { Option } = Select;

// Define props type for PlanInfoDrawer
interface PlanInfoDrawerProps {
    open: boolean;
    onClose: () => void;
}

const PlanInfoDrawer: React.FC<PlanInfoDrawerProps> = ({ open, onClose }) => {

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
                        <span className="text-xl">Plans </span>
                        <Icon className=' cursor-pointer text-2xl' icon={'iconoir:cancel'} onClick={onClose}>Cancel</Icon>
                    </div>

                    {[
                        { title: 'Essentials', description: 'Includes Unlimited internet, and any 2 streaming options ' },
                        { title: 'Surfer', description: 'Includes Unlimited internet, and any 3 streaming options ' },
                        { title: 'Ultimate', description: 'Includes Unlimited internet, and any 3 streaming options and ChatGPT ' },
                    ].map((opt) => {
                        return <div className=' flex flex-col items-start w-full border-b border-t px-3 py-1'>
                            <span>{opt.title}</span>
                            <p className='pt-1 text-foreground-secondary text-sm'>{opt.description}</p>
                        </div>
                    })}


                </div>

            </div>
        </Drawer>
    );
};

export default PlanInfoDrawer;
