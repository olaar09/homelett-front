"use client";

import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Spin,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ACButton from "../../components/Button";
import Link from "next/link";
import Head from "next/head";
import { useRequest } from "ahooks";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CompleteInvite() {
  const [loading, setLoading] = useState(true);
  const [submittingInvite, setSubmittingInvite] = useState(false);

  const apiUtil = new APIUtil();

  const [appError, setAppError] = useState<any>();
  const [password, setPassword] = useState(undefined);
  const params = useParams();
  const route = useRouter();

  const {
    data: inviteData,
    error,
    loading: loadingInvite,
    refresh: refreshTeam,
  } = useRequest(() => getInvite());

  console.log(inviteData);

  const getInvite = async (): Promise<any> => {
    try {
      const invite = await apiUtil.profileService.getInvite(
        `${params?.invite_token}`
      );
      return invite.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);
        setAppError(
          error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to complete request"
        );
        message.error(
          `${error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to complete request"
          }`
        );
      } else {
        setAppError("Unable to complete request");
        message.error("Unable to complete request");
      }
    }
  };

  const onSubmitInvite = async () => {
    setSubmittingInvite(true);
    try {
      const response = await apiUtil.profileService.submitInvite({
        password: password,
        invite_token: params?.invite_token,
      });

      setSubmittingInvite(false);
      message.success("Login success");
      localStorage.setItem("token", response.data.token!);
      route.push("/home/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);

        setAppError(
          error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to complete request"
        );

        message.error(
          `${error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to complete request"
          }`
        );
      } else {
        setAppError("Unable to complete request");
        message.error("Unable to complete request");
      }
    } finally {
      setSubmittingInvite(false);
    }
  };

  const onSubmitLogin = async () => {
    if (!password) {
      message.error("Enter a valid password");
    } else {
      await onSubmitInvite();
    }
  };

  const onInputData = (type: any, text: any) => {
    setPassword(text);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Bubble | Complete invite</title>
        <meta name="description" content="Bubble" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

        <link rel="icon" href="/database_logo_smaller.png" />
        <link rel="canonical" href="https://app.Bubble/connect" />
      </Head>
      <div className="bg-white">
        <main className="h-screen bg-white  mx-auto  w-full flex ">
          {!inviteData && loadingInvite && (
            <div className="flex items-center justify-center h-full w-6/12">
              {" "}
              <Spin spinning={loadingInvite} />
            </div>
          )}
          {!inviteData && appError && !loadingInvite && (
            <div className="flex flex-col items-center justify-center h-full w-6/12">
              <div className="flex items-center justify-center flex-col w-7/12">
                {" "}
                <span className="text-sm block text-center my-5">
                  {appError}
                </span>
                <ACButton
                  onClick={getInvite}
                  text={"Try again"}
                  type={"button"}
                  loading={false}
                  children={undefined}
                />
              </div>
            </div>
          )}
          {inviteData && (
            <div className="flex flex-col gap-y-4 w-6/12 items-center h-full justify-start py-10">
              <div className="w-10/12 mx-auto h-full">
                <div>
                  <div className="flex items-center my-4">
                    <img
                      alt="logo"
                      className="w-8"
                      src="/database_black.png"
                      width={100}
                      height={20}
                    />
                    <h1
                      style={{ fontFamily: "mainFontBold" }}
                      className="text-gray-800 text-lg ml-1 font-black"
                    >
                      {" "}
                      Bubble
                    </h1>
                  </div>
                  <span className="text-gray-600 text-sm">
                    Need to create a new organization?{" "}
                    <span className="text-blue-600">
                      <Link href={"/"}>Signup</Link>{" "}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col h-full justify-start mt-10">
                  <div className="my-0"></div>
                  <h1
                    style={{ fontFamily: "mainFontBold" }}
                    className="font-black text-2xl my-3"
                  >
                    Complete invite to join ({inviteData?.company_name})
                  </h1>

                  <div className="my-2">
                    <span className="text-xs">Email address</span>
                    <Input
                      name={"email_add"}
                      readOnly={true}
                      disabled={true}
                      value={inviteData?.email}
                      onChange={(val) => onInputData("email", val.target.value)}
                      placeholder="email@example.com"
                      className={`h-10 text-gray-800 font-bold bg-white border-gray-200 border my-3`}
                    />
                  </div>

                  <div className="my-2">
                    <span className="text-xs">Full name</span>
                    <Input
                      name={"fullname"}
                      readOnly={true}
                      disabled={true}
                      value={inviteData?.fullname}
                      onChange={(val) =>
                        onInputData("fullname", val.target.value)
                      }
                      placeholder="John fred"
                      className={`h-10 text-gray-800 font-bold bg-white border-gray-200 border my-3`}
                    />
                  </div>

                  <div className="my-2">
                    <span className="text-xs">Role description</span>
                    <Input
                      name={"role"}
                      readOnly={true}
                      disabled={true}
                      value={inviteData?.role}
                      onChange={(val) => onInputData("role", val.target.value)}
                      placeholder="Engineering"
                      className={`h-10 text-gray-800 font-bold bg-white border-gray-200 border my-3`}
                    />
                  </div>

                  <div className="my-2">
                    <span className="text-xs">Create password</span>
                    <Input
                      name={"password"}
                      type="password"
                      onChange={(val) =>
                        onInputData("password", val.target.value)
                      }
                      placeholder="********"
                      className={`h-10 text-gray-800 font-bold bg-white border-gray-200 border my-3`}
                    />
                  </div>

                  <div className="w-full flex mt-4">
                    <ACButton
                      onClick={onSubmitLogin}
                      loading={submittingInvite}
                      text={`Join ${inviteData?.company_name} on Bubble`}
                      type={"button"}
                      children={undefined}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="h-full bg-gray-100 w-6/12 flex flex-col items-center justify-center">
            <Icon
              className="text-gray-700 text-6xl opacity-90 mt-1"
              icon={"simple-icons:poe"}
            />
            <div className="px-20 text-center my-6">
              <span className="">
                Chat with any datasource for records, insights, and charts.
                Easily connect chats to your apps and tools to create workflows.
                <span className="font-bold"></span>
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
