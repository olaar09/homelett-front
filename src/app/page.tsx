"use client";

import { Icon } from "@iconify/react";
import GoogleSignIn from "./components/Auth/GoogleSignin";
import InputField from "./components/InputField";
import ACButton from "./components/Button";
import { message } from "antd";
import { useContext, useState } from "react";
import FirebaseContext from "@/contexts/FirebaseContext";
import { FirebaseError } from "firebase/app";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const firebase = useContext(FirebaseContext);
  const onChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmitLogin = async (e: any) => {
    console.log(form);

    e.preventDefault();
    setLoading(true);
    try {
      await firebase!.authService.loginWithPassword(form.email, form.password);
      message.success("Login successful");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            message.error("Invalid login credentials");
            break;

          default:
            //report to bugsnag
            message.error("Authentication error, please contact support");
            break;
        }
      } else {
        console.log(typeof error);
        message.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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

        <form
          className="w-full"
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
              text={"Login with email"}
              type={"submit"}
              loading={loading}
            />
          </div>
        </form>
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
