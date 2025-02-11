import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
export function NextOfKinStep({ data, onUpdate, onNext, onPrev }: StepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="kinName">Next of Kin Name</Label>
                <Input
                    id="kinName"
                    placeholder="John Doe"
                    value={data.kinName}
                    onChange={(e) => onUpdate({ kinName: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="kinRelationship">Relationship</Label>
                <Input
                    id="kinRelationship"
                    placeholder="Spouse, Parent, Sibling, etc."
                    value={data.kinRelationship}
                    onChange={(e) => onUpdate({ kinRelationship: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="kinPhone">Phone Number</Label>
                <Input
                    id="kinPhone"
                    type="tel"
                    placeholder="+234..."
                    value={data.kinPhone}
                    onChange={(e) => onUpdate({ kinPhone: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="kinAddress">Address</Label>
                <Input
                    id="kinAddress"
                    placeholder="123 Main St, City, State, ZIP"
                    value={data.kinAddress}
                    onChange={(e) => onUpdate({ kinAddress: e.target.value })}
                    required
                />
            </div>
            <div className="flex justify-between">
                <Button type="button" onClick={onPrev} variant="outline">
                    Previous
                </Button>
                <Button type="submit">Next</Button>
            </div>
        </form>
    )
}

