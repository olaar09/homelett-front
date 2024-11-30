// components/KornGridCard.tsx
import { AuthContext } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Tag } from 'antd';
import React, { useContext } from 'react';

interface KornGridCardProps {
    title: string;
    value: string;
    description?: string;
    icon: React.ReactNode;
    disabled?: boolean
    onClick?: () => void
}

const KornGridCard: React.FC<KornGridCardProps> = ({ disabled = false, title, value, description, icon, onClick }) => {
    return (
        <div onClick={onClick ? () => onClick() : () => { }} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start gap-y-3">
                <div className='flex items-center gap-x-2'>
                    <span>{icon} </span>
                    <h3 className="  text-md font-bold">{title}</h3>
                </div>


                <div className="flex items-center justify-center">
                    <Button className='border-0 bg-gray-100 flex items-center pl-2 pr-1' >
                        <span> Details </span>
                        <Icon className='text-xl' icon={'iconamoon:arrow-right-2-light'} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default KornGridCard;
