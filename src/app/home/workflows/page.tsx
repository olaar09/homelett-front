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

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUtils = new APIUtil();

  const {
    data: workflowList,
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
      const data = await apiUtils.workflowService.getWorkflows();
      const list = data.data;
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
      {(loadingWorkflows || !workflowList) && (
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

      {!loadingWorkflows && workflowList && workflowList.length < 1 && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className=" flex flex-col  items-center justify-center gap-y-3">
            {" "}
            <Icon
              icon={"octicon:workflow-16"}
              className=" text-6xl text-foreground"
            />
            <span className="text-foreground">No workflows found</span>
          </div>
        </div>
      )}

      {workflowList && workflowList.length > 0 && (
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
            <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full bg-background-thin">
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
            </section>

            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  px-8 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                {(workflowList ?? []).map((workflow: any) => {
                  const fromDatasource = authContext.dataSources?.find(
                    (ds) => ds.id == workflow.datasource_id
                  );
                  const toWorkflow = authContext.dataSources?.find(
                    (ds) => ds.id == workflow.connection_datasource_id
                  );
                  return (
                    <div className="w-4/12 ">
                      <div className="mr-4 relative cursor-pointer hoverContainer transition-all">
                        <Card
                          className="rounded-2xl h-40 relative cursor-pointer"
                          bordered={false}
                        >
                          <Meta
                            title={
                              <div className="flex items-center gap-x-4">
                                <div className="flex items-center -gap-x-5">
                                  <Icon
                                    icon={fromDatasource!.source_type.icon}
                                  />
                                  <Icon icon={toWorkflow!.source_type.icon} />
                                </div>

                                <span> {workflow.title}</span>
                              </div>
                            }
                            description={workflow.description}
                          />
                        </Card>
                        <div className=" absolute top-3 right-4 z-10 hoverItem transition-all duration-150">
                          <div className=" flex items-center -gap-x-2 transition-all duration-300">
                            <Popconfirm
                              title="Delete the member?"
                              description="Are you sure to delete this member?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => handleDeleteWorkflow(workflow)}
                            >
                              <Button
                                className="text-red-500"
                                icon={<DeleteOutlined />}
                                type="link"
                              />
                            </Popconfirm>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-2 z-10">
                          <Tag bordered={false} color={"geekblue"}>
                            Active
                          </Tag>
                        </div>
                      </div>
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
