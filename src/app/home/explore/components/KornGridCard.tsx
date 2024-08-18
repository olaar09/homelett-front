// components/KornGridCard.tsx
import React from 'react';

interface KornGridCardProps {
    title: string;
    value: string;
    description?: string;
    icon: React.ReactNode;
    onClick?: () => void
}

const KornGridCard: React.FC<KornGridCardProps> = ({ title, value, description, icon, onClick }) => {
    return (
        <div onClick={onClick ? () => onClick() : () => { }} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col justify-between items-start">
                {icon}
                <div className="">
                    <h3 className="text-sm font-medium">{title}</h3>
                    <p className="text-lg font-bold">{value}</p>
                    {description && <p className="text-gray-500 text-sm">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default KornGridCard;
