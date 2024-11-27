"use client";

import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Spin, Tabs, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { HeaderItem } from "../_components/PageHeaderItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddWorkflowModal from "../_components/AddWorkflowModal";
import ExploreHeader from "./components/Header";

import { IProduct } from "@/app/interfaces/IProduct";
import AirtimeTab from "./components/AirtimeTab/AirtimeTab";
import NoticeDrawers from "./components/Notice/NoticeDrawer";
import UtilService from "@/services/UtilService";
import UtilityTab from "./components/UtilityTab";
import CourseTab from "./components/CourseTab/CourseTab";
import TradingTab from "./components/TradingTab";
import ProductDrawer from "./components/Products/ProductDrawer";
import LoadingCard from "../_components/LoadingCard";
import HomeMenu from "./components/HomeMenu";
import { useRouter } from "next/navigation";
import SingleProductDrawer from "./components/SingleProductDrawer";
import ResellerOfferings from "../resseller/page";
import Header from "./components/Header";
import KornGridCard from "./components/KornGridCard";
import KornBalanceCard from "./components/KornBalanceCard";
import KornHeader from "./components/KornHeader";
import ProductChildrenDrawer from "./components/Products/ProductChildrenDrawer";
import Link from "next/link";
import PlanInfoDrawer from "../../components/HouseProductDrawer";
import SubscriptionInfoDrawer from "./components/SubscriptionInfo";
import moment from "moment";
import { ISubscription } from "@/app/interfaces/IRegisterRequest";
import IconButton from "./components/IconButton";
import TransactionList from "./components/TransactionList";

const ExplorePage = () => {
  const [openSubscriptions, setOpenSubscriptions] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<ISubscription | undefined>(undefined)

  const authContext = useContext(AuthContext);
  const loadingPage = authContext.loading;
  const userSubs = authContext.currentUser?.active_sub;
  const userTransactions = authContext.currentUser?.recent_transactions ?? [];
  const homeProducts = authContext.currentUser?.streaming ?? [];
  const resellerProducts = authContext.currentUser?.reseller_products ?? [];

  const utilService = new UtilService()
  const router = useRouter()

  const onOpenVault = (selected: IProduct) => {
    console.log(selected);

    const sub = authContext.currentUser?.active_subscriptions?.find((sub) => sub.product.id == selected.id)
    if (!sub) {
      console.log(authContext.currentUser?.active_subscriptions);

      message.error(`No ${selected.title} subscription yet`)
    } else {
      setSelectedSubscription(sub)
    }
  }

  const onAddFund = () => {
    router.push('/home/add_fund')
  }

  return (
    <>
      <ProductChildrenDrawer
        product={homeProducts[0]}
        open={openSubscriptions}
        onClose={function (): void {
          setOpenSubscriptions(false)
        }}
      />
      <div className=" h-screen overflow-y-auto overflow-hidden">
        {loadingPage && (
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

        {!loadingPage && (
          <div className="bg-gray-100 min-h-screen pt-6 pb-24">
            <KornHeader />
            <div className="p-4">

              {/*  <Alert type="warning" className="text-xs mb-3" message={
                <div className="flex items-center gap-x-2">
                  <Icon icon={'hugeicons:money-bag-02'} />
                  <span>Get 30% cash bonus on first 3 deposits, up to {bonusAmount}.</span>
                </div>
              } /> */}

              <KornBalanceCard />

              <div className="mt-8">
                <div className="grid grid-cols-4 gap-4">
                  <IconButton
                    icon="solar:wallet-money-bold"
                    label="Fund"
                    onClick={onAddFund}
                  />
                  <IconButton
                    icon="mdi:electricity-circle"
                    label="Buy Token"
                    onClick={() => message.info('Buy token feature coming soon')}
                  />
                  <IconButton
                    icon="solar:card-bold"
                    label="Subscription"
                    onClick={() => setOpenSubscriptions(true)}
                  />
                  <IconButton
                    icon="solar:chat-round-dots-bold"
                    label="Support"
                    onClick={() => message.info('Support feature coming soon')}
                  />
                </div>
              </div>

              <SubscriptionInfoDrawer
                open={selectedSubscription != undefined} onClose={function (): void {
                  setSelectedSubscription(undefined)
                }}
                selected={selectedSubscription}
              />

              <div className="mt-8">
                {userTransactions.length > 0 && (
                  <div className="mt-10 mb-3 flex justify-between items-center px-2">
                    <div className="flex items-center gap-x-2">
                      <Icon icon={'ri:time-line'} className="text-xs"></Icon>
                      <span className=" text-gray-800 text-xs">Recent transactions</span>
                    </div>
                  </div>
                )}
                <>
                  <TransactionList transactions={userTransactions} />
                </>
              </div>
            </div>

          </div>
        )}


      </div>
    </>
  );
};

export default ExplorePage;
