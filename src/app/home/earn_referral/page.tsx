"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  FloatButton,
  Spin,
  Statistic,
  Tag,
  message,
} from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Str } from "@/utils/consts";
import Brands from "@/app/components/Brands";
import ACButton from "@/app/components/Button";

import { PlusCircleOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { ICredential } from "@/app/interfaces/IRegisterRequest";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import Chip from "@/app/components/Chip";
import InfoDrawer from "./InfoDrawer";

const EarnReferralPage = () => {
  const authContext = useContext(AuthContext);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<
    ICredential | null | undefined
  >(null);
  const apiUtils = new APIUtil();
  const router = useRouter();

  const onCopyText = async (text: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      message.success("Text copied");
    } else {
      document.execCommand("copy", true, text);
      message.success("Text copied");
    }
  };

  const {
    data: credentialList,
    error: credentialListError,
    loading: loadingCredentialList,
    refresh: refreshCredentials,
  } = useRequest(() => getSharedCredentials());

  const getSharedCredentials = async (): Promise<any> => {
    try {
      const data = await apiUtils.productService.fetchShareCredentials();
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
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
    }
  };

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

  const onOpenHowItWorks = () => {
    setOpenInfoModal(true);
  };

  const onCloseHowItWorks = () => {
    setOpenInfoModal(false);
  };

  const utils = new UtilService();
  const finance = authContext.currentUser?.finance;
  const user = authContext.currentUser;
  return (
    <>
      <InfoDrawer open={openInfoModal} onClose={onCloseHowItWorks} />

      {authContext.currentUser && authContext.currentUser?.bank_info && (
        <Link href={"/home/profile"}>
          <div className="bg-red-400 h-10 gap-x-2 flex items-center justify-center">
            <Icon icon={"mdi:bank"} className="text-white" />
            <span className="text-white text-sm">
              Click here to add your bank details
            </span>
          </div>
        </Link>
      )}

      <div className="px-2 flex flex-col gap-x-2 gap-y-1 items-start justify-center mt-4 w-full">
        <div className="flex items-center justify-between w-full">
          <span className=" text-foreground-secondary text-xs">
            Referral link
          </span>

          <Chip
            title="Copy"
            action={() => onCopyText(`${user?.invite_link}`)}
            loading={false}
            isSelected={false}
            icon={"akar-icons:copy"}
            type={"default"}
          />
        </div>

        <Tag className="w-full rounded-lg py-2">{user?.invite_link}</Tag>
      </div>

      <div className="px-2 flex gap-x-2 items-center justify-center mt-4">
        <div
          onClick={onOpenHowItWorks}
          className="bg-gray-100 h-10 gap-x-2 flex items-center justify-center rounded-2xl mt-0 border flex-1 "
        >
          <Icon icon={"ic:twotone-info"} className="text-foreground" />
          <span className=" text-foreground text-sm">{"How it works"}</span>
        </div>
      </div>

      {(authContext.loading || loadingCredentialList) && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className="">
            {" "}
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-6xl text-foreground"
            />
          </div>
        </div>
      )}

      <div className="w-full mx-auto h-screen  bg-background-thin ">
        <div className="flex flex-wrap gap-y-4 py-8 ">
          {[
            {
              label: "Referral Code",
              value: authContext.currentUser?.invite_token,
              icon: null,
              color: "#3f8600",
            },
            {
              label: "Total earned",
              value: utils.formatMoney(
                `${finance?.totalReferralEarning}`,
                "en-NG",
                "NGN"
              ),
              icon: null,
              color: "#000",
            },
            {
              label: "Total invites",
              value: user?.total_invites,
              icon: <ArrowUpOutlined />,
              color: "orange",
            },
            {
              label: "Activated invites",
              value: user?.total_active_invites,
              icon: <ArrowUpOutlined />,
              color: "magenta",
            },
          ].map((info) => (
            <div className="w-6/12">
              <div className="px-3">
                <Card className=" h-44 flex flex-col " bordered={false}>
                  <Statistic
                    title={info.label}
                    value={`${info.value}`.toUpperCase()}
                    className="h-20 "
                    precision={2}
                    valueStyle={{ color: info.color, marginTop: 30 }}
                    prefix={info.icon}
                  />
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EarnReferralPage;
