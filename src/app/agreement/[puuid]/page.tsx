'use client';

import { useState, useEffect, useRef } from 'react';
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
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

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

    // Signature functionality
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveSignature = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsSigning(true);
        try {
            const signatureData = canvas.toDataURL('image/png');

            // Here you would typically send the signature to your API
            // For now, we'll just update the local state
            if (contractData) {
                setContractData({
                    ...contractData,
                    tenant_signature: signatureData
                });
            }

            setShowSignatureModal(false);
        } catch (error) {
            console.error('Error saving signature:', error);
        } finally {
            setIsSigning(false);
        }
    };

    const openSignatureModal = () => {
        setShowSignatureModal(true);
        // Initialize canvas
        setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
        }, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-500"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-emerald-300"></div>
                    </div>
                    <p className="text-gray-600 mt-4 text-lg font-medium">Loading agreement...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Agreement</h1>
                    <p className="text-gray-600 mb-8">{error}</p>

                    {retryCount < maxRetries ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Retrying... ({retryCount + 1}/{maxRetries})
                            </p>
                            <div className="w-full bg-emerald-100 rounded-full h-2">
                                <div
                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${((retryCount + 1) / maxRetries) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleRetry}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">No Agreement Found</h1>
                    <p className="text-gray-600">The requested agreement could not be found or is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
            {/* Elegant Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div>
                            <h1 className="text-sm font-semibold text-gray-800">Rental Agreement</h1>
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
                            title="Agreement PDF"
                        />
                    </div>
                </div>
            )}

            {/* Signature Button - Only show when tenant_signature is null */}
            {contractData && (
                <div className="fixed bottom-5 left-0  right-0 z-10 px-4">
                    <button
                        onClick={openSignatureModal}
                        className="bg-emerald-600 text-white text-center px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 w-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Add Signature</span>
                    </button>
                </div>
            )}

            {/* Signature Modal */}
            {showSignatureModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Agreement</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg mb-4">
                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={200}
                                className="w-full h-48 cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={clearSignature}
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setShowSignatureModal(false)}
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveSignature}
                                disabled={isSigning}
                                className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {isSigning ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgreementPage;
