import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface SuccessStepProps {
    houseName: string
}

export function SuccessStep({ houseName }: SuccessStepProps) {
    const router = useRouter()

    return (
        <Card className="border-none shadow-none">
            <CardContent className="space-y-8 pt-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-0">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Onboarding Complete!
                            </h2>
                            <p className="text-orange-600 text-xs"> Your signed agreement will be sent to your email.</p>

                        </div>

                        <p className="text-sm text-muted-foreground mt-4">
                            Your onboarding for {houseName} has been successfully submitted.
                            You can now login to access your dashboard.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={() => router.push("/home/dashboard")}
                    >
                        Login to Dashboard
                    </Button>
                    {/*     <Link href="/home/dashboard" className="w-full">
                        <Button variant="outline" className="w-full" size="lg">
                            Back to Home
                        </Button>
                    </Link> */}
                </div>
            </CardContent>
        </Card>
    )
} 