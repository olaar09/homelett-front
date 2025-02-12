import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import APIUtil from "@/services/APIUtil"
import { AxiosError } from "axios"
import { message } from "antd"
import { Loader2 } from "lucide-react"

interface SignatureUploadProps {
    isOpen: boolean
    onClose: () => void
    onSignatureValidated: (file: File) => void
}

export function SignatureUpload({ isOpen, onClose, onSignatureValidated }: SignatureUploadProps) {
    const apiUtil = new APIUtil()
    const authContext = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log("file", file);

        try {
            setIsLoading(true)
            await apiUtil.authService.uploadSignature(file!)
            await authContext.refreshProfile();
            message.success("Signature uploaded successfully");
            onClose()
            onSignatureValidated(file!)
        } catch (error) {
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
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Signature</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-md">
                        <p className="text-sm text-yellow-800">
                            Please ensure your signature is:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Clear and legible</li>
                                <li>On a white paper background</li>
                                <li>Well-lit when taking the photo</li>
                            </ul>
                        </p>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            disabled={isLoading}
                            onChange={handleFileChange}
                            className={`mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary file:text-white
                                ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:file:bg-primary/90'}
                                `}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 