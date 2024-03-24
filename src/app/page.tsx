"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import GoogleSignIn from "./components/Auth/GoogleSignin";
import InputField from "./components/InputField";
import ACButton from "./components/Button";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center   overflow-y-clip pb-8">
      <div className="fade-container h-1/6">
        <div className="content  text-transparent">
          Your content goes here. This div will have fading edges. Your content
          goes here. This div will have fading edges. Your content goes here.
          This div will have fading edges. Your content goes here. This div will
          have fading edges. Your content goes here. This div will have fading
          edges.
        </div>
      </div>

      <section className="flex-grow my-4 flex flex-col pt-4 items-center w-full">
        <div className="flex items-center gap-x-3   px-8">
          <div className="w-14 h-14">
            <Icon
              className="text-foreground text-6xl"
              icon="simple-icons:poe"
            />
          </div>
          <span className=" text-foreground font-bold text-4xl">
            AfterClass
          </span>
        </div>

        <div className="text-center mt-4  px-4">
          <span className="font-bold text-foreground  text-xl lg:text-md xs:text:md">
            Generate possible exam questions and solve any assignment from your
            lecture notes with AI
          </span>
        </div>

        <div className="mt-12 w-10/12 mx-auto ">
          <GoogleSignIn />
        </div>

        <div className="my-4 gap-x-3 mt-9 flex items-center justify-between w-full px-8">
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1 "></div>
          <span className=" text-foreground-secondary text-sm">Or</span>
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1"></div>
        </div>

        <div className="w-full px-8 flex flex-col gap-y-6">
          <InputField
            type="email"
            placeHolder="Email address"
            onChange={() => {}}
          />
          <InputField
            type="password"
            placeHolder="Password"
            onChange={() => {}}
          />

          <ACButton
            text={"Login with email"}
            type={"button"}
            onClick={() => console.log("Clicked")}
          />
        </div>
      </section>

      <section className="px-6 flex items-center justify-center ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to AfterClass's{" "}
          <span className=" text-banner"> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
