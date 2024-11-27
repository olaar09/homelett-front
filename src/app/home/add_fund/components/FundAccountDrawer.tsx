import React, { useState } from 'react';
import { Drawer, message } from 'antd';
import { Icon } from '@iconify/react';
import InputField from '@/app/components/InputField';
import { usePaystackPayment } from "react-paystack";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from 'axios';
import { ITransferPaymentInfo } from '@/app/interfaces/IProduct';

export type PaymentType = 'direct_deposit' | 'paystack' | null;

interface FundAccountDrawerProps {
    open: boolean;
    onClose: () => void;
    userEmail: string;
    paymentType: PaymentType;
}

const FundAccountDrawer: React.FC<FundAccountDrawerProps> = ({
    open,
    onClose,
    userEmail,
    paymentType
}) => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [newBankInfo, setNewBankInfo] = useState<ITransferPaymentInfo | null>(null);

    const apiUtil = new APIUtil();

    const config = {
        reference: new Date().getTime().toString(),
        email: userEmail,
        amount: amount * 100,
        publicKey: "pk_live_9e5eb617e571c17f13bb79edec147f2dbe40bfe7",
    };

    const initializePayment = usePaystackPayment(config);

    const handleDirectDeposit = () => {
        if (amount < 200) {
            message.error("Minimum amount is 200 naira");
            return;
        }
        generateDirectDepositPaymentDetails();
    };

    const handlePaystackPayment = () => {
        if (amount < 200) {
            message.error("Minimum amount is 200 naira");
            return;
        }
        try {
            initializePayment({
                onSuccess: (response: any) => {
                    completePayment(response.reference);
                },
                onClose: () => {
                    console.log("closed");
                    message.error("Payment cancelled");
                }
            });
        } catch (x) {
            message.error("Unable to initialize payment");
            console.log(x, "Error occurred");
        }
    };

    const completePayment = async (reference: string) => {
        try {
            setLoading(true);
            await apiUtil.profileService.completeUpgradeProfile(reference);
            message.success("Payment completed");
            history.back();
        } catch (x) {
            message.error("Unable to complete transaction");
        } finally {
            setLoading(false);
        }
    };


    const generateDirectDepositPaymentDetails = async () => {
        try {
            setLoading(true);
            const paymentData = await apiUtil.transactionService.generateGroupPayment(amount)
            setNewBankInfo(paymentData);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to complete request"
                    }`
                );
            } else {
                message.error("Unable to complete request");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Drawer
            title={`Fund Account - ${paymentType === 'direct_deposit' ? 'Direct Deposit' : 'Paystack Payment'}`}
            placement="bottom"
            onClose={onClose}
            open={open}
            height={300}
            className="rounded-t-xl"
        >
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <Icon
                        icon={paymentType === 'direct_deposit' ? "mdi:bank" : "mdi:currency-ngn"}
                        className="text-blue-500 mr-2 text-xl"
                    />
                    <h4 className="text-lg font-semibold text-gray-900">Enter Amount</h4>
                </div>

                <div className="flex flex-col gap-y-2 [&_input]:text-gray-900">
                    <span className="text-sm font-medium text-gray-700">
                        Enter funding amount (Naira)
                    </span>
                    <InputField
                        placeHolder={"Enter deposit amount"}
                        type={"number"}
                        name={"amount"}
                        onChange={(e) => setAmount(Number(e.target?.value ?? 0))}
                        style={{ color: '#111827' }}
                    />

                    <button
                        onClick={paymentType === 'direct_deposit' ? handleDirectDeposit : handlePaystackPayment}
                        disabled={loading}
                        className={`mt-4 w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-x-2 hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                        ) : (
                            <>
                                <Icon icon="mdi:arrow-right" className="text-xl" />
                                <span className="font-medium">
                                    {paymentType === 'direct_deposit' ? 'Proceed to Bank Details' : 'Proceed to Payment'}
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default FundAccountDrawer; 