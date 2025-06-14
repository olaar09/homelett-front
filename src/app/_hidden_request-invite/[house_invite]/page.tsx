"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import RegisterForm from "../components/Form"
import { Progress } from "@/components/ui/progress"
import type { RegisterFormData } from "@/app/interfaces/IRegister"
import { IAuthRequest, IHouseInvite } from "../../interfaces/IRegisterRequest"
import { ArrowLeft, X } from "lucide-react"
import { HomeLettAvatar } from "../../components/Landing/HomeLettAvatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRequest } from "ahooks"
import APIService from "@/services/APIService"
import APIUtil from "@/services/APIUtil"
import { message } from "antd"
import { LoadingAndErrorStates } from "@/app/components/LoadingState"
import { IHouse, IModule } from "@/app/interfaces/IHouse"
import { useAuth } from "@/contexts/AuthContext"

// Replace the static STEPS constant with a function
const getSteps = (house: IHouse) => {
  const baseSteps = ["House Information", "Bio Information", "Utility information"];

  // Check if KYC is required for this house
  if (house?.modules?.some((module: IModule) => module.name.toLowerCase() === 'kyc')) {
    return [...baseSteps, "KYC information", "Next of Kin", "Legal Agreements", 'Success'];
  }

  return [...baseSteps, "Legal Agreements", 'Success'];
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    unit_name: "",
    current_address: "",
    work_address: "",
    occupation: "",
    nin: "",
    kin_name: "",
    kin_relationship: "",
    kin_phone: "",
    kin_address: "",
    meter_number: "",
    rent_agreement: false,
    payment_agreement: false,
  })
  const [currentUser, setCurrentUser] = useState<IAuthRequest | null>(null)
  const router = useRouter()
  const params = useParams()
  const { house_invite } = params;
  const { loading: userLoading } = useAuth()

  const apiUtils = new APIUtil()

  const {
    data: houseInvite,
    error: housesError,
    loading: loadingHouse,
    refresh: refreshHouse,
  } = useRequest(() => getHouseInvite());


  const getHouseInvite = async (): Promise<any> => {
    try {
      const data = await apiUtils.houseService.getHouseInvite(`${house_invite}`)
      return data;
    } catch (error) {
      throw error;
    }
  };

  /*   const getHouse = async (): Promise<any> => {
      try {
        const data = await apiUtils.houseService.getHouseBySlug(`${house_invite}`)
        return data;
      } catch (error) {
        throw error;
      }
    }; */


  // Get dynamic steps based on house configuration
  const steps = houseInvite?.house ? getSteps(houseInvite.house) : [];

  const progress = currentStep >= steps.length
    ? 100
    : ((currentStep + 1) / steps.length) * 100;

  // Update the useEffect for redirect
  useEffect(() => {
    if (currentUser && currentUser.onboarding_step >= steps.length) {
      router.push("/dashboard")
    }
  }, [currentUser, router, steps])

  if (currentUser && currentUser.onboarding_step >= steps.length) {
    return null // Prevent rendering while redirecting
  }

  if (housesError || loadingHouse) {
    return <div className="flex flex-col items-center justify-center h-screen">

      <LoadingAndErrorStates
        isLoading={loadingHouse || userLoading}
        error={housesError != null}
        errorMessage={'Unable to load house. Please contact your landlord for the correct link to signup'}
        onRetry={refreshHouse}
      />

    </div>

  }



  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <div className="absolute top-0 left-0 w-full bg-white z-10 p-x-10 hidden sm:block">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-10 w-10" />
          </Button>
        </Link>
      </div>
      <div className="flex-grow flex  items-start  pt-4 md:pt-0 md:items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-4">
          <div className="flex justify-between items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <HomeLettAvatar isGen={false} name={"HomeLett"} avatarSrc={"/favicon.png"} width="w-8" height="h-8" />
              <div className="text-2xl font-bold">{currentUser ? "Complete Your Profile" : "Create an account"}</div>
            </div>

            <div className="flex items-center gap-x-2 md:hidden">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <X className="h-10 w-10" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-0 space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="hidden sm:flex justify-between text-sm text-muted-foreground">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`${currentStep >= steps.length || index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                    }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="sm:hidden text-sm text-muted-foreground">
              <p className="font-medium text-primary">
                Step {Math.min(currentStep + 1, steps.length)} of {steps.length}: {
                  steps[Math.min(currentStep, steps.length - 1)]
                }
              </p>
            </div>
          </div>
          <RegisterForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            setFormData={setFormData}
            totalSteps={steps.length}
            currentUser={currentUser}
            invite={houseInvite}
            refreshHouse={refreshHouse}
          />
        </div>
      </div>

      {/*  <section className="px-6 py-4 flex flex-col items-center justify-center gap-y-4 ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to Homelett {" "}
          <span className=" text-banner"> <br /> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section> */}
    </div>
  )
}

