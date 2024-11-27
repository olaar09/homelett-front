import React, { useState, useMemo } from 'react';
import { Drawer, message } from 'antd';
import { Icon } from '@iconify/react';
import InputField from '@/app/components/InputField';

interface PurchaseTokenDrawerProps {
    open: boolean;
    onClose: () => void;
    tokenPerKw: number;
}

const PurchaseTokenDrawer: React.FC<PurchaseTokenDrawerProps> = ({ open, onClose, tokenPerKw }) => {
    const [meterNumber, setMeterNumber] = useState('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const kilowatts = useMemo(() => {
        if (!tokenAmount || tokenAmount < 5000) return 0;
        return Number((tokenAmount / tokenPerKw).toFixed(2));
    }, [tokenAmount, tokenPerKw]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : '';
        setTokenAmount(Number(value));
    };

    const handlePurchase = () => {
        if (!meterNumber || !tokenAmount) {
            message.error("Please enter a valid meter number and token amount.");
            return;
        }

        if (tokenAmount < 5000) {
            message.error("Minimum token amount is 5,000 Naira");
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            message.success("Token purchased successfully!");
            setLoading(false);
            onClose();
        }, 2000);
    };

    return (
        <Drawer
            title="Purchase Token"
            placement="bottom"
            onClose={onClose}
            open={open}
            height={400}
            className="rounded-t-xl"
        >
            <div className="p-6">
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center mb-4">
                        <Icon icon="mdi:electricity-circle" className="text-blue-500 mr-2 text-xl" />
                        <h4 className="text-lg font-semibold text-gray-900">Enter Details</h4>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Cost per kW</span>
                        <span className="text-sm font-medium text-gray-900">₦{tokenPerKw}.00</span>
                    </div>

                    <InputField
                        placeHolder="Enter meter number"
                        type="text"
                        name="meterNumber"
                        onChange={(e) => setMeterNumber(e.target.value)}
                    />

                    <div className="space-y-2">
                        <InputField
                            placeHolder="Enter token amount (min. ₦5,000)"
                            type="number"
                            name="tokenAmount"
                            value={`${tokenAmount}`}
                            onChange={handleAmountChange}
                        />

                        <div className="h-6">
                            {tokenAmount > 0 && (
                                <div className={`text-sm ${tokenAmount < 5000 ? 'text-red-500' : 'text-green-600'}`}>
                                    {tokenAmount < 5000 ? (
                                        'Minimum amount is ₦5,000'
                                    ) : (
                                        <div className="flex items-center gap-x-1">
                                            <Icon icon="mdi:lightning-bolt" className="text-yellow-500" />
                                            <span>You will get approximately {kilowatts} kilowatts</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handlePurchase}
                        disabled={loading || !tokenAmount || tokenAmount < 5000}
                        className={`mt-2 w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-x-2 hover:bg-blue-600 transition-colors ${(loading || !tokenAmount || tokenAmount < 5000) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                        ) : (
                            <>
                                <Icon icon="mdi:cart" className="text-xl" />
                                <span className="font-medium">Purchase Token</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default PurchaseTokenDrawer;