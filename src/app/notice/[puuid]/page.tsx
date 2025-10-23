'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import APIUtil from '@/services/APIUtil';
import { ContractData } from '@/interfaces';
import { Str } from '@/utils/consts';

interface NoticePageProps { }

const NoticePage: React.FC<NoticePageProps> = () => {
    const params = useParams();
    const puuid = params.puuid as string;

    const [contractData, setContractData] = useState<ContractData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const apiUtil = new APIUtil();
    const maxRetries = 3;

    // Helper function to format notice type
    const formatNoticeType = (noticeType: string): string => {
        const typeMap: Record<string, string> = {
            'rent_increase': 'Rent Increase Notice',
            'eviction': 'Eviction Notice',
            'maintenance': 'Maintenance Notice',
            'utility': 'Utility Notice',
            'termination': 'Lease Termination Notice',
            'renewal': 'Lease Renewal Notice',
            'inspection': 'Inspection Notice',
            'repair': 'Repair Notice',
            'payment': 'Payment Notice',
            'violation': 'Violation Notice'
        };

        return typeMap[noticeType] || noticeType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' ';
    };

    const fetchNoticeData = async () => {
        if (!puuid) {
            setError('Invalid contract ID');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await apiUtil.contractService.getNotice(puuid);

            if (response.status === 'success' && response.data) {
                setContractData(response.data);

                // Construct PDF URL if generated_path is available
                if (response.data.generated_path) {
                    const baseUrl = process.env.NODE_ENV === 'production'
                        ? Str.baseUrlProd
                        : Str.baseUrlDev;
                    setPdfUrl(`${baseUrl}${response.data.generated_path}`);
                }
            } else {
                setError('Failed to load contract data');
            }
        } catch (err: any) {
            console.error('Error fetching notice:', err);
            setError(err.message || 'An error occurred while loading the contract');

            // Retry logic
            if (retryCount < maxRetries) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 2000 * (retryCount + 1)); // Exponential backoff
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticeData();
    }, [puuid, retryCount]);

    const handleRetry = () => {
        setRetryCount(0);
        fetchNoticeData();
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative mx-auto w-16 h-16">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-300"></div>
                    </div>
                    <p className="text-gray-600 mt-4 text-lg font-medium">Loading contract...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Contract</h1>
                    <p className="text-gray-600 mb-8">{error}</p>

                    {retryCount < maxRetries ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Retrying... ({retryCount + 1}/{maxRetries})
                            </p>
                            <div className="w-full bg-blue-100 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${((retryCount + 1) / maxRetries) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleRetry}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (!contractData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">No Contract Found</h1>
                    <p className="text-gray-600">The requested contract could not be found or is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Elegant Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div>
                            <h1 className="text-sm font-semibold text-gray-800">
                                {contractData?.notice_type ? formatNoticeType(contractData.notice_type) : 'Contract Notice'}
                            </h1>
                            {contractData && (
                                <div className="flex items-center space-x-3 mt-1">
                                    <span className="text-xs text-gray-500 font-medium">{contractData.tenant_name}</span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{contractData.house_name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                        {puuid.slice(0, 8)}...
                    </div>
                </div>
            </div>

            {/* PDF Viewer */}
            {pdfUrl && (
                <div className="h-[calc(100vh-80px)] w-full relative">
                    <div className="absolute inset-0 bg-white rounded-t-2xl shadow-2xl overflow-hidden">
                        <iframe
                            src={pdfUrl}
                            className="w-full h-full border-0"
                            title="Contract PDF"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticePage;
