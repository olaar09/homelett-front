"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";

import { message } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import FirebaseContext from "@/contexts/FirebaseContext";
import { FirebaseError } from "firebase/app";
import { useRouter, useSearchParams } from "next/navigation";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

import { useScroll } from "ahooks";
import React, { useRef } from "react";
import GoogleLoginButton from "../components/Auth/GoogleSignin";
import ACButton from "../components/Button";
import HomeText from "../components/HomeText";
import InputField from "../components/InputField";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
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
        });
      } else {
        response = await apiService.authService!.login({
          email: form.email,
          password: form.password,
        });
      }

      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      await authContext.refreshDataSource();

      router.push("/home/apply");
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
  };

  const googleLogin = async (IdToken: string) => {
    setLoading(true);

    try {
      const response = await apiService.authService!.googleSignIn(IdToken);
      localStorage.setItem("token", response.data.token!);
      message.success("Login successful");
      await authContext.refreshProfile();
      await authContext.refreshDataSource();

      router.push("/home/apply");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      } else {
        if (error instanceof AxiosError) {
          console.log(error);

          message.error(
            `${error?.response?.data?.message ?? "Unable to complete request"}`
          );
        } else {
          message.error("Unable to complete request");
        }
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
          <div className="w-9 h-14 flex items-center">
            <Icon
              className="text-gray-60 text-4xl opacity-80"
              icon="streamline:send-email-solid"
            />
          </div>
          <Link href={"/"}>
            <span className=" text-gray-600 font-bold text-3xl opacity-90">
              PostBird
            </span>
          </Link>
        </div>

        <div className="text-center mt-10 px-4 w-full  lg:w-6/12 mx-auto ">
          <span className=" lg:text-5xl text-3xl font-black">
            {" "}
            Login to your account
          </span>
        </div>

        <div className=" w-5/12 mx-auto  mt-10 ">
          <Suspense fallback={<span>loading..</span>}>
            <GoogleLoginButton onSuccess={googleLogin} />
          </Suspense>
        </div>

        <div className="my-4 gap-x-3 mt-9 flex items-center justify-between w-5/12 mx-auto px-8">
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1 "></div>
          <span className=" text-foreground-secondary text-sm">Or</span>
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1"></div>
        </div>

        <form
          className="lg:w-4/12 w-full mx-auto"
          onSubmit={(e: any) => onSubmitLogin(e)}
          method="post"
        >
          <div className="w-full px-8 flex flex-col gap-y-6">
            <InputField
              name="email"
              type="email"
              placeHolder="Email address"
              onChange={(e) => onChangeForm("email", e.target.value)}
            />
            <InputField
              name="password"
              type="password"
              required={true}
              placeHolder="Password"
              onChange={(e) => onChangeForm("password", e.target.value)}
            />

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
          </div>
        </form>

        <div className="text-center  px-4 mx-auto w-full lg:w-5/12 mt-14">
          <span className="font-bold text-gray-500  text-md lg:text-md xs:text:md">
            Auto apply to 400,000+ jobs with AI, from only the most exciting
            companies around the world
          </span>
        </div>
      </section>

      <section className="px-6 flex items-center justify-center ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to PostBird's{" "}
          <span className=" text-banner"> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
