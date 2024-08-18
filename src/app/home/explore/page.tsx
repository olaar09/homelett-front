"use client";

import React, { useContext, useEffect, useState } from "react";
import { Spin, Tabs, Tag, message } from "antd";
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

const ExplorePage = () => {
  const [openSubscriptions, setOpenSubscriptions] = useState(false)
  const authContext = useContext(AuthContext);
  const loadingPage = authContext.loading;
  const userSubs = authContext.currentUser?.active_subscriptions;
  const homeProducts = authContext.currentUser?.home_products ?? [];
  const resellerProducts = authContext.currentUser?.reseller_products ?? [];

  const utilService = new UtilService()

  return (
    <>
      <ProductChildrenDrawer
        product={null}
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
              <KornBalanceCard />
              <div className="grid grid-cols-2 gap-4 mt-8">
                <KornGridCard
                  title="Vault"
                  value="$0.00"
                  description="8% P.A"
                  icon={<img className="w-20" src="/dollar.png" />}
                />
                <KornGridCard
                  title="Korn Card"
                  disabled
                  value="$0.0"
                  description="View card"
                  icon={<img className="w-20" src="/card_ic.png" />}
                />
                <KornGridCard
                  onClick={() => setOpenSubscriptions(true)}
                  title="Subscriptions"
                  description={`From ${utilService.formatMoney(`${680}`, 'en-NG', 'NGN')}`}
                  icon={<img className="w-20" src="/netflix_ic.png" />}
                  value={""}
                />
                <KornGridCard
                  title="Buy airtime"
                  value=""
                  disabled
                  icon={<img className="w-20" src="/call.png" />}
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
