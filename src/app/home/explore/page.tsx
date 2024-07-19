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
import HomeMenu from "../_components/HomeMenu";
import { useRouter } from "next/navigation";
import SingleProductDrawer from "./components/SingleProductDrawer";

const ExplorePage = () => {
  const authContext = useContext(AuthContext);
  const [openBannerProduct, setOpenBannerProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const apiUtils = new APIUtil();
  const utilsService = new UtilService();
  const router = useRouter()


  const loadingPage = authContext.loading;
  const userSubs = authContext.currentUser?.active_subscriptions;
  const homeProducts = authContext.currentUser?.home_products ?? [];

  const onTapMenu = (item: any) => {
    switch (item.key) {
      case '/home/streaming':
        router.push('/home/streaming')
        break;
      case '/yt_automation':
        setSelectedProduct({ tag: '', extra: '', extra_icon: '', price: 500, title: 'Youtube automation' })
        break;
      case '/forex':
        setSelectedProduct({ tag: '', extra: '', extra_icon: '', price: 500, title: 'Forex profit' })
        break;
      case '/smm':
        break;
      case '/phone':
        break;
      case '/skill':
        break;
      default:
        break;
    }
  }


  return (
    <>
      <SingleProductDrawer
        product={selectedProduct}
        open={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
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
          <>
            <ExploreHeader />
            <Highlight userSubs={userSubs} />
          </>
        )}

        <div className="px-3 mt-8 h-3/4  flex flex-col  flex-grow overflow-y-auto pb-20">
          <span className="text-xs text-foreground-secondary">
            Available services
          </span>

          {(loadingPage) &&
            <LoadingCard />
          }

          {!loadingPage &&
            <HomeMenu products={homeProducts} onClick={(item: any) => onTapMenu(item)}
            />
          }
        </div>
      </div>
    </>
  );
};

export default ExplorePage;

const Banner = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} className="w-full px-4 rounded-lg h-[4rem] mt-4">
      <img
        className="w-full h-full object-cover rounded-lg"
        src="/banners/showmax.png"
      />
    </div>
  );
};
