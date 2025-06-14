import { useRef, useState, useEffect } from "react"
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
    onSignatureValidated: (documentPath: string) => void
}

export function SignatureUpload({ isOpen, onClose, onSignatureValidated }: SignatureUploadProps) {
    const apiUtil = new APIUtil()
    const authContext = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)

    const initializeCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            ctx.lineWidth = 2
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#000'

            // Set canvas size based on container width
            const container = canvas.parentElement
            if (container) {
                const width = container.clientWidth - 20 // Subtract padding
                canvas.width = width
                canvas.height = Math.min(200, width * 0.5) // Maintain aspect ratio with max height
            }
        }
    }

    // Initialize canvas on mount and window resize
    useEffect(() => {
        initializeCanvas()
        window.addEventListener('resize', initializeCanvas)
        return () => window.removeEventListener('resize', initializeCanvas)
    }, [isOpen])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault() // Prevent scrolling on mobile while drawing
        setIsDrawing(true)
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            const rect = canvas.getBoundingClientRect()
            const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
            const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
            ctx.beginPath()
            ctx.moveTo(x, y)
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            const rect = canvas.getBoundingClientRect()
            const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
            const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const handleSaveSignature = async () => {
        const canvas = canvasRef.current
        if (!canvas) return

        try {
            setIsLoading(true)
            // Convert canvas to blob
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob!)
                }, 'image/png')
            })

            // Create a File object from the blob
            const file = new File([blob], 'signature.png', { type: 'image/png' })

            const response = await apiUtil.authService.uploadSignature(file)
            await authContext.refreshProfile()
            message.success("Signature saved successfully")
            onClose()
            onSignatureValidated(response.data.document_path)
        } catch (error) {
            if (error instanceof AxiosError) {
                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to complete request"
                    }`
                )
            } else {
                message.error("Unable to complete request")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Draw Your Signature</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-md">
                        <p className="text-sm text-yellow-800">
                            Please draw your signature clearly in the box below.
                        </p>
                    </div>
                    <div className="relative border rounded-md p-2 w-full">
                        <canvas
                            ref={canvasRef}
                            className="border border-gray-300 rounded-md touch-none w-full"
                            style={{
                                backgroundColor: 'white',
                                maxWidth: '100%',
                                touchAction: 'none' // Prevent scrolling on touch devices
                            }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={clearCanvas}
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                        >
                            Clear
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSaveSignature}
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                        >
                            Save Signature
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 