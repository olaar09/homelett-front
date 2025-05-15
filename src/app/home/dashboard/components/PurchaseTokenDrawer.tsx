import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Drawer, message, Modal, Button } from 'antd';
import { Icon } from '@iconify/react';
import InputField from '@/app/components/InputField';
import { AxiosError } from 'axios';
import APIUtil from "@/services/APIUtil";
import { AuthContext } from '@/contexts/AuthContext';
import { Str } from '@/utils/consts';


interface PurchaseTokenDrawerProps {
    open: boolean;
    onClose: () => void;
    tokenPerKw: number;
    isAdmin?: boolean;
}

const PurchaseTokenDrawer: React.FC<PurchaseTokenDrawerProps> = ({ open, onClose, tokenPerKw, isAdmin = false }) => {
    const [meterNumber, setMeterNumber] = useState('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const apiUtil = new APIUtil()
    const authContext = useContext(AuthContext)
    const minTokenAmount = isAdmin ? 5 : 5000;
    const [modalVisible, setModalVisible] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [serviceCharge, setServiceCharge] = useState(0);
    const auth = useContext(AuthContext)

    const houseSurcharge = isNaN(Number(auth.currentUser?.house?.surcharge)) ? Str.HOUSE_DEFAULT_SURCHARGE : Number(auth.currentUser?.house?.surcharge);
    const tokenProcessingCharge = isNaN(Number(auth.currentUser?.house?.token_surcharge)) ? Str.TOKEN_PROCESSING_CHARGE : Number(auth.currentUser?.house?.token_surcharge);
    const SERVICE_CHARGE_PERCENTAGE = houseSurcharge + tokenProcessingCharge;

    const kilowatts = useMemo(() => {
        if (!tokenAmount || tokenAmount < minTokenAmount) return 0;
        return Number((tokenAmount / tokenPerKw).toFixed(2));
    }, [tokenAmount, tokenPerKw]);

    useEffect(() => {
        const calculatedServiceCharge = tokenAmount * SERVICE_CHARGE_PERCENTAGE;
        setServiceCharge(Math.min(Math.max(calculatedServiceCharge, 500), 5000));
    }, [tokenAmount]);


    useEffect(() => {
        if (isAdmin) {
            setMeterNumber('');
        } else {
            setMeterNumber(authContext.currentUser?.meter_number ?? '')
        }
    }, [authContext.currentUser])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : '';
        setTokenAmount(Number(value));
    };


    const handlePurchase = () => {
        if (!meterNumber || !tokenAmount) {
            message.error("Please enter a valid meter number and token amount.");
            return;
        }

        if (tokenAmount < minTokenAmount) {
            message.error(`Minimum token amount is ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(minTokenAmount)}`);
            return;
        }

        onBuyToken()
    };


    const onBuyToken = async () => {
        try {
            setLoading(true);
            const amountOrQuantity = isAdmin ? { quantity: tokenAmount.toString() } : { amount: tokenAmount.toString() };
            const response = await apiUtil.transactionService.buyToken(meterNumber, amountOrQuantity.amount, amountOrQuantity.quantity);
            authContext.refreshProfile();
            message.success(isAdmin ? "Token generated successfully" : "Purchase successful");
            onClose();
            setResponseText(response.data); // Assuming the response contains a token
            setModalVisible(true);
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

    const handleCopy = () => {
        navigator.clipboard.writeText(responseText);
        message.success("Copied to clipboard!");
    };

    return (
        <>
            <Drawer
                title={isAdmin ? 'Generate token' : "Purchase Token"}
                placement="bottom"
                onClose={onClose}
                open={open}
                height={500}
                className="rounded-t-xl"
            >
                <div className="p-6">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center mb-4">
                            <Icon icon="mdi:electricity-circle" className="text-blue-500 mr-2 text-xl" />
                            <h4 className="text-lg font-semibold text-gray-900">Enter Details</h4>
                        </div>

                        {!isAdmin && false && (
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Cost per kW</span>
                                <span className="text-sm font-medium text-gray-900">₦{tokenPerKw}.00</span>
                            </div>
                        )}

                        <div className='space-y-2 mt-3'>
                            <span className='block text-xs'>Meter number</span>
                            <InputField
                                placeHolder="Enter meter number"
                                type="text"
                                name="meterNumber"
                                disabled={!isAdmin && authContext.currentUser?.meter_number ? true : false}
                                readOnly={!isAdmin && authContext.currentUser?.meter_number ? true : false}
                                value={meterNumber}
                                required={isAdmin}
                                onChange={(e) => setMeterNumber(e.target.value)}
                            />

                        </div>

                        <div className="space-y-2 mt-1">
                            <div className='flex items-center gap-x-1 justify-between' >
                                <span className='block text-xs'>Recharge {isAdmin ? 'Quantity' : 'Amount'}</span>
                                {!isAdmin && serviceCharge > 0 && (
                                    <span className='text-xs text-orange-600'>+ ₦{serviceCharge.toFixed(2)} processing fee</span>
                                )}
                            </div>
                            <InputField
                                placeHolder={isAdmin ? "Enter quantity" : "Enter token amount (min. ₦5,000)"}
                                type="number"
                                name={isAdmin ? "quantity" : "tokenAmount"}
                                value={tokenAmount === 0 ? '' : tokenAmount.toString()}
                                onChange={handleAmountChange}
                            />

                            <div className="h-6">
                                {tokenAmount > 0 && (
                                    <div className={`text-sm ${tokenAmount < minTokenAmount ? 'text-red-500' : 'text-green-600'}`}>
                                        {!isAdmin && tokenAmount < minTokenAmount ? (
                                            `Minimum amount is ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(minTokenAmount)}`
                                        ) : (
                                            !isAdmin && tokenAmount >= minTokenAmount && (
                                                <div className="flex items-center gap-x-1">
                                                    <Icon icon="mdi:lightning-bolt" className="text-yellow-500" />
                                                    <span>You will get approximately {kilowatts} kilowatts</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handlePurchase}
                            disabled={loading || !tokenAmount || tokenAmount < minTokenAmount}
                            className={`mt-0 w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-x-2 hover:bg-blue-600 transition-colors ${(loading || !tokenAmount || tokenAmount < minTokenAmount) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                            ) : (
                                <>
                                    <Icon icon="mdi:cart" className="text-xl" />
                                    <span className="font-medium">{isAdmin ? 'Generate token' : 'Purchase Token'}</span>
                                    {!isAdmin && tokenAmount >= minTokenAmount && <span className='text-white font-medium'>(₦ {tokenAmount + serviceCharge})</span>}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Drawer>

            <Modal
                title={<div className="text-center">Token Generated</div>}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                centered
            >
                <div className="flex flex-col items-center p-4">
                    <p className="text-lg font-medium text-gray-800 text-center">{responseText}</p>
                    <Button
                        type="primary"
                        onClick={handleCopy}
                        className="mt-4"
                    >
                        Copy Token
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default PurchaseTokenDrawer;