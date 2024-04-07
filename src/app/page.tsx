"use client";

import { Icon } from "@iconify/react";
//import GoogleSignIn from "./components/Auth/GoogleSignin1";
import InputField from "./components/InputField";
import ACButton from "./components/Button";
import { message } from "antd";
import { Suspense, useContext, useState } from "react";
import FirebaseContext from "@/contexts/FirebaseContext";
import { FirebaseError } from "firebase/app";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "./components/Auth/GoogleSignin";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();

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
      router.push("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
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
      router.push("/home");
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
    <main className="flex flex-col h-screen items-center   overflow-y-clip pb-8">
      <div className="fade-container h-1/6">
        {/*  <div className="content  text-transparent">
          Your content goes here. This div will have fading edges. Your content
          goes here. This div will have fading edges. Your content goes here.
          This div will have fading edges. Your content goes here. This div will
          have fading edges. Your content goes here. This div will have fading
          edges.
        </div> */}
      </div>

      <section className="flex-grow my-4 flex flex-col pt-4 items-center lg:w-4/12 mx-auto w-full">
        <div className="flex items-center gap-x-3   px-8">
          <div className="w-14 h-14">
            <Icon
              className="text-primary text-6xl opacity-60"
              icon="simple-icons:poe"
            />
          </div>
          <span className=" text-primary font-bold text-4xl">SequelBase</span>
        </div>

        <div className="text-center mt-4  px-4 mx-auto w-11/12">
          <span className="font-bold text-foreground  text-xl lg:text-md xs:text:md">
            AI Co-Pilot for engineering and business teams to get things done
            faster!
          </span>
        </div>

        <div className="mt-12 w-10/12 mx-auto ">
          <Suspense fallback={<span>loading..</span>}>
            <GoogleLoginButton onSuccess={googleLogin} />
          </Suspense>
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
      </section>

      <section className="px-6 flex items-center justify-center ">
        <span className=" text-foreground-secondary text-sm text-center">
          By continuing, you are agreeing to SequelBase's{" "}
          <span className=" text-banner"> terms of services </span> and{" "}
          <span className=" text-banner">Privacy Policy </span>
        </span>
      </section>
    </main>
  );
}
