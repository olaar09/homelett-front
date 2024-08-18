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
import { useAppConfig } from "@/contexts/AppConfigContext";

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
          home_products: []
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
          home_products: []
        });
      }

      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      router.push("/home/explore");
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
      await authContext.refreshDataSource();

      router.push("/home/explore");
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
      className="flex flex-col h-screen overflow-y-scroll items-center   pb-8 bg-black"
    >
      <section className="flex-grow my-4 flex flex-col pt-4 items-center w-full mt-10">
        <div className="flex items-center gap-x-3   px-8   justify-center  lg:w-6/12 mx-auto">
          <Link href={"/"}>
            <div className="flex items-center gap-x-0   px-8   justify-center  lg:w-6/12 mx-auto">
              <img src={`/logo.jpg`} className="w-10 mr-2 rounded-lg border" />
              <span className=" text-foreground font-black  text-3xl mt-0 font-bold-family text-white">
                Korn
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-4 px-4 w-full  lg:w-6/12 mx-auto ">
          <span className=" text-white lg:text-5xl text-2xl font-white font-bold-family">
            {" "}
            Login to your account
          </span>
        </div>

        <div className="my-4 gap-x-3 mt-9 flex items-center justify-between w-5/12 mx-auto px-8">
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1 "></div>
          <span className=" text-foreground-secondary text-sm"></span>
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1"></div>
        </div>

        <form
          className="lg:w-4/12 w-full mx-auto mt-6"
          onSubmit={(e: any) => onSubmitLogin(e)}
          method="post"
        >
          <div className="w-full px-8 flex flex-col gap-y-6">
            <div className="flex flex-col items-start gap-y-2 text-sm">
              <span className="text-gray-400">Email address</span>
              <InputField
                name="email"
                type="email"
                placeHolder="Email address"
                onChange={(e) => onChangeForm("email", e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-y-2 text-sm">
              <span className="text-gray-400">Password</span>
              <InputField
                name="password"
                type="password"
                required={true}
                placeHolder="Password"
                onChange={(e) => onChangeForm("password", e.target.value)}
              />
            </div>
            <ACButton
              text={
                query.get("is_new") === "true"
                  ? "Sign up with email"
                  : "Login with email"
              }
              type={"submit"}
              loading={loading}
              children={undefined}
            />

            <div className="flex items-center justify-between">
              <span>
                <Link href={"/reset-password"}>
                  <span className="text-sm text-gray-500">Forgot password</span>
                </Link>
              </span>

              <span>.</span>

              <span>
                <Link href={"/request-invite"}>
                  <span className="text-sm text-gray-500">New account</span>
                </Link>
              </span>
            </div>
          </div>
        </form>

        <AuthProblem />
      </section>

      <section className="px-6 flex flex-col items-center justify-center gap-y-4 ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to Korn Money{" "}
          <span className=" text-banner"> <br /> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
