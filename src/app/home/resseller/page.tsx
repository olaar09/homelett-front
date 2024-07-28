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
import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";
import ProductItem from "./components/Products/ProductItem";
import EntertainmentTab from "./components/EntertainmentTab";
import EarnTab from "./components/EarnTab";
import { IProduct } from "@/app/interfaces/IProduct";

import UtilService from "@/services/UtilService";
import UtilityTab from "./components/UtilityTab";
import TradingTab from "./components/TradingTab";
import ProductDrawer from "./components/Products/ProductDrawer";
import Link from "next/link";
import CourseTab from "../streaming/components/CourseTab/CourseTab";

const ResellerOfferings = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);

  const utilsService = new UtilService();
  const [loading, setLoading] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);
  const [openBannerProduct, setOpenBannerProduct] = useState(false);

  const apiUtils = new APIUtil();


  useEffect(() => {
    const finance = authContext.currentUser?.finance?.balance ?? 0;
    if (finance < 0) {
      setOpenNotice(true);
    }
  }, [authContext.currentUser]);

  const {
    data: productList,
    error,
    loading: loadingProducts,
    refresh: refreshWorkflow,
  } = useRequest(() => getProducts(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  const {
    data: dataPlanList,
    error: dataPlanError,
    loading: loadingDataPlans,
    refresh: refreshDataPlan,
  } = useRequest(() => getDataPlanProducts());

  const handleCloseTeam = (status = false) => {
    setOpenAddModal(false);
    if (status) {
      refreshWorkflow();
    }
  };

  const getDataPlanProducts = async (): Promise<any> => {
    try {
      const data = await apiUtils.productService.fetchDataPlanProducts();
      return data;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const getProducts = async (): Promise<any> => {
    try {
      const data = await apiUtils.productService.fetchProducts();

      console.log(data);

      return data;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const loadingPage = authContext.loading || loadingProducts;
  const userSubs = authContext.currentUser?.active_subscriptions;
  const waitingProducts = loadingPage || !productList;

  const streamProducts = (productList ?? []).filter(
    (product: IProduct) => product.type === "stream"
  );

  const utilityProducts = (productList ?? []).filter(
    (product: IProduct) => product.type === "utility"
  );

  const coursesProducts = (productList ?? []).filter(
    (product: IProduct) => product.type === "course"
  );

  const tabs = [
    { label: "Streaming", icon: "solar:video-library-bold" },
    { label: "Utility & Software", icon: "hugeicons:software" },
    { label: "Online Courses", icon: "ri:video-line" },
  ];
  const bannerProduct = authContext.currentUser?.bannerProduct;
  return (
    <>
      {bannerProduct && (
        <ProductDrawer
          product={bannerProduct}
          open={openBannerProduct}
          onClose={function (): void {
            setOpenBannerProduct(false);
          }}
        />
      )}
      {/*     {authContext.currentUser && (
        <div className="bg-red-400 h-auto gap-x-2 flex items-center justify-center text-center px-2 py-2">
          <span className="text-white text-xs">
            Due to extremely high demand, netflix, Show-max and prime are not
            available. please check back later. if you would like to earn 50%
            instantly sharing your subscription, click earn
          </span>
        </div>
      )}
 */}
      <div className=" h-screen ">
        <AddWorkflowModal open={openAddModal} onCancel={handleCloseTeam} />
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

        {!loadingPage && productList && productList.length < 1 && (
          <div className="h-1/2 mt-10   flex flex-col justify-center items-center">
            {" "}
            <div className=" flex flex-col  items-center justify-center gap-y-7">
              {" "}
              <img className="h-12" src="/fun-arrow.svg" />
              <span className="text-foreground">No products found</span>
            </div>
          </div>
        )}

        <div className="px-3 mt-2  flex flex-col ">
          <Link href={'/home/explore'}>
            <div className="flex items-center gap-x-2 hover:bg-gray-50  rounded ">
              <Icon icon={'ion:arrow-back-outline'} />
              <span className="font-bold">  Available streaming services</span>
            </div>
          </Link>

          <span className="text-xs block mt-4 text-foreground-secondary">

          </span>
          <Spin spinning={loadingProducts}>
            <Tabs
              defaultActiveKey="1"
              items={tabs.map((tab, i) => {
                const id = String(i + 1);
                return {
                  key: id,
                  label: (
                    <div className="flex items-center gap-x-2 relative">
                      {" "}
                      <Icon className="inline" icon={tab.icon} />
                      <span>{tab.label}</span>
                    </div>
                  ),
                  children: (
                    <div
                      style={{
                        maxHeight: window.screen.availHeight / 1.4,
                        overflowY: "scroll",
                        paddingBottom: 240,
                      }}
                    >
                      {id === "1" && (
                        <EntertainmentTab
                          products={streamProducts}
                          loading={false}
                        />
                      )}
                      {id === "2" && (
                        <UtilityTab products={utilityProducts} loading={false} />
                      )}

                      {id === "3" && (
                        <CourseTab products={coursesProducts} loading={false} />
                      )}
                    </div>
                  ),
                };
              })}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default ResellerOfferings;

