"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";
import InputField from "./components/InputField";
import ACButton from "./components/Button";
import { Button, message } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import FirebaseContext from "@/contexts/FirebaseContext";
import { FirebaseError } from "firebase/app";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "./components/Auth/GoogleSignin";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import HomeText from "./components/HomeText";
import TiltHeroSection from "./components/Landing/Tilt";
import { useScroll } from "ahooks";
import React, { useRef } from "react";
import Featured from "./components/Landing/Featured";
import Image from "next/image";
import Link from "next/link";

const items = [
  { name: "AI Powered search to find jobs that fits" },
  { name: "Automatically tailor your profile to each job" },
  { name: "Auto send Job application or send applications with 1 click" },
  { name: "Automatic follow up when you don't hear back" },
];
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
      } else  */ if (scrollTop > 275) {
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
      className="flex flex-col min-h-screen overflow-y-scroll items-center gap-y-4   pb-8 mx-auto w-11/12"
    >
      <section className="w-full">
        <div className=" flex items-center gap-x-3   px-20   justify-between w-full mt-2">
          <div className="flex items-center gap-x-0 w-6/12">
            <div className="w-5 h-12 flex items-center">
              <Icon
                className="text-foreground text-xl "
                icon="streamline:send-email-solid"
              />
            </div>
            <span className=" text-foreground font-bold text-2xl opacity-95 mb-1">
              applygeni.us
            </span>
          </div>

          <div className="flex items-center gap-x-3 w-6/12 justify-end">
            <Link href={"/login"}>
              <Button
                className="lg:inline hidden "
                type={"link"}
                loading={false}
              >
                <span className="text-lg text-foreground"> Login </span>
              </Button>
            </Link>

            <Link href={"/login"}>
              <Button type={"link"} loading={false}>
                <span className="text-lg text-foreground"> Get started </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className=" mt-4 flex justify-start items-center pt-20  w-full  px-20 ">
        <div className="text-start  w-full  lg:w-6/12  flex flex-col gap-y-10 ">
          <span className=" bg-gray-200  rounded-lg py-1 px-2 text-md font-bold w-64">
            Your AI Copilot for job search
          </span>

          <span className="text-5xl font-black w-11/12  leading-tight">
            Gain an unparalleled advantage in your job search applygenius.
          </span>

          <span className="text-foreground w-10/12 ">
            Find jobs faster and quickly generate persuasive cover letters with
            ApplyGenius. Try it today with a free 7-day trial account.
          </span>

          <div className="flex gap-x-8 mt-0">
            <div className="w-4/12">
              <ACButton
                text={"Get access"}
                type={"reset"}
                loading={false}
                children={undefined}
              />
            </div>

            <div className="flex items-center text-foreground-secondary">
              <Icon icon={"ic:sharp-info"} />
              <span className=" text-foreground-secondary">
                No credit card required
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <img className="w-60" src="/social.png" />
            <span className=" text-foreground-secondary">
              trusted by 1k+ and counting
            </span>
          </div>
        </div>

        <div className="w-full  hidden lg:w-5/12 mx-auto lg:flex flex-col items-center  right-0  rounded-tl-lg rounded-bl-lg h-full  ">
          <div className="relative">
            <div className="h-full bg-black rounded-xl    opacity-5 absolute left-0 right-0 bottom-0 top-0"></div>
            <img className="rounded-tl-lg rounded-bl-lg" src="/home_2.gif" />
          </div>
        </div>
      </section>

      <div className=" w-full  mt-20 px-4 pt-4 pb-10 ">
        <div className="h-20 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground text-center">
            400,000+ jobs from only the most exciting companies & startups
            around the world
          </span>
        </div>
        <Featured />
      </div>

      <section className="flex flex-col items-center justify-center my-8 lg:my-20 mx-auto w-full lg:w-9/12 gap-y-6 px-3">
        <span className=" font-bold lg:text-6xl text-5xl text-center">
          The better way to job search
        </span>{" "}
        <span className="text-center block lg:w-8/12 mx-auto">
          We're not just another job board. We implement the latest AI
          technologies to automate job search and application. Giving our users
          an edge
        </span>
        <div className="mx-auto w-full lg:w-7/12">
          {items.map((item) => (
            <div className="mt-4 flex items-center justify-between  gap-x-2 w-full">
              <Icon className="text-2xl" icon={"akar-icons:check-box-fill"} />
              <div className="w-10/12 flex justify-start">
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8">
        <Link href={"/login"}>
          <ACButton
            text={"Click here to get started"}
            type={"reset"}
            loading={false}
            children={undefined}
          />
        </Link>
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
