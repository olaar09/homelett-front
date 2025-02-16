import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AxiosError } from "axios"
import { message } from "antd"
import { useAuth } from "@/contexts/AuthContext"
import APIUtil from "@/services/APIUtil"

interface CreateIssueModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => Promise<void>
}

export function CreateIssueModal({ isOpen, onClose, onSubmit }: CreateIssueModalProps) {
    const apiUtil = new APIUtil()
    const authContext = useAuth()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log("file", file);

        try {
            setIsLoading(true)
            const fileUrl = await apiUtil.authService.uploadSignature(file!)
            message.success("File uploaded successfully");
            setFormData({ ...formData, image_url: fileUrl })
            // await authContext.refreshProfile();
            //  onClose()
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

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        severity: '',
        resolution: '',
        landlord_deductable: 0,
        user_deductable: 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await onSubmit(formData)
            onClose()
        } catch (error) {
            console.error('Failed to create issue:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Issue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Issue Name</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Image</Label>
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
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="severity">Severity</Label>
                        <Select
                            value={formData.severity}
                            onValueChange={(value) => setFormData({ ...formData, severity: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* 
                    <div className="space-y-2">
                        <Label htmlFor="resolution">Resolution</Label>
                        <Textarea
                            id="resolution"
                            value={formData.resolution}
                            onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                        />
                    </div> */}

                    {/*       <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="landlord_deductable">Landlord Amount</Label>
                            <Input
                                id="landlord_deductable"
                                type="number"
                                value={formData.landlord_deductable}
                                onChange={(e) => setFormData({ ...formData, landlord_deductable: parseFloat(e.target.value) })}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="user_deductable">User Amount</Label>
                            <Input
                                id="user_deductable"
                                type="number"
                                value={formData.user_deductable}
                                onChange={(e) => setFormData({ ...formData, user_deductable: parseFloat(e.target.value) })}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div> */}

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Issue'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
} 