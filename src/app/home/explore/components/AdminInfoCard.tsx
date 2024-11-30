import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import UtilService from '@/services/UtilService';
import { Icon } from '@iconify/react';
import { Tooltip } from 'antd';

const AdminInfoCard: React.FC = () => {
    const authContext = useContext(AuthContext);
    const utilService = new UtilService();

    const adminName = authContext.currentUser?.fullname ?? 'Admin';
    const adminEmail = authContext.currentUser?.email ?? 'admin@example.com';
    const totalBalance = utilService.formatMoney(
        `${(authContext.currentUser?.finance?.balance ?? 0)}`,
        "en-NG",
        "NGN"
    );
    const totalHouses = authContext.currentUser?.houses?.length ?? 0;
    const totalTransactions = authContext.currentUser?.recent_transactions?.length ?? 0;

    return (
        <div className="bg-white p-6 gap-y-12 rounded-lg shadow-sm max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 p-4  rounded-md shadow-sm">
                <div className="flex items-center">
                    <Icon icon="material-symbols-light:money-bag" className="text-3xl text-blue-500 mr-3" />
                    <div>
                        <p className="text-sm">Unpaid Balance</p>
                        <p className=" text-lg font-semibold text-gray-800 ">{totalBalance}</p>
                    </div>
                </div>
                <Tooltip title="Total amount yet to be transferred to your bank account.">
                    <Icon icon="mdi:information-outline" className="text-xl text-gray-400 cursor-pointer" />
                </Tooltip>
            </div>

            <div className="flex justify-between mt-10">

                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-x-2">
                        <Icon icon="mdi:home-city" className="text-xl text-purple-500 mb-1" />
                        <p className="text-lg font-semibold text-gray-700">{totalHouses}</p>
                    </div>
                    <p className="text-xs text-gray-500">Total Houses</p>
                </div>


                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-x-2">
                        <Icon icon="mdi:swap-horizontal" className="text-xl text-orange-500 mb-1" />
                        <p className="text-lg font-semibold text-gray-700">{0}</p>
                    </div>
                    <p className="text-xs text-gray-500">Pending Transactions</p>
                </div>

            </div>
        </div>
    );
};

export default AdminInfoCard; 