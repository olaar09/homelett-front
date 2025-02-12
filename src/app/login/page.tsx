"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";

import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

import React, { useRef } from "react";
import Link from "next/link";
import AuthProblem from "../components/Auth/AuthProblem";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { LoginForm } from "./components/Form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const appConfig = useAppConfig()
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState("");

  const divRef = useRef<any>(null);

  // Function to handle scroll event
  const handleScroll = () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;
      const scrollLeft = divRef.current.scrollLeft;
      console.log(scrollTop);

      /*   if (scrollTop > 450) {
        setRotationDegrees("rotate-x-45");
      } else  */ if (scrollTop > 300) {
        setRotationDegrees("rotate-x-30");
      } else if (scrollTop > 275) {
        setRotationDegrees("rotate-x-12");
      } else if (scrollTop > 100) {
        setRotationDegrees("rotate-x-6");
      } else {
        setRotationDegrees("rotate-x-0");
      }
    }
  };

  useEffect(() => {
    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Now the vertical position is available with `scrollYPosition`
  console.log(scrollYPosition);

  const onChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (query.get("is_new") === "true") {
        response = await apiService.authService!.register({
          email: form.email,
          password: form.password,
          phone: "",
          subscriptions: [],
          is_return_user: 0,
          total_invites: 0,
          total_active_invites: 0,
          invite_token: "",
          invite_link: "",
          p2p: {
            bank_info: {
              bank_name: "",
              bank_account_number: "",
              bank_account_name: "",
            },
          },
          streaming: [],
          reseller_products: [],
          configs: [],
          is_house_admin: 0,
          onboardingStep: 0,
          recent_transactions: [],
          active_sub: {
            id: 0,
            user_id: 0,
            product_id: 0,
            plan_end: "",
            is_active: 0,
            interval: "",
            plan: null
          }
        });
      } else {
        response = await apiService.authService!.login({
          email: form.email,
          password: form.password,
          phone: "",
          subscriptions: [],
          is_return_user: 0,
          total_invites: 0,
          total_active_invites: 0,
          invite_token: "",
          invite_link: "",
          p2p: {
            bank_info: {
              bank_name: "",
              bank_account_number: "",
              bank_account_name: "",
            },
          },
          streaming: [],
          reseller_products: [],
          configs: [],
          is_house_admin: 0,
          onboardingStep: 0,
          recent_transactions: [],
          active_sub: {
            id: 0,
            user_id: 0,
            product_id: 0,
            plan_end: "",
            is_active: 0,
            interval: "",
            plan: null
          }
        });
      }
      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");

      console.log(response.data);
      if (response.data.is_admin == 1) {
        router.push("/home/super_dashboard");
      } else {
        router.push("/home/dashboard");
      }
      await authContext.refreshProfile();

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

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
      setLoading(false);
    }
  };

  const googleLogin = async (IdToken: string) => {
    setLoading(true);

    try {
      const response = await apiService.authService!.googleSignIn(IdToken);
      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      router.push("/home/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("IS ERROR", error);
        console.log("IS ERROR MESSAGE", error.message);

        message.error(
          `${error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to complete request"
          }`
        );
      } else {
        console.log("IS ERROR MESSAGE");
        message.error("Unable to complete sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      ref={divRef}
      onScroll={handleScroll}
      className="flex flex-col h-screen overflow-y-scroll items-center   pb-8 bg-white relative"
    >
      <div className="absolute top-0 left-0 w-full bg-white z-10 p-x-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-10 w-10" />
          </Button>
        </Link>
      </div>
      <section className="flex-grow my-4 flex flex-col pt-4 items-center w-full mt-10 text-[0.7rem]">
        <div className="w-full max-w-md text-[0.7rem]">
          <LoginForm onChangeForm={onChangeForm} onSubmitLogin={onSubmitLogin} />
        </div>

        <AuthProblem />
      </section>

      <section className="px-6 flex flex-col items-center justify-center gap-y-4 text-[0.7rem]">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to Homelett {" "}
          <span className=" text-banner"> <br /> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
