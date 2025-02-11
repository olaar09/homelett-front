import { LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import HomeFooter from "./components/Landing/HomeFooter"
import { HomeLettAvatar } from "./components/Landing/HomeLettAvatar"

export default function AuthPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center p-4">
        <Card className="w-full max-w-md space-y-8 p-8 shadow-none border-none">
          <div className="flex justify-center">
            <HomeLettAvatar name="HomeLett" avatarSrc="/favicon.png" isGen={false} width="w-20" height="h-20" />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome to Homelett Residences</h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/login" className="w-full">
              <Button variant="secondary" size="lg" className="w-full gap-2 text-sm">
                <LogIn className="h-5 w-5" />
                Existing resident
              </Button>
            </Link>

            <Link href="/request-invite/new-resident" className="w-full">
              <Button variant="secondary" size="lg" className="w-full gap-2 text-sm">
                <UserPlus className="h-5 w-5" />
                New resident
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      <HomeFooter />
    </div>
  )
}

