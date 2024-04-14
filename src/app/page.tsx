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
import { AuthContext } from "@/contexts/AuthContext";
import HomeText from "./components/HomeText";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const apiService = new APIUtil();
  const query = useSearchParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);

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

      router.push("/home/chat");
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

      router.push("/home/chat");
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
      <section className="flex-grow my-4 flex flex-col pt-4 items-center lg:w-5/12 mx-auto w-full mt-10">
        <div className="flex items-center gap-x-3   px-8">
          <div className="w-9 h-14 flex items-center">
            <Icon
              className="text-gray-60 text-4xl opacity-80"
              icon="simple-icons:poe"
            />
          </div>
          <span className=" text-gray-600 font-bold text-3xl opacity-90">
            SequelBase
          </span>
        </div>

        <div className="text-center mt-4  px-4 mx-auto w-full">
          <HomeText />
          {/*           <span className="font-bold text-foreground  text-5xl lg:text-md xs:text:md">
            Chat with any datasource for{" "}
            <span className=" text-primary"> insights </span>
          </span> */}
        </div>

        <div className="mt-12 w-10/12 mx-auto ">
          <Suspense fallback={<span>loading..</span>}>
            <GoogleLoginButton onSuccess={googleLogin} />
          </Suspense>
        </div>

        <div className="my-4 gap-x-3 mt-9 flex items-center justify-between w-9/12 mx-auto px-8">
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1 "></div>
          <span className=" text-foreground-secondary text-sm">Or</span>
          <div className=" border-b-[0.5px] border-foreground-secondary flex-1"></div>
        </div>

        <form
          className="lg:w-9/12 w-full mx-auto"
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

        <div className="text-center  px-4 mx-auto w-11/12 mt-14">
          <span className="font-bold text-gray-500  text-md lg:text-md xs:text:md">
            Chat with any datasource for records, insights, and charts. Easily
            connect to your apps and tools to create workflows.
          </span>
        </div>
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
