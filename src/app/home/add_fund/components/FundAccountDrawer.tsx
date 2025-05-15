import React, { useState, useEffect, useContext } from 'react';
import { Drawer, message } from 'antd';
import { Icon } from '@iconify/react';
import InputField from '@/app/components/InputField';
import { usePaystackPayment } from "react-paystack";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from 'axios';
import { ITransferPaymentInfo } from '@/app/interfaces/IProduct';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

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
    const [paymentFee, setPaymentFee] = useState(0);
    const [loading, setLoading] = useState(false);
    const [newBankInfo, setNewBankInfo] = useState<ITransferPaymentInfo | null>(null);
    const router = useRouter()
    const apiUtil = new APIUtil();

    useEffect(() => {
        if (!open) {
            setNewBankInfo(null);
        }
    }, [open]);

    useEffect(() => {
        setNewBankInfo(null);
    }, [paymentType]);

    const isProduction = process.env.NODE_ENV === 'production';

    const config = {
        reference: new Date().getTime().toString(),
        email: userEmail,
        amount: (amount + paymentFee) * 100,
        publicKey: isProduction ? "pk_live_9e5eb617e571c17f13bb79edec147f2dbe40bfe7" : "pk_test_0bd51a9b53a2c80ead3d84d11b27e4f51659e5f5",
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
            await apiUtil.transactionService.completePayment(reference);
            authContext.refreshProfile()
            message.success("Payment successful");
            router.push('/home/dashboard')
        } catch (error) {
            if (error instanceof AxiosError) {
                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to confirm deposit"
                    }`
                );
            } else {
                message.error("Unable to confirm deposit");
            }
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


    const authContext = useContext(AuthContext);



    return (
        <Drawer
            title={`Fund Account - ${paymentType === 'direct_deposit' ? 'Direct Deposit' : 'Paystack Payment'}`}
            placement="bottom"
            onClose={onClose}
            open={open}
            height={450}
            className="rounded-t-xl"
        >
            <div className="p-6">
                {newBankInfo ? (
                    <div className="flex flex-col gap-y-4">


                        <span className="text-xs text-gray-600"> Transfer  ₦{amount.toFixed(2)}  to the account below to deposit funds.
                            <span className="font-medium text-orange-500 block mt-2"> Ensure you complete the transaction within 30 minutes. This account information is only valid for this transaction. </span>
                        </span>

                        <div className="flex flex-col gap-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-x-2">
                                    <Icon icon="mdi:bank-outline" className="text-gray-500" />
                                    <span className="text-sm text-gray-600">Bank Name</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{newBankInfo.bank.name}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-x-2">
                                    <Icon icon="mdi:account-outline" className="text-gray-500" />
                                    <span className="text-sm text-gray-600">Account Name</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{newBankInfo.account_name}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-x-2">
                                    <Icon icon="mdi:number" className="text-gray-500" />
                                    <span className="text-sm text-gray-600">Account Number</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{newBankInfo.account_number}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => completePayment(newBankInfo?.reference ?? '')}
                            disabled={loading}
                            className={`mt-6 w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-x-2 hover:bg-green-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                            ) : (
                                <>
                                    <Icon icon="mdi:check-circle" className="text-xl" />
                                    <span className="font-medium">I've Completed the Transfer</span>
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div>
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
                                onChange={(e) => {
                                    const value = Number(e.target?.value ?? 0);
                                    setAmount(value);
                                    setPaymentFee(value > 0 ? (value * 0.015) + 100 : 0);
                                }}
                            />
                            {amount > 0 && (
                                <div className="text-sm text-gray-600">
                                    Payment fee: ₦{paymentFee.toFixed(2)}
                                </div>
                            )}

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
                )}
            </div>
        </Drawer>
    );
};

export default FundAccountDrawer; 