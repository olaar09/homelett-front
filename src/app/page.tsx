"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";
import ACButton from "./components/Button";
import { Button, message } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "./components/Auth/GoogleSignin";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import HomeText from "./components/HomeText";
import TiltHeroSection from "./components/Landing/Hero";
import { useScroll } from "ahooks";
import React, { useRef } from "react";
import Featured from "./components/Landing/Section2";
import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Landing/Hero";
import Section2 from "./components/Landing/Section2";
import Section3 from "./components/Landing/Section3";
import Section4 from "./components/Landing/Section4";
import Section5 from "./components/Landing/Section5";
import Section6 from "./components/Landing/Section6";
import Section7 from "./components/Landing/Section7";
import Footer from "./components/Landing/Footer";

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
    <body className="h-full bg-white font-sans text-gray-900 antialiased">
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          top: "16px",
          left: "16px",
          right: "16px",
          bottom: "16px",
          pointerEvents: "none",
        }}
      ></div>
      <div className="isolate flex min-h-screen flex-col">
        <header className="sticky z-50 bg-white/90 backdrop-blur-lg inset-x-0 top-0 border-b border-gray-100 py-3">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="shrink-0">
                <a
                  className="isomorphic-link isomorphic-link--internal"
                  href="/"
                >
                  <img
                    className="h-8 w-auto"
                    src="images/logo-full.svg"
                    alt=""
                  />
                </a>
              </div>
              {/* <div className="hidden items-center justify-center gap-4 lg:flex">
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/features"
              >
                Features
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/integrations"
              >
                Integrations
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/pricing"
              >
                Pricing
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/demo"
              >
                Live Demo
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/blog"
                className="isomorphic-link isomorphic-link--external text-sm font-semibold leading-5 text-gray-950 transition-all duration-150 rounded-lg px-2 py-1.5 hover:bg-gray-100 hover:text-blue-600"
              >
                Blog
              </a>
            </div> */}
              <div className="flex items-center justify-end gap-4">
                <a
                  href="/book-a-demo"
                  className="inline-flex items-center justify-center bg-blue-600 text-sm font-semibold leading-5 text-white shadow-sm transition-all duration-150 rounded-lg px-3 py-1.5 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Login to your account
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Hero />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section7 />
          <Footer />
        </main>
      </div>
    </body>
  );
}
