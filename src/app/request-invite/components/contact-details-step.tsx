import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
export function ContactDetailsStep({ data, onUpdate, onNext, onPrev }: StepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address</Label>
                <Input
                    id="currentAddress"
                    placeholder="123 Main St, City, State, ZIP"
                    value={data.currentAddress}
                    onChange={(e) => onUpdate({ currentAddress: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="previousAddress">Previous Address (if applicable)</Label>
                <Input
                    id="previousAddress"
                    placeholder="456 Elm St, City, State, ZIP"
                    value={data.previousAddress}
                    onChange={(e) => onUpdate({ previousAddress: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    placeholder="New York"
                    value={data.city}
                    onChange={(e) => onUpdate({ city: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                    id="state"
                    placeholder="NY"
                    value={data.state}
                    onChange={(e) => onUpdate({ state: e.target.value })}
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

