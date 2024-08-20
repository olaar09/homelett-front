"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Input, Select, Spin, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AxiosError } from "axios";
import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import { IBank } from "@/app/interfaces/IProduct";
import { useRequest } from "ahooks";
import UtilService from "@/services/UtilService";

const { Option } = Select

const AddFundWithdraw = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [isRequestSent, setIsRequestSent] = useState(false);

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const router = useRouter();
  const apiUtil = new APIUtil();

  const onSubmit = async () => {
    try {
      setLoading(true);

      await apiUtil.profileService.cashout({
        amount: formData.amount
      });
      message.success("Request successful. You will be credited within 2 hours");
      await authContext.refreshProfile();
      setIsRequestSent(true)
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
  const bankInfo = authContext.currentUser?.p2p.bank_info;

  const onChangeBank = (value: string) => {
    const bank = (bankList ?? []).find((ls: IBank) => ls.name === value);
    onSetFormData("bank_name", bank.code);
  };


  const [formData, setFormData] = useState({
    amount: "",

  });


  const {
    data: bankList,
    error,
    loading: loadingBanks,
    refresh: refreshBanks,
  } = useRequest(() => getBanks(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  const getBanks = async (): Promise<any> => {
    try {
      const data = await apiUtil.transactionService.fetchBanks();
      return data;
    } catch (error) {
      message.error("unable to load banks");
    }
  };


  const isPendingNuban = authContext.currentUser?.nuban && authContext.currentUser?.nuban.status == 'pending' || isRequestSent
  const nuban = authContext.currentUser?.nuban

  const utilService = new UtilService()

  const balance = utilService.formatMoney(
    `${(authContext.currentUser?.finance?.balance ?? 0)}`,
    "en-NG",
    "NGN"
  )

  const usdRate = authContext.currentUser?.configs?.find((cg) => cg.korn_key == 'usd_rate')
  const rate = usdRate ? usdRate.value : 0;

  const usdBalance = Number(authContext.currentUser?.finance?.balance ?? 0) / Number(rate)


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
                  <span className="text-sm">  Withdraw money </span>
                </div>
              </Link>
            </div>
          }

          <div className="bg-background-thin min-h-screen py-4">
            <div className="w-full mx-auto mt-0 bg-background-thin">
              <section className=" flex items-center w-full  px-2 mt-0 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                <div className="flex items-center flex-col justify-center w-full gap-y-4">



                  <div className="justify-center items-center flex flex-col">
                    <p className="text-gray-500 text-sm">Your Balance</p>
                    <h2 className="text-4xl font-bold mt-4">{utilService.formatMoney(`${usdBalance}`)}</h2>
                    <span className='mt-2 block text-primary text-xs'>Balance in Naira: {balance}</span>
                  </div>
                  <div className="flex items-center flex-col w-full px-3 gap-y-3 mt-4">

                    {/*     <div className="px-4">
                      <div className="text-xs text-center text-foreground-secondary">
                        Enter the Naira amount you wish to withdraw
                      </div>
                    </div> */}

                    <div className="w-full mb-2">
                      <span className="text-xs block mb-3 text-foreground-secondary">Amount to withdraw in Naira</span>
                      <div className="flex items-center gap-x-3">
                        <InputField
                          placeHolder={`Enter withdrawal amount`}
                          type={"number"}
                          name={"amount"}
                          isLight
                          value={formData.amount}
                          required
                          onChange={(val) =>
                            onSetFormData("amount", val.target.value)
                          }
                        />

                      </div>

                    </div>

                    <div className="flex w-full mt-4 items-center justify-center">
                      <div
                        onClick={onSubmit}
                        className="flex items-center gap-x-2 flex-1  justify-center px-0"
                      >
                        <ACButton text={""} type={"button"} loading={loading}>
                          <Icon
                            className="text-sm text-foreground-inverted"
                            icon={"uil:bolt"}
                          />
                          <span className="text-foreground-inverted text-xs">
                            {`Withdraw your money`}
                          </span>
                        </ACButton>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </div>
          </div>

          {nuban?.bank_account_name && !isPendingNuban &&
            <div className="bg-background-thin min-h-screen pt-20 py-4 px-3 flex gap-y-3 flex-col">
              <div className="flex justify-center items-center  px-3  w-full mt-4">
                <Tag
                  color="orange"
                  className="  flex items-center  justify-center text-center rounded-md"
                >
                  <span>
                    Your money will be credited to this account
                  </span>
                </Tag>
              </div>


              <BankInfo
                bankName={nuban?.bank_name ?? ""}
                accountNumber={nuban?.bank_account_number ?? ""}
                accountName={nuban?.bank_account_name ?? ""}
              />
            </div>
          }
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
export default AddFundWithdraw;
