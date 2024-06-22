"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Input, Spin, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddTeamModal from "./components/AddTeamModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Str } from "@/utils/consts";
import UpdateBankDrawer from "./components/UpdateBankDrawer";
import { IBank } from "@/app/interfaces/IProduct";
import { AxiosError } from "axios";
import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [isP2P, setIsP2P] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isMoneySent, setIsMoneySent] = useState(false);

  const [formData, setFormData] = useState({
    account_number: "",
    amount: null,
  });

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
      router.replace("/home/explore");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);
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

  const authLoading = authContext.loading || !authContext.currentUser;
  const bankInfo = authContext.currentUser?.p2p.bank_info;

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
              <Link href={"/home/explore"}>
                <div className="flex items-center gap-x-2  px-2 py-2">
                  <Icon
                    icon={"octicon:arrow-left-24"}
                    className=" text-xl  text-foreground"
                  />
                  <span className="text-sm"> Fund your account </span>
                </div>
              </Link>

              {isP2P && (
                <div
                  onClick={onChangeMethod}
                  className="flex items-center gap-x-2 "
                >
                  <Icon className="text-sm" icon={"uil:bolt"} />

                  <span className="text-foreground-secondary text-xs">
                    Change method
                  </span>
                </div>
              )}
            </div>
          }

          {isP2P && (
            <div className="bg-background-thin min-h-screen py-4">
              <div className="w-full mx-auto mt-0 bg-background-thin">
                <section className=" flex items-center w-full  px-2 mt-0 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                  <div className="flex justify-center items-center  px-3  w-full mt-4">
                    <Tag
                      color="orange"
                      className="  flex items-center  justify-center text-center rounded-md"
                    >
                      <span>
                        {" "}
                        {`${
                          isMoneySent
                            ? "Confirm your payment instantly"
                            : "Send deposit amount to the details below"
                        }`}
                      </span>
                    </Tag>
                  </div>

                  <div className="flex items-center flex-col justify-center w-full gap-y-4">
                    {!isMoneySent && (
                      <BankInfo
                        bankName={bankInfo?.bank_name ?? ""}
                        accountNumber={bankInfo?.bank_account_number ?? ""}
                        accountName={bankInfo?.bank_account_name ?? ""}
                      />
                    )}

                    {isMoneySent && (
                      <div className="flex items-center flex-col w-full px-3 gap-y-3">
                        <div className="w-full">
                          <span className="text-xs">Sender account number</span>
                          <InputField
                            placeHolder={`Enter sender account number`}
                            type={""}
                            name={"account_number"}
                            value={formData.account_number}
                            required
                            onChange={(val) =>
                              onSetFormData("account_number", val.target.value)
                            }
                          />
                        </div>

                        <div className="w-full">
                          <span className="text-xs">
                            Sent amount (Enter exactly the sent amount)
                          </span>
                          <InputField
                            placeHolder={`Enter amount`}
                            type={""}
                            name={"account_number"}
                            value={formData.amount}
                            required
                            onChange={(val) =>
                              onSetFormData("amount", val.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex w-full mt-4 items-center justify-center">
                      <div
                        onClick={onYesButton}
                        className="flex items-center gap-x-2 flex-1  justify-center px-3"
                      >
                        <ACButton text={""} type={"button"} loading={loading}>
                          <Icon
                            className="text-sm text-foreground-inverted"
                            icon={"uil:bolt"}
                          />
                          <span className="text-foreground-inverted text-xs">
                            {`${
                              isMoneySent
                                ? " Confirm payment"
                                : "I have sent the money"
                            }`}
                          </span>
                        </ACButton>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {!isP2P && (
            <div className="bg-background-thin min-h-screen py-4">
              <div className="w-full mx-auto mt-0 bg-background-thin">
                <section className=" flex items-center w-full  px-2 mt-0 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                  <div className="flex justify-center items-center  px-3  w-full mt-4">
                    <Tag
                      color="orange"
                      className="  flex items-center  justify-center text-center rounded-md"
                    >
                      how would you like to pay?
                    </Tag>
                  </div>

                  <div className="flex items-center flex-col justify-center w-full gap-y-4">
                    <OptionItem
                      onClick={() => onSetIsP2P()}
                      icon={"mdi:bank"}
                      title="P2p bank transfer"
                    />
                    <Link
                      href={authContext.currentUser.paymentLink!}
                      className="w-full"
                    >
                      <OptionItem icon={"ion:card"} title="Paystack payment" />
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}
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

                <Icon className="text-2xl pl-2" icon={"solar:copy-outline"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SavedTeamMembers;
