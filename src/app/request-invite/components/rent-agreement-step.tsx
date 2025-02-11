import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
export function RentAgreementStep({ data, onUpdate, onNext, onPrev }: StepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (data.rentAgreement) {
            onNext()
        } else {
            alert("You must agree to the terms to continue.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Rent Agreement</h3>
                <p className="text-sm text-gray-600">
                    Please read the following rent agreement carefully and check the box below to indicate your agreement.
                </p>
                <div className="h-40 overflow-y-auto border p-4 rounded-md">
                    <p>
                        This is a placeholder for the full text of the rent agreement. In a real application, you would include the
                        complete terms and conditions here.
                    </p>
                    <p>
                        The agreement should cover important aspects such as rent amount, payment schedule, security deposit,
                        maintenance responsibilities, and other relevant terms.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="rentAgreement"
                        checked={data.rentAgreement}
                        onCheckedChange={(checked) => onUpdate({ rentAgreement: checked as boolean })}
                    />
                    <Label htmlFor="rentAgreement">I have read and agree to the terms of the rent agreement</Label>
                </div>
            </div>
            <div className="flex justify-between">
                <Button type="button" onClick={onPrev} variant="outline">
                    Previous
                </Button>
                <Button type="submit" disabled={!data.rentAgreement}>
                    Next
                </Button>
            </div>
        </form>
    )
}

