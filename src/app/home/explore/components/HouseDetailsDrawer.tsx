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
                            icon={<Icon icon="material-symbols-light:home-outline" width="24" />}
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
                            icon={<Icon icon="ph:id-card-duotone" width="24" />}
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
                    <div className="w-full p-6 bg-white rounded-lg shadow-sm space-y-4">
                        {houseDetails?.residents.map((resident, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="text-blue-500 text-lg">
                                        <Icon icon="ph:user-circle-duotone" width="24" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-800">{resident.fullname}</h3>
                                </div>
                                <div className="ml-9 space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Icon icon="ph:phone-duotone" className="text-blue-500" width="20" />
                                        <span className='text-xs'>{resident.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Icon icon="ph:envelope-duotone" className="text-blue-500" width="20" />
                                        <span className='text-xs'>{resident.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeSegment === 'Transactions' && (
                    <div style={{ width: '33%', padding: '10px', textAlign: 'center' }}>
                        {/* Display transactions here */}
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default HouseDetailsDrawer; 