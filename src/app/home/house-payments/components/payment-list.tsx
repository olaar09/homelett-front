import React, { useState } from 'react';
import { ITransaction } from "@/app/interfaces/IProduct";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from 'antd';
import { IHousePayment } from '@/app/interfaces/IHousePayment';

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
                    <div key={payment.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    {payment.title}
                                </h3>
                                <p className="text-xs text-gray-500">{payment.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="flex items-center text-sm font-medium text-gray-900">
                                    ₦{payment.amount.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {payment.interval}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className={`flex items-center px-2 py-1 text-xs rounded-full ${payment.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : payment.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {payment.status === 'completed' && <Icon icon="mdi:check-circle" className="mr-1" />}
                                    {payment.status === 'pending' && <Icon icon="mdi:clock-outline" className="mr-1" />}
                                    {payment.status === 'failed' && <Icon icon="mdi:alert-circle" className="mr-1" />}
                                    {payment.interval} payment
                                </span>
                            </div>
                            {/*     <span className="text-xs text-gray-400">
                                {new Date(payment.created_at).toLocaleDateString()}
                            </span> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PaymentList; 