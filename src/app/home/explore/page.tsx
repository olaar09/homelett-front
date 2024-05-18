"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Popconfirm, Spin, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { HeaderItem } from "../_components/PageHeaderItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import AddWorkflowModal from "./components/AddWorkflowModal";
import JobItem from "../_components/JobItem";
import { Str } from "@/utils/consts";
import UtilService from "@/services/UtilService";
import ACButton from "@/app/components/Button";
import ExploreHeader from "./Header";

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

  const handleAddWorkflow = () => {
    setOpenAddModal(true);
  };

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

  const handleContactSupport = async () => {
    window.open(Str.whatsapp);
  };

  const loadingPage = authContext.loading || loadingProducts;

  return (
    <>
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
          <div className="flex items-center w-full px-3">
            <div className="flex flex-col justify-between items-start w-full">
              <div className="flex flex-col items-center justify-between h-20 w-full mt-10">
                <div className="flex item h-10  ">
                  {[
                    "/logos/yt.webp",
                    "/logos/sp.png",
                    "/logos/pr.jpeg",
                    "/logos/nt.png",
                    "/logos/sm.png",
                  ].map((brand, index) => (
                    <div className={`-ml-4  px-1 bg-transparent `}>
                      <img
                        src={brand}
                        className={`flex  w-auto h-8 bg-[#2A2A2A] rounded-full `}
                      />
                    </div>
                  ))}
                </div>

                <span className="text-xs w-full text-center block ">
                  No subscription yet. Select a service below to get started
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {!loadingPage && productList && productList.length < 1 && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className=" flex flex-col  items-center justify-center gap-y-7">
            {" "}
            <img className="h-12" src="/fun-arrow.svg" />
            <span className="text-foreground">No products found</span>
          </div>
        </div>
      )}

      {productList && productList.length > 0 && (
        <Spin
          indicator={
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-8xl text-foreground"
            />
          }
          spinning={loadingProducts}
          className="bg-background-thin"
        >
          <div className="bg-background-thin min-h-screen">
            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  lg:px-8 px-2 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                {(productList ?? []).map((application: any) => {
                  return (
                    <div className="lg:w-4/12 w-full">
                      <JobItem
                        applying={false}
                        onSelectJob={undefined}
                        onApplyJob={undefined}
                        active={false}
                        job={{ ...application.job, applied: true }}
                      />
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default SavedTeamMembers;
