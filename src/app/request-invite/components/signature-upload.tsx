import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SignatureUploadProps {
    isOpen: boolean
    onClose: () => void
    onSignatureValidated: (file: File) => void
}

export function SignatureUpload({ isOpen, onClose, onSignatureValidated }: SignatureUploadProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        //upload file to nestjs server
        if (file) {
            onSignatureValidated(file)
            onClose()
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary/90"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
} 