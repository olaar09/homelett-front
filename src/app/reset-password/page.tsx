"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";

import { message } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter, useSearchParams } from "next/navigation";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

import { useScroll } from "ahooks";
import React, { useRef } from "react";
import GoogleLoginButton from "../components/Auth/GoogleSignin";
import InputField from "../components/InputField";
import Link from "next/link";
import ACButton from "../components/Button";
import AuthProblem from "../components/Auth/AuthProblem";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", otp: "" });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState("");
  const [otpSent, setOTPSent] = useState(false);

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

  const onRequestOTP = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (!otpSent) {
        response = await apiService.authService!.requestOTP({
          email: form.email,
        });

        message.success("OTP request sent !");
        setOTPSent(true);
      } else {
        response = await apiService.authService!.resetPassword({
          password: form.password,
          otp: form.otp,
        });

        localStorage.setItem("token", response.data.token!);
        message.success("Password reset successful");
        await authContext.refreshProfile();
        await authContext.refreshDataSource();

        router.push("/home/dashboard");
      }
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

  return (
    <main
      ref={divRef}
      onScroll={handleScroll}
      className="flex flex-col h-screen overflow-y-scroll items-center   pb-8"
    >
      <section className="flex-grow my-4 flex flex-col pt-4 items-center w-full mt-10">
        <div className="flex items-center gap-x-3   px-8   justify-center  lg:w-6/12 mx-auto">
          <Link href={"/"}>
            <div className="flex items-center gap-x-0   px-8   justify-center  lg:w-6/12 mx-auto">
              <img src="/logo.png" className="w-14 mr-2" />
              <span className=" text-foreground font-black text-2xl mt-0">
                Bubble
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-4 px-4 w-full  lg:w-6/12 mx-auto ">
          <span className=" lg:text-5xl text-2xl font-black">
            {" "}
            Reset password
          </span>
        </div>

        <form
          className="lg:w-4/12 w-full mx-auto mt-20"
          onSubmit={(e: any) => onRequestOTP(e)}
          method="post"
        >
          <div className="w-full px-8 flex flex-col gap-y-6">
            {!otpSent && (
              <div className="flex flex-col items-start gap-y-2 text-sm">
                <span>Email address</span>
                <InputField
                  name="email"
                  type="email"
                  placeHolder="Email address"
                  onChange={(e) => onChangeForm("email", e.target.value)}
                />
              </div>
            )}
            <div className="flex flex-col items-start gap-y-2 text-sm">
              {otpSent && <span>OTP</span>}
              {otpSent && (
                <InputField
                  name="otp"
                  type="text"
                  placeHolder="Enter OTP"
                  onChange={(e) => onChangeForm("otp", e.target.value)}
                />
              )}
            </div>

            <div className="flex flex-col items-start gap-y-2 text-sm">
              {otpSent && <span>Password</span>}
              {otpSent && (
                <InputField
                  name="password"
                  type="password"
                  placeHolder="Email password"
                  onChange={(e) => onChangeForm("password", e.target.value)}
                />
              )}
            </div>
            <ACButton
              text={otpSent ? "Reset Password" : "Request OTP"}
              type={"submit"}
              loading={loading}
              children={undefined}
            />

            <div className="flex items-center justify-center">
              <span>
                <Link href={"/login"}>
                  <span className="text-sm underline">Go back to login</span>
                </Link>
              </span>
            </div>
          </div>
        </form>

        <AuthProblem />
      </section>

      <section className="px-6 flex flex-col items-center justify-center gap-y-4 ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to Bubble'{" "}
          <span className=" text-banner"> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
