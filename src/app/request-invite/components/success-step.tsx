import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Download } from "lucide-react"
import { useRouter } from "next/navigation"

interface SuccessStepProps {
    houseName: string
    invite_code: string
    document_path?: string
}

export function SuccessStep({ houseName, invite_code, document_path }: SuccessStepProps) {
    const router = useRouter()

    const handleDownload = () => {
        if (document_path) {
            const fullPath = `https://api.homelett.co${document_path}`
            window.open(fullPath, '_blank')
        }
    }

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
                            <p className="text-orange-600 text-xs">Your signed agreement will be sent to your email.</p>
                        </div>

                        <p className="text-sm text-muted-foreground mt-4">
                            Your onboarding for {houseName} has been successfully submitted.
                            You can now login to access your dashboard.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {document_path && (
                        <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                            onClick={handleDownload}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Signed Agreement
                        </Button>
                    )}
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={() => router.push("/home/dashboard")}
                    >
                        Login to Dashboard
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 