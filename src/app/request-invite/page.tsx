"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";

import { Tag, message } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

import React, { useRef } from "react";
import ACButton from "../components/Button";
import InputField from "../components/InputField";
import Link from "next/link";
import AuthProblem from "../components/Auth/AuthProblem";
import { useAppConfig } from "@/contexts/AppConfigContext";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState("");
  const appConfig = useAppConfig()

  const inviteCode = query.get("invite");
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

  /*   const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (query.get("is_new") === "true") {
        response = await apiService.authService!.register({
          email: form.email,
          password: form.password,
          active_job_profile: undefined,
        });
      } else {
        response = await apiService.authService!.login({
          email: form.email,
          password: form.password,
          active_job_profile: undefined,
        });
      }

      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      await authContext.refreshDataSource();

      router.push("/home/explore");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${
            error?.response?.data?.message ??
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
  }; */

  const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      response = await apiService.authService!.reqInvite({
        ...form,
        company_name: form.email,
        password: form.password,
        domain: window.location.hostname,
        invite_token: inviteCode,
        plan_id: 2,
      });

      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      await authContext.refreshDataSource();

      router.push("/home/explore");
    } catch (error) {
      if (error instanceof AxiosError) {
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
              <img src={`${appConfig.logo}`} className="w-14 mr-2" />
              <span className=" text-foreground font-black text-2xl mt-0">
                {appConfig.appName}
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-1 px-4 w-full  lg:w-6/12 mx-auto ">
          <span className=" lg:text-5xl text-2xl font-black">
            {" "}
            Create an account
          </span>
        </div>
        {/* 
        <div className=" w-5/12 mx-auto  mt-10 ">
          <Suspense fallback={<span>loading..</span>}>
            <GoogleLoginButton onSuccess={googleLogin} />
          </Suspense>
        </div> */}

        <form
          className="lg:w-4/12 w-full mx-auto mt-4"
          onSubmit={(e: any) => onSubmitLogin(e)}
          method="post"
        >
          <div className="w-full px-8 flex flex-col gap-y-5 items-center">
            {inviteCode && (
              <Tag
                className="rounded-lg gap-x-3 flex justify-between w-auto mt-2"
                color="volcano"
              >
                <span className="text-md font-bold">Invite code: </span>
                <span className="font-bold text-md"> {inviteCode}</span>
              </Tag>
            )}
            <div className="flex flex-col items-start gap-y-2 text-sm w-full">
              <span>Full name</span>
              <InputField
                name="fullname"
                type="text"
                placeHolder="Full name"
                onChange={(e) => onChangeForm("fullname", e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start gap-y-2 text-sm w-full">
              <span>Email address</span>
              <InputField
                name="email"
                type="email"
                placeHolder="Email address"
                onChange={(e) => onChangeForm("email", e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start gap-y-2 text-sm w-full">
              <span>Phone</span>
              <InputField
                name="phone"
                type="phone"
                placeHolder="Phone number"
                onChange={(e) => onChangeForm("phone", e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start gap-y-2 text-sm w-full">
              <span>Password</span>
              <InputField
                name="password"
                type="password"
                placeHolder="Password"
                onChange={(e) => onChangeForm("password", e.target.value)}
              />
            </div>

            <ACButton
              text={
                query.get("is_new") === "true"
                  ? "Sign up with email"
                  : "Create account"
              }
              type={"submit"}
              loading={loading}
              children={undefined}
            />

            <div className="flex items-center justify-center">
              <span>
                <Link href={"/login"}>
                  <span className="text-sm underline">Login in instead</span>
                </Link>
              </span>
            </div>
          </div>
        </form>

        <AuthProblem />
      </section>

      <section className="px-6 flex items-center justify-center ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to {appConfig.appName}'{" "}
          <span className=" text-banner"> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
