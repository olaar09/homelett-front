import React, { useState, useEffect } from 'react';
import { Drawer, message, Descriptions, Card, Segmented } from 'antd';
import { IHouse } from '@/app/interfaces/IRegisterRequest';
import APIUtil from '@/services/APIUtil';
import { AxiosError } from 'axios';
import { Icon } from '@iconify/react';

interface HouseDetailsDrawerProps {
    visible: boolean;
    house: IHouse | null;
    onClose: () => void;
}

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | undefined;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
        <div className="text-blue-500 text-lg">{icon}</div>
        <div>
            <span className="text-gray-500 font-medium">{label}</span>
            <p className="text-gray-800">{value}</p>
        </div>
    </div>
);

const HouseDetailsDrawer: React.FC<HouseDetailsDrawerProps> = ({ visible, house, onClose }) => {
    const [houseDetails, setHouseDetails] = useState<IHouse | null>(null);
    const [activeSegment, setActiveSegment] = useState<string>('Information');
    const apiUtil = new APIUtil();

    const fetchHouseDetails = async () => {
        try {
            const response = await apiUtil.houseService.getHouse(house?.id ?? 0);
            setHouseDetails(response.data);
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error?.response?.data?.reason);

                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to complete request"
                    }`
                );
            } else {
                message.error("Unable to complete request");
            }
        }
    }

    const copyToClipboard = (text: string, type: 'phone' | 'email') => {
        navigator.clipboard.writeText(text).then(() => {
            message.success(`${type === 'phone' ? 'Phone number' : 'Email'} copied to clipboard`);
        }).catch(() => {
            message.error('Failed to copy to clipboard');
        });
    };

    useEffect(() => {
        if (visible && house) {
            fetchHouseDetails();
        }
    }, [visible, house]);

    return (
        <Drawer
            title={house?.house_name}
            placement="top"
            onClose={onClose}
            visible={visible}
            height="100vh"
        >
            <div className='w-full'>
                <Segmented
                    options={['Information', 'Residents', 'Transactions']}
                    value={activeSegment}
                    className='w-full'
                    block
                    onChange={(value) => setActiveSegment(value as string)}
                    style={{
                        marginBottom: 16,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                />

                {activeSegment === 'Information' && (
                    <div className="w-full p-6 bg-white rounded-lg shadow-sm space-y-4">
                        <InfoItem
                            icon={<Icon icon="ic:round-home" width="24" />}
                            label="Address"
                            value={houseDetails?.address}
                        />
                        <InfoItem
                            icon={<Icon icon="ph:user-duotone" width="24" />}
                            label="Contact Person"
                            value={houseDetails?.contact_person_name}
                        />
                        <InfoItem
                            icon={<Icon icon="ph:phone-duotone" width="24" />}
                            label="Phone Number"
                            value={houseDetails?.contact_phone}
                        />
                        <InfoItem
                            icon={<Icon icon="ph:envelope-duotone" width="24" />}
                            label="Email"
                            value={houseDetails?.contact_email}
                        />
                        <InfoItem
                            icon={<Icon icon="ph:bank-duotone" width="24" />}
                            label="Bank Name"
                            value={houseDetails?.bank_name}
                        />
                        <InfoItem
                            icon={<Icon icon="fluent:rename-28-filled" width="24" />}
                            label="Account Name"
                            value={houseDetails?.account_name}
                        />
                        <InfoItem
                            icon={<Icon icon="ph:credit-card-duotone" width="24" />}
                            label="Account Number"
                            value={houseDetails?.bank_account}
                        />
                    </div>
                )}
                {activeSegment === 'Residents' && (
                    <div className="w-full h-[calc(100vh-200px)] flex flex-col">
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6 space-y-4">
                                {houseDetails?.residents.map((resident, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="text-gray-300 text-lg">
                                                <Icon icon="ph:user-circle-duotone" width="24" />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-800">{resident.fullname}</h3>
                                        </div>
                                        <div className="ml-9 space-y-2">
                                            <div
                                                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:bg-gray-200 p-1 rounded-md transition-colors"
                                                onClick={() => copyToClipboard(resident.phone, 'phone')}
                                                title="Click to copy phone number"
                                            >
                                                <Icon icon="ph:phone-duotone" className="text-gray-500" width="20" />
                                                <span className='text-xs'>{resident.phone}</span>
                                                <Icon icon="ph:copy" className="text-gray-400 hover:text-gray-600" width="14" />
                                            </div>
                                            <div
                                                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:bg-gray-200 p-1 rounded-md transition-colors"
                                                onClick={() => copyToClipboard(resident.email, 'email')}
                                                title="Click to copy email"
                                            >
                                                <Icon icon="ph:envelope-duotone" className="text-gray-500" width="20" />
                                                <span className='text-xs'>{resident.email}</span>
                                                <Icon icon="ph:copy" className="text-gray-400 hover:text-gray-600" width="14" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {activeSegment === 'Transactions' && (
                    <div className="w-full h-[calc(100vh-200px)] flex flex-col">
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6 space-y-4">
                                {houseDetails?.transactions?.map((transaction, index) => (
                                    <div key={index} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className={`p-2 rounded-full ${transaction.type === 'INCOME' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                                <Icon icon={transaction.type === 'INCOME' ? "ph:arrow-down-left-bold" : "ph:arrow-up-right-bold"} width="24" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-gray-800">
                                                    {transaction.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {new Date(transaction.created_at).toLocaleDateString('en-NG', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className={`text-sm font-bold px-3 py-1.5 rounded-full ${transaction.type === 'INCOME'
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-red-50 text-red-600'
                                                }`}>
                                                {transaction.type === 'INCOME' ? '+' : '-'} ₦{transaction.amount.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-start gap-x-4 mt-2 ml-11">

                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Icon icon="ph:user-circle-duotone" className="text-gray-400" width="18" />
                                                <span className="text-xs font-medium">{transaction.description}</span>
                                            </div>

                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Icon icon="ph:check-circle-duotone" className="text-gray-400" width="18" />
                                                <span className="text-xs font-medium">{transaction.status}</span>
                                            </div>


                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default HouseDetailsDrawer; 