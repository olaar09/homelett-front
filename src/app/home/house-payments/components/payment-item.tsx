import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { IHousePayment } from '@/app/interfaces/IHousePayment';

interface PaymentItemProps {
    payment: IHousePayment;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ payment }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
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
                        {payment.interval === 'single' ? 'One-time' : 'Recurring'}
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
    );
};

export default PaymentItem; 