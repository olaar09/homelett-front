"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddTeamModal from "./components/AddTeamModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Str } from "@/utils/consts";
import UpdateBankDrawer from "./components/UpdateBankDrawer";
import { IBank } from "@/app/interfaces/IProduct";
import { Modal } from "antd";

const SavedTeamMembers = () => {
  const authContext = useAuth();
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const apiUtils = new APIUtil();
  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

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
      const data = await apiUtils.transactionService.fetchBanks();
      return data;
    } catch (error) {
      // message.error("unable to load banks");
    }
  };

  const onUpdateBank = () => {
    setOpenBankModal(true);
  };

  const onCloseBank = () => {
    setOpenBankModal(false);
  };

  const bankName = (bankList ?? []).find(
    (ls: IBank) => ls.code === authContext.currentUser?.bank_info?.bank_name
  )?.name;

  const loading = authContext.loading || loadingBanks;
  return (
    <>
      <UpdateBankDrawer
        bankList={bankList}
        open={openBankModal}
        onClose={onCloseBank}
      />

      {loading && (
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
        <Spin
          indicator={
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-8xl   w-32 text-foreground"
            />
          }
          spinning={loading}
          className="bg-background-thin w-full"
        >
          <div className="bg-background-thin min-h-screen">
            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  px-2 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                <div className="lg:w-full w-full items-center mx-auto ">
                  <Card className="w-full">
                    <div className="flex flex-col gap-x-2 gap-y-3 items-center justify-center ">
                      <Avatar
                        style={{
                          backgroundColor: "#f56a00",
                          verticalAlign: "middle",
                        }}
                        gap={1}
                      >
                        {authContext.currentUser.fullname?.substring(0, 1)}
                      </Avatar>
                      <span className="text-lg">
                        {" "}
                        {authContext.currentUser.fullname}
                      </span>

                      <span className="text-gray-400">
                        {authContext.currentUser.email}
                      </span>

                      <span className="text-gray-400">
                        {authContext.currentUser.phone}
                      </span>
                    </div>

                    {/* {!authContext.currentUser.bank_info && (
                      <div
                        onClick={onUpdateBank}
                        className="flex items-center flex-row gap-x-3 justify-center py-2 h-12 border border-gray-200 mt-10 w-full rounded-lg mx-auto"
                      >
                        <Icon icon={"streamline:bank-solid"} />
                        <span className="text-sm"> {"Add bank details"}</span>
                      </div>
                    )} */}

                    <div
                      onClick={() => setIsReferralModalOpen(true)}
                      className="flex items-center flex-row gap-x-3 justify-center py-2 h-12 border border-gray-200 mt-4 w-full rounded-lg mx-auto cursor-pointer hover:bg-gray-50"
                    >
                      <Icon icon={"tdesign:money"} />
                      <span className="text-sm">Refer and earn</span>
                    </div>

                    <Modal
                      title={<div className="flex items-center gap-x-2">
                        <Icon icon={"streamline:money-cash-coins-stack"} className="text-2xl text-green-600" />
                        <span>Earn Big Rewards</span>
                      </div>}
                      open={isReferralModalOpen}
                      onCancel={() => setIsReferralModalOpen(false)}
                      footer={null}
                    >
                      <div className="py-6 space-y-6">
                        {/* Reward Amount Section */}
                        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 rounded-xl border border-green-100 relative overflow-hidden">
                          <div className="absolute right-0 top-0 opacity-10">
                            <Icon icon={"ph:currency-circle-dollar-fill"} className="text-8xl text-green-600" />
                          </div>
                          <div className="flex items-center gap-x-4">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                              <Icon icon={"solar:money-bag-bold"} className="text-3xl text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-green-700">Up to ₦1M</h3>
                              <p className="text-green-600 font-medium">Cash Reward</p>
                            </div>
                          </div>
                        </div>

                        {/* How it Works Section */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-x-2">
                            <Icon icon={"solar:lightbulb-bold"} className="text-2xl text-yellow-500" />
                            How it Works
                          </h4>
                          <div className="pl-4 border-l-2 border-yellow-200 space-y-4">
                            <div className="flex items-start gap-x-3">
                              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md mt-1">
                                <Icon icon={"solar:home-angle-bold"} className="text-lg text-white" />
                              </div>
                              <p className="text-gray-600">Introduce any shared apartment to use our smart meters</p>
                            </div>
                            <div className="flex items-start gap-x-3">
                              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md mt-1">
                                <Icon icon={"solar:dollar-minimalistic-bold"} className="text-lg text-white" />
                              </div>
                              <p className="text-gray-600">Earn up to ₦1,000,000 in rewards!</p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100 relative overflow-hidden">
                          <div className="absolute right-0 bottom-0 opacity-10">
                            <Icon icon={"solar:call-chat-rounded-bold"} className="text-8xl text-blue-600" />
                          </div>
                          <h4 className="font-medium flex items-center gap-x-2 mb-3">
                            <Icon icon={"solar:user-speak-rounded-bold"} className="text-xl text-blue-600" />
                            Get Started Now
                          </h4>
                          <a
                            href="tel:+2348065342749"
                            className="flex items-center gap-x-3 bg-white p-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-[1.02] group shadow-sm"
                          >
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md group-hover:shadow-lg transition-all">
                              <Icon icon={"solar:phone-bold"} className="text-xl text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Call us now</p>
                              <p className="text-blue-600 font-medium">+234 811 275 5857</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </Modal>

                    <Link href={Str.whatsappHelp}>
                      <div className="flex items-center flex-row gap-x-3 justify-center py-2 h-12 border border-gray-200 mt-4 w-full rounded-lg mx-auto">
                        <Icon icon={"ic:baseline-telegram"} />
                        <span className="text-sm"> {"Contact support"}</span>
                      </div>
                    </Link>
                    {/* 
                    <Link href={Str.earnChannel}>
                      <div className="flex items-center flex-row gap-x-3 justify-center py-2 h-12 border border-gray-200 mt-4 w-full rounded-lg mx-auto">
                        <Icon icon={"ic:baseline-telegram"} />
                        <span className="text-sm">
                          {" "}
                          {"Join HomeLettEarn channel"}
                        </span>
                      </div>
                    </Link>
 */}
                    {authContext.currentUser.bank_info && (
                      <div className="flex flex-col gap-y-2  items-center  gap-x-3 justify-center py-2 border border-gray-200 mt-4 w-full rounded-lg mx-auto">
                        <InfoItem
                          icon="ph:bank-bold"
                          title="Bank name"
                          content={bankName}
                        />
                        <InfoItem
                          icon="f7:number"
                          title="Account number"
                          content={
                            authContext.currentUser.bank_info
                              .bank_account_number
                          }
                        />
                        <InfoItem
                          icon="material-symbols-light:comment-bank-rounded"
                          title="Account name"
                          content={
                            authContext.currentUser.bank_info.bank_account_name
                          }
                        />
                      </div>
                    )}

                    {!loading && (
                      <div className="flex items-center mt-10 w-8/12 mx-auto  justify-center">
                        <Button
                          type="primary"
                          className="bg-primary w-full"
                          onClick={onLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

const InfoItem = ({ content, title, icon }: any) => {
  return (
    <div className="flex items-center justify-between w-full px-2 text-xs">
      <div className="flex items-center gap-x-2">
        <Icon icon={icon} />
        <span className="text-xs">{title}</span>
      </div>

      <span className="text-xs"> {content}</span>
    </div>
  );
};
export default SavedTeamMembers;
