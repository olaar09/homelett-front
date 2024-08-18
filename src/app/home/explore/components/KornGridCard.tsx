// components/KornGridCard.tsx
import { Tag } from 'antd';
import React from 'react';

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
            <div className="flex flex-col justify-between items-center gap-y-3">
                <h3 className="  text-md font-bold">{title}</h3>
                <span>{icon} </span>
                <div className="flex items-center justify-center flex-col">
                    <p className="font-medium">{value}</p>
                    {disabled && <Tag bordered={false} className='px-4 rounded-lg'>Coming soon</Tag>}
                    {!disabled && description && <p className="text-gray-500 text-sm">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default KornGridCard;
