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

import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Highlight from "./components/Highlight/Subscriptions";
import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";
import ProductItem from "./components/Products/ProductItem";
import EntertainmentTab from "./components/EntertainmentTab";
import EarnTab from "./components/EarnTab";
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
import PlanInfoDrawer from "./components/PlanInfo";
import SubscriptionInfoDrawer from "./components/SubscriptionInfo";

const ExplorePage = () => {
  const [openSubscriptions, setOpenSubscriptions] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const authContext = useContext(AuthContext);
  const loadingPage = authContext.loading;
  const userSubs = authContext.currentUser?.active_subscriptions;
  const homeProducts = authContext.currentUser?.streaming ?? [];
  const resellerProducts = authContext.currentUser?.reseller_products ?? [];

  const utilService = new UtilService()
  const bonusAmount = utilService.formatMoney(`${5000}`, 'en-NG', 'NGN')

  const onOpenVault = (selected: any) => {
    setSelectedSubscription(selected)
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

              <SubscriptionInfoDrawer
                open={selectedSubscription != null} onClose={function (): void {
                  setSelectedSubscription(null)
                }}
                selected={selectedSubscription}
              />

              <div className="mt-8 mb-3">
                <span className=" text-foreground-secondary">Subscriptions</span>
              </div>
              <div className="grid grid-cols-1 gap-4 ">
                <KornGridCard
                  onClick={() => onOpenVault({ title: 'Internet', username: 'qwerty', password: '3@%990300303' })}
                  title="Internet"
                  value="$0.00"
                  description="8% P.A"
                  icon={<img className="w-6" src="/logos/wifi.png" />}
                />
                <KornGridCard
                  onClick={() => onOpenVault({ title: 'Netflix', username: 'qwerty', password: '3@%990300303', profileName: 'Flexty1', profilePin: '2231' })}
                  title="Netflix"
                  disabled
                  value="$0.0"
                  description="View card"
                  icon={<img className="w-6" src="/logos/nt.png" />}
                />
                <KornGridCard
                  onClick={() => onOpenVault({ title: 'Prime video', username: 'qwerty', password: '3@%990300303', profileName: 'Flexty2', profilePin: '1231' })}
                  title="Prime video"
                  description={`From ${utilService.formatMoney(`${680}`, 'en-NG', 'NGN')}`}
                  icon={<img className="w-6" src="/logos/pr.jpeg" />}
                  value={""}
                />
                <KornGridCard
                  onClick={() => onOpenVault({ title: 'Spotify', username: 'qwerty', password: '3@%990300303', profileName: 'Flextqa', profilePin: '1231' })}
                  title="Spotify"
                  value=""
                  disabled
                  icon={<img className="w-6" src="/logos/sp.png" />}
                />
                <KornGridCard
                  title="ChatGPT"
                  value=""
                  disabled
                  icon={<img className="w-6" src="/logos/chatgpt.png" />}
                />
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default ExplorePage;
