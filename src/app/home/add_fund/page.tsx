"use client";

import React, { useContext, useEffect, useState } from "react";
import { Alert, Avatar, Button, Card, Input, Spin, Tag, message, Drawer } from "antd";
import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AxiosError } from "axios";
import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import FundAccountDrawer from './components/FundAccountDrawer';
import { PaymentType } from './components/FundAccountDrawer';


const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [isP2P, setIsP2P] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const [isMoneySent, setIsMoneySent] = useState(false);

  const [formData, setFormData] = useState({
    account_number: "",
    amount: null,
  });

  const [amountDrawerOpen, setAmountDrawerOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>(null);

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const router = useRouter();
  const apiUtil = new APIUtil();

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

  const onYesButton = () => {
    if (isMoneySent) {
      onSubmit();
    } else {
      onSetIsMoneySent();
    }
  };

  const onSetIsMoneySent = () => {
    setIsP2P(true);
    setIsMoneySent(true);
  };

  const onSetIsP2P = () => {
    setIsP2P(true);
    setIsMoneySent(false);
  };

  const onChangeMethod = () => {
    setIsP2P(false);
    setIsMoneySent(false);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      await apiUtil.profileService.confirmP2P({
        amount: formData.amount ?? 0,
        bank_account_number: formData.account_number,
      });
      message.success("Deposit successful");
      await authContext.refreshProfile();
      router.replace("/home/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);
        message.error(
          `${error?.response?.data?.message ??
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

  const authLoading = authContext.loading || !authContext.currentUser;

  const handlePaymentOptionClick = (type: PaymentType) => {
    setSelectedPaymentType(type);
    setAmountDrawerOpen(true);
  };

  return (
    <>
      {authLoading && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className=" ">
            {" "}
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-6xl  text-foreground"
            />
          </div>
        </div>
      )}

      {!authContext.loading && authContext.currentUser && (
        <>
          {
            <div className="w-full  py-1 flex items-center justify-between px-2">
              <Link href={"/home/dashboard"}>
                <div className="flex items-center gap-x-2  px-2 py-2">
                  <Icon
                    icon={"octicon:arrow-left-24"}
                    className=" text-xl  text-foreground"
                  />
                  <span className="text-sm"> Fund your account </span>
                </div>
              </Link>
            </div>
          }


          <div className="bg-background-thin min-h-screen py-4">
            <div className="w-full mx-auto mt-0 bg-background-thin">
              <section className=" flex items-center w-full  px-2 mt-0 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                <div className="flex flex-col justify-center items-center  px-3  w-full mt-4 gap-y-3">
                  <Tag
                    color="orange"
                    className="flex items-center justify-center text-center rounded-md"
                  >
                    how would you like to pay?
                  </Tag>
                </div>

                <div className="flex items-center flex-col justify-center w-full gap-y-4">
                  <OptionItem
                    onClick={() => handlePaymentOptionClick('direct_deposit')}
                    icon={"mdi:bank"}
                    title="Direct bank transfer"
                  />
                  <OptionItem
                    onClick={() => handlePaymentOptionClick('paystack')}
                    icon={"ion:card"}
                    title="Paystack payment"
                  />
                </div>
              </section>
            </div>
          </div>
        </>
      )}

      <FundAccountDrawer
        open={amountDrawerOpen}
        onClose={() => {
          setAmountDrawerOpen(false);
          setSelectedPaymentType(null);
        }}
        userEmail={authContext.currentUser?.email ?? ""}
        paymentType={selectedPaymentType}
      />
    </>
  );
};

const OptionItem = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="gradient-border-button px-3 py-2 w-full rounded-lg flex justify-between"
    >
      <div className="flex items-center gap-x-2">
        <Icon className="text-2xl pl-2" icon={icon} />
        <span className="text-center text-xs font-bold ">{title}</span>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="flex items-center">
          <Icon className="text-sm" icon={"uil:bolt"} />
          <span className="text-center text-xs font-bold"> Instant </span>
        </div>

        <Icon className="text-2xl pl-2" icon={"ep:arrow-right"} />
      </div>
    </div>
  );
};

const BankInfo = ({
  bankName,
  accountNumber,
  accountName,
}: {
  bankName: string;
  accountNumber: string;
  accountName: string;
}) => {
  const onCopyText = async (text: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      message.success("Text copied");
    } else {
      document.execCommand("copy", true, text);
      message.success("Text copied");
    }
  };

  return (
    <div className="w-full flex flex-col h-28">
      <div className="gradient-border-button px-3 py-2 w-full rounded-lg flex flex-col justify-start gap-y-3">
        {[
          {
            icon: "i-mdi:bank-outline",
            title: "Bank name",
            value: bankName,
          },
          {
            icon: "i-oui:number",
            title: "Account number",
            value: accountNumber,
          },
          {
            icon: "i-mdi:rename-box",
            title: "Account name",
            value: accountName,
          },
        ].map((info) => {
          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Icon className="text-2xl pl-2" icon={info.icon} />
                <span className="text-center text-xs font-bold ">
                  {info.title}
                </span>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                  <span className="text-center text-xs font-bold">
                    {" "}
                    {info.value}{" "}
                  </span>
                </div>

                <Icon
                  onClick={() => onCopyText(info.value)}
                  className="text-2xl pl-2"
                  icon={"solar:copy-outline"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SavedTeamMembers;
