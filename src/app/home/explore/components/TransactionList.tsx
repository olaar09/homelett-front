import React, { useState } from 'react';
import { ITransaction } from "@/app/interfaces/IProduct";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from 'antd';

interface TransactionListProps {
    transactions: ITransaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
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

    if (transactions.length === 0) {
        return <div className="text-center text-gray-500">No transactions available</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    {transaction.title.charAt(0).toUpperCase() + transaction.title.slice(1)}
                                </h3>
                                <p className="text-xs text-gray-500">{transaction.description}</p>
                            </div>
                            <span className={`flex items-center text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className={`flex items-center px-2 py-1 text-xs rounded-full ${transaction.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : transaction.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {transaction.status === 'completed' && <Icon icon="mdi:check-circle" className="mr-1" />}
                                    {transaction.status === 'pending' && <Icon icon="mdi:clock-outline" className="mr-1" />}
                                    {transaction.status !== 'completed' && transaction.status !== 'pending' && <Icon icon="mdi:alert-circle" className="mr-1" />}
                                    {transaction.status}
                                </span>
                                {transaction.value && (
                                    <button
                                        onClick={() => toggleDrawer(transaction.value!)}
                                        className="text-xs text-blue-500 flex items-center gap-x-1"
                                    >
                                        <Icon icon="mdi:open-in-new" />
                                        <span>Open</span>
                                    </button>
                                )}
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(transaction.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Drawer
                title="Transaction Value"
                placement="bottom"
                onClose={() => toggleDrawer(null)}
                open={drawerOpen}
                height={300}
                className="rounded-t-xl"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Icon icon="mdi:information-outline" className="text-blue-500 mr-2 text-xl" />
                            <h4 className="text-lg font-semibold text-gray-900">Details</h4>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-x-1 px-3 py-1.5 rounded-md transition-colors ${copied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Icon
                                icon={copied ? "mdi:check" : "mdi:content-copy"}
                                className="text-lg"
                            />
                            <span className="text-sm font-medium">
                                {copied ? 'Copied!' : 'Copy'}
                            </span>
                        </button>
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                        {drawerContent}
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default TransactionList; 