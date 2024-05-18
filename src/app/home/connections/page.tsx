"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { useRouter } from "next/navigation";
const { Meta } = Card;

const HeaderItem = ({
  withBg,
  title,
  icon,
}: {
  withBg: boolean;
  title: string;
  icon: string;
}) => {
  return (
    <div
      className={` items-center flex gap-x-1 cursor-pointer hover:opacity-55 transition-all duration-150  py-3 ${
        withBg
          ? "bg-primary text-foreground-inverted rounded-lg px-3 "
          : "text-foreground "
      }`}
    >
      <Icon icon={icon} className="text-xl" />
      <span className="text-sm font-bold mt-0"> {title}</span>
    </div>
  );
};

const Connections = () => {
  const [selectedConnection, setSelectedConnection] = useState<
    IDataSourceItem | undefined
  >(undefined);

  useState(false);
  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    currentAuth.clearUser();
  };

  const {
    data: workflowList,
    error,
    loading: loadingWorkflows,
    refresh: refreshWorkflow,
  } = useRequest(() => getWorkFlow(), {
    ready:
      currentAuth.currentUser != null && currentAuth.currentUser != undefined,
  });

  const getWorkFlow = async (): Promise<any> => {
    try {
      const data = await apiUtil.workflowService.getWorkflows();
      const list = data.data;
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col w-full">
      <LoadingOverlay
        loading={currentAuth.loading || currentAuth.loadingSources}
      />

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

      <section className="h-20 flex items-center justify-between px-8 mt-0 mx-auto w-full">
        {
          <>
            <div className="flex flex-col"></div>

            <div onClick={onLogout}>
              <Button type="link" className="flex items-center gap-x-2 px-0">
                <Icon className="text-black" icon={"ri:logout-box-fill"} />
                <span className="text-black">Logout</span>
              </Button>
            </div>
          </>
        }
      </section>

      {!loadingWorkflows && workflowList && workflowList.length < 1 && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className=" flex flex-col  items-center justify-center gap-y-7">
            {" "}
            <img className="h-12" src="/fun-arrow.svg" />
            <span className="text-foreground">Coming soon !</span>
          </div>
        </div>
      )}

      {workflowList && workflowList.length < 1 && (
        <section className=" flex items-center w-full  px-8 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
          {(currentAuth.dataSources ?? []).map((datasource) => (
            <div className="w-4/12 ">
              <div className="mr-4 relative cursor-pointer hoverContainer transition-all">
                <Card
                  className="rounded-2xl h-40 relative cursor-pointer"
                  bordered={false}
                >
                  <Meta
                    title={
                      <div className="flex items-center gap-x-2">
                        <Icon icon={datasource.source_type.icon} />
                        <span>{datasource.name}</span>
                      </div>
                    }
                    description={datasource.source_type.description}
                  />
                </Card>
                <div className=" absolute top-3 right-4 z-10 hoverItem transition-all duration-150">
                  <div className=" flex items-center -gap-x-2 transition-all duration-300">
                    <Popconfirm
                      title="Delete the connection"
                      description="Are you sure to delete this connection?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        className="text-red-500"
                        icon={<DeleteOutlined />}
                        type="link"
                      />
                    </Popconfirm>
                    <Button
                      icon={<EditOutlined />}
                      className="text-success-500"
                      type="link"
                    />
                  </div>
                </div>
                <div className="absolute bottom-3 right-2 z-10">
                  <Tag
                    bordered={false}
                    color={
                      datasource.source_type.category === "datasource"
                        ? "geekblue"
                        : "volcano"
                    }
                  >
                    {datasource.source_type.category}
                  </Tag>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Connections;
