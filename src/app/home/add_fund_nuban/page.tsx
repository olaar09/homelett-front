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

const { Option } = Select

const SavedTeamMembers = () => {
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

      await apiUtil.profileService.verifyBVNInfo({
        first_name: formData.first_name,
        last_name: formData.last_name,
        bvn: formData.bvn_number,
        bank_code: formData.bank_name
      });
      message.success("Request successful");
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
    bank_name: "",
    account_number: "",
    first_name: "",
    last_name: "",
    bvn_number: ""
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
  const bankName = (bankList ?? []).find(
    (ls: IBank) => ls.code === formData.bank_name
  )?.name;

  const isPendingNuban = authContext.currentUser?.nuban && authContext.currentUser?.nuban.status == 'pending' || isRequestSent
  const nuban = authContext.currentUser?.nuban

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
                  <span className="text-sm"> Your account number </span>
                </div>
              </Link>
            </div>
          }



          <div className="bg-background-thin min-h-screen py-4">
            <div className="w-full mx-auto mt-0 bg-background-thin">
              <section className=" flex items-center w-full  px-2 mt-0 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                <div className="flex items-center flex-col justify-center w-full gap-y-4">

                  {isPendingNuban &&
                    <div className="flex items-center justify-center mt-10">
                      <span className="text-center block text-sm">We are verifying your details to generate a   Nuban <br /> account  number.  Please check back in a few hours... </span>
                    </div>
                  }

                  {!nuban?.bank_account_name && !isPendingNuban && (
                    <div className="flex items-center flex-col w-full px-3 gap-y-3 mt-10">

                      <div className="px-4">
                        <div className="text-xs text-center text-foreground-secondary">
                          You do not have an account number yet, verify your details to generate account number
                        </div>
                      </div>

                      <div className="w-full mt-4">
                        <span className="text-xs">Your BVN number</span>
                        <InputField
                          placeHolder={`Enter BVN attached to the account`}
                          type={""}
                          name={"bvn_number"}
                          value={formData.bvn_number}
                          required
                          onChange={(val) =>
                            onSetFormData("bvn_number", val.target.value)
                          }
                        />
                      </div>


                      <div className="w-full">
                        <span className="text-xs">Your account number</span>
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


                      <div className="flex flex-col gap-y-2  w-full ">
                        <span className="text-xs">Bank name</span>
                        <Select
                          showSearch
                          placeholder="Select bank"
                          className="w-full h-9"
                          value={bankName}
                          onChange={(val) => onChangeBank(val)}
                        >
                          {(bankList ?? []).map((col: IBank) => (
                            <Option key={col.name} value={col.name}>
                              <div className="flex items-center gap-x-2">
                                <span>{col.name} </span>
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>


                      <div className="w-full mb-2">
                        <span className="text-xs">First name & Last name</span>
                        <div className="flex items-center gap-x-3">
                          <InputField
                            placeHolder={`Enter first name`}
                            type={""}
                            name={"first_name"}
                            value={formData.first_name}
                            required
                            onChange={(val) =>
                              onSetFormData("first_name", val.target.value)
                            }
                          />
                          <InputField
                            placeHolder={`Enter last name`}
                            type={""}
                            name={"last_name"}
                            value={formData.last_name}
                            required
                            onChange={(val) =>
                              onSetFormData("last_name", val.target.value)
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
                              {`Generate Account number`}
                            </span>
                          </ACButton>
                        </div>
                      </div>
                    </div>
                  )}


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
                    Funds sent through this account will be credited to you
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
export default SavedTeamMembers;
