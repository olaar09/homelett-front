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

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUtils = new APIUtil();

  const {
    data: jobList,
    error,
    loading: loadingWorkflows,
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

  const handleDeleteWorkflow = async (workflow: any) => {
    try {
      setLoading(true);
      await apiUtils.workflowService.deleteWorkflow(workflow.id);
      refreshWorkflow();
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.reason ??
            "Unable to complete request"
          }`
        );
      } else {
        message.error("Unable to delete workflow");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AddWorkflowModal open={openAddModal} onCancel={handleCloseTeam} />
      {(loadingWorkflows || !jobList) && (
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

      {!loadingWorkflows && jobList && jobList.length < 1 && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className=" flex flex-col  items-center justify-center gap-y-7">
            {" "}
            <img className="h-12" src="/fun-arrow.svg" />
            <span className="text-foreground">Coming soon !</span>
          </div>
        </div>
      )}

      {jobList && jobList.length > 0 && (
        <Spin
          indicator={
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-8xl text-foreground"
            />
          }
          spinning={loadingWorkflows}
          className="bg-background-thin"
        >
          <div className="bg-background-thin min-h-screen">
            {/*    <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full bg-background-thin">
              <div className="flex flex-col">
                <HeaderItem
                  icon={"octicon:workflow-16"}
                  title={`Workflows `}
                  withBg={false}
                />
                <span className="text-xs text-foreground-secondary truncate w-52">
                  Manage & view workflows
                </span>
              </div>

              <div className="flex items-center gap-x-7">
                <div onClick={() => handleAddWorkflow()}>
                  <HeaderItem
                    icon="gg:add"
                    title="Add  new workflow"
                    withBg={true}
                  />
                </div>
              </div>
            </section> */}

            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  lg:px-8 px-2 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                {(jobList ?? []).map((application: any) => {
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
