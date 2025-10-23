'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import APIUtil from '@/services/APIUtil';
import { ContractData } from '@/interfaces';
import { Str } from '@/utils/consts';

interface AgreementPageProps { }

const AgreementPage: React.FC<AgreementPageProps> = () => {
    const params = useParams();
    const puuid = params.puuid as string;

    const [contractData, setContractData] = useState<ContractData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const apiUtil = new APIUtil();
    const maxRetries = 3;

    const fetchAgreementData = async () => {
        if (!puuid) {
            setError('Invalid contract ID');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await apiUtil.contractService.getAgreement(puuid);

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
            console.error('Error fetching agreement:', err);
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
        fetchAgreementData();
    }, [puuid, retryCount]);

    const handleRetry = () => {
        setRetryCount(0);
        fetchAgreementData();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading agreement...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Agreement</h1>
                    <p className="text-gray-600 mb-6">{error}</p>

                    {retryCount < maxRetries ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Retrying... ({retryCount + 1}/{maxRetries})
                            </p>
                            <div className="animate-pulse bg-blue-100 h-2 rounded">
                                <div
                                    className="bg-blue-600 h-2 rounded transition-all duration-1000"
                                    style={{ width: `${((retryCount + 1) / maxRetries) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleRetry}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No Agreement Found</h1>
                    <p className="text-gray-600">The requested agreement could not be found or is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Agreement</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Status: {contractData.status}
                        </span>
                        <span>Agreement ID: {puuid}</span>
                    </div>
                </div>

                {/* PDF Viewer */}
                {pdfUrl && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement Document</h2>
                        <div className="border rounded-lg overflow-hidden">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-96"
                                title="Agreement PDF"
                            />
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Open in New Tab
                            </a>
                            <a
                                href={pdfUrl}
                                download
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                )}

                {/* Signature Section */}
                {contractData.tenant_signature && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tenant Signature</h2>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <img
                                src={contractData.tenant_signature}
                                alt="Tenant Signature"
                                className="max-w-full h-auto border rounded"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgreementPage;
