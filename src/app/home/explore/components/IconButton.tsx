import React from "react";
import { Icon } from "@iconify/react";
import { message } from "antd";

interface IconButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
    return (
        <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                <Icon icon={icon} className="text-2xl text-gray-700" />
            </div>
            <p className="text-xs font-bold text-gray-800 font-body">{label}</p>
        </div>
    );
};

export default IconButton; 