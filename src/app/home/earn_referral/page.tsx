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

const EarnReferralPage = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<
    ICredential | null | undefined
  >(null);
  const apiUtils = new APIUtil();
  const router = useRouter();

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

  const onOpenShareSubscription = () => {
    setOpenAddModal(true);
  };

  const onCloseShareSubscription = () => {
    setOpenAddModal(false);
    setSelectedCredential(null);
  };
  const utils = new UtilService();
  const finance = authContext.currentUser?.finance;
  return (
    <>
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

      <div className="px-2 flex gap-x-2 items-center justify-center mt-4">
        <ButtonItem title="How it works" icon="ic:twotone-info" />
        <ButtonItem title="Copy referral link" icon="rivet-icons:link" />
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
            "Referral Code",
            "Total earned",
            "Total invites",
            "Activated invites",
          ].map((title) => (
            <div className="w-6/12">
              <div className="px-3">
                <Card className=" h-44 flex flex-col " bordered={false}>
                  <Statistic
                    title={title}
                    value={11.28}
                    className="h-20 "
                    precision={2}
                    valueStyle={{ color: "#3f8600", marginTop: 30 }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
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

const ButtonItem = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="bg-gray-100 h-10 gap-x-2 flex items-center justify-center rounded-2xl mt-0 border flex-1 ">
      <Icon icon={icon} className="text-foreground" />
      <span className=" text-foreground text-sm">{title}</span>
    </div>
  );
};
