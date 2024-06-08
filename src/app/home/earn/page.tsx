"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, FloatButton, Spin, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Str } from "@/utils/consts";
import Brands from "@/app/components/Brands";
import ACButton from "@/app/components/Button";
import StartEarning from "./components/StartEarning";
import AddCredentialDrawer from "./components/AddCredentialDrawer";
import TransactionItem from "../_components/TransactionItem";
import Credentialtem from "./components/Credentialtem";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

const EarnPage = () => {
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
      {authContext.currentUser && !authContext.currentUser?.bank_info && (
        <Link href={"/home/profile"}>
          <div className="bg-red-400 h-10 gap-x-2 flex items-center justify-center">
            <Icon icon={"mdi:bank"} className="text-white" />
            <span className="text-white text-sm">
              Click here to add your bank details
            </span>
          </div>
        </Link>
      )}

      {authContext.currentUser?.bank_info && (
        <div className="flex h-10 gap-x-8 w-full items-center justify-end px-3">
          <div className="flex items-center text-xs gap-x-1 ">
            <Tag className="rounded-lg text-xs flex items-center gap-x-1">
              <Icon
                icon={"majesticons:money-plus"}
                className="text-foreground"
              />
              <span>Total</span>
            </Tag>

            <span className="text-foreground">
              {" "}
              {utils.formatMoney(
                `${(finance?.totalPayouts ?? 0) * 100}`,
                "en-NG",
                "NGN"
              )}
            </span>
          </div>

          <div className="flex items-center text-xs gap-x-1 ">
            <Tag
              color="green"
              className="rounded-lg text-xs flex items-center gap-x-1"
            >
              <Icon icon={"mdi:bank"} className="text-foreground" />
              <span>Pending</span>
            </Tag>

            <span className="text-foreground">
              {" "}
              {utils.formatMoney(
                `${(finance?.pendingPayouts ?? 0) * 100}`,
                "en-NG",
                "NGN"
              )}
            </span>
          </div>
        </div>
      )}

      <AddCredentialDrawer
        open={openAddModal || selectedCredential != null}
        selectedCredential={selectedCredential}
        onClose={onCloseShareSubscription}
        refreshCredentials={refreshCredentials}
      />

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

      {!authContext.loading &&
        authContext.currentUser &&
        !loadingCredentialList &&
        (!credentialList || credentialList.length < 1) && (
          <StartEarning
            isEarner={authContext.currentUser.is_earner == 1}
            onClick={onOpenShareSubscription}
          />
        )}

      {!authContext.loading &&
        authContext.currentUser &&
        credentialList &&
        credentialList.length > 0 && (
          <div className="w-full mx-auto h-screen  bg-background-thin  ">
            <FloatButton
              onClick={onOpenShareSubscription}
              icon={<PlusCircleOutlined />}
              tooltip="Share new login"
              type="primary"
              style={{ right: 24, bottom: 100 }}
            />

            <section className=" flex items-center w-full max-h-screen pb-40  lg:px-8 px-2 mt-10 flex-wrap gap-y-4 overflow-y-scroll">
              {credentialList.map((credential: any) => {
                return (
                  <div className="lg:w-4/12 w-full">
                    <Credentialtem
                      applying={false}
                      onSelectCredential={(credential: ICredential) => {
                        setSelectedCredential(credential);
                      }}
                      onApplyJob={undefined}
                      active={false}
                      credential={{ ...credential }}
                    />
                  </div>
                );
              })}
            </section>
          </div>
        )}
    </>
  );
};

export default EarnPage;
