import React from 'react';
import { Icon } from '@iconify/react';

interface InfoItemProps {
    icon: string;
    value: string | number;
    label: string;
    iconColor: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, value, label, iconColor }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-x-2">
                <Icon icon={icon} className={`text-3xl ${iconColor} mb-1`} />
                <p className="text-lg font-semibold text-gray-700">{value}</p>
            </div>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
};

export default InfoItem; 