import React, { useState } from 'react';
import { ITransaction } from "@/app/interfaces/IProduct";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from 'antd';
import { IHousePayment } from '@/app/interfaces/IHousePayment';
import PaymentItem from './payment-item';


interface PaymentListProps {
    payments: IHousePayment[];
}

const PaymentList: React.FC<PaymentListProps> = ({ payments }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const toggleDrawer = (content: string | null) => {
        if (content) {
            setDrawerContent(content);
            setDrawerOpen(true);
            setCopied(false);
        } else {
            setDrawerOpen(false);
        }
    };

    const handleCopy = async () => {
        if (drawerContent) {
            try {
                await navigator.clipboard.writeText(drawerContent);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    if (payments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-6">
                    <Icon
                        icon="mdi:receipt-text-outline"
                        className="text-gray-200 text-7xl"
                    />
                    <Icon
                        icon="mdi:currency-ngn"
                        className="text-gray-300 text-2xl absolute -top-2 -right-2"
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-gray-700 text-lg font-semibold mb-2">
                        No Transactions Yet
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                        Your transaction history will appear here once you make your first purchase
                    </p>
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <Icon icon="mdi:information-outline" className="text-base" />
                        <span>Transactions are updated in real-time</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {payments.map((payment) => (
                    <PaymentItem key={payment.id} payment={payment} />
                ))}
            </div>
        </>
    );
};

export default PaymentList; 