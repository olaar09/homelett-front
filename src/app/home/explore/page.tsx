"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Popconfirm, Spin, Tabs, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { HeaderItem } from "../_components/PageHeaderItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddWorkflowModal from "./components/AddWorkflowModal";
import ExploreHeader from "./Header";

import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Highlight from "./components/Highlight/Available";
import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";
import ProductItem from "./components/Products/ProductItem";

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUtils = new APIUtil();

  const {
    data: productList,
    error,
    loading: loadingProducts,
    refresh: refreshWorkflow,
  } = useRequest(() => getWorkFlow(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  const handleCloseTeam = (status = false) => {
    setOpenAddModal(false);
    if (status) {
      refreshWorkflow();
    }
  };

  const getWorkFlow = async (): Promise<any> => {
    try {
      const data = await apiUtils.jobService.fetchJobApplications();
      const list = data;
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const loadingPage = authContext.loading || loadingProducts;
  const userSubs = authContext.currentUser?.subscriptions;

  const tabs = [
    { label: "Streaming", icon: "solar:video-library-bold" },
    { label: "Earn money", icon: "ri:money-dollar-circle-fill" },
    { label: "Data & Airtime", icon: "teenyicons:mobile-solid" },
  ];
  return (
    <div className=" h-screen ">
      <AddWorkflowModal open={openAddModal} onCancel={handleCloseTeam} />
      {(loadingPage || !productList) && (
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

      {false && !loadingPage && productList && productList.length < 1 && (
        <div className="h-1/2 mt-10   flex flex-col justify-center items-center">
          {" "}
          <div className=" flex flex-col  items-center justify-center gap-y-7">
            {" "}
            <img className="h-12" src="/fun-arrow.svg" />
            <span className="text-foreground">No products found</span>
          </div>
        </div>
      )}

      {(true || (productList && productList.length > 0)) && (
        <div className="px-3 mt-16 h-1/2 flex flex-col ">
          <span className="text-xs text-foreground-secondary">
            Available services
          </span>
          <Tabs
            defaultActiveKey="1"
            items={tabs.map((tab, i) => {
              const id = String(i + 1);
              return {
                key: id,
                label: (
                  <div className="flex items-center gap-x-2">
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
                      <div className="">
                        {[1, 2, 3, 4, 5, 6].map((x) => (
                          <ProductItem />
                        ))}
                      </div>
                    )}
                    {id === "2" && (
                      <div>
                        {[1, 2, 3, 4, 5, 6].map((x) => (
                          <ProductItem />
                        ))}
                      </div>
                    )}
                    {id === "3" && (
                      <div className="flex flex-col items-center justify-center h-72 gap-y-10">
                        <img className="h-12" src="/fun-arrow.svg" />
                        <span>Coming soon !</span>
                      </div>
                    )}
                  </div>
                ),
              };
            })}
          />
        </div>
      )}
    </div>
  );
};

export default SavedTeamMembers;
