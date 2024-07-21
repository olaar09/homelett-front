"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { usePrevious, useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import ChatInput from "../_components/ChatInput";
import ConnectorModal, { ListItem } from "../_components/Connector/Connector";
import { IChat } from "@/app/interfaces/IChatItem";
import { AxiosError } from "axios";
import ChatListDrawer from "../_components/SelectChatDrawer";
import StartChatModal from "../_components/StartChatModal";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import ChatHistory from "../_components/ChatDisplay";
import Chip from "@/app/components/Chip";
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
      className={` items-center flex gap-x-1 cursor-pointer hover:opacity-55 transition-all duration-150  py-3 ${withBg
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
  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedConnectionPayload, setSelectedConnectionPayload] =
    useState<any>(undefined);

  const [selectedConnection, setSelectedConnection] = useState<
    IDataSourceItem | undefined
  >(undefined);

  useState(false);
  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const onOpenConnector = () => {
    setOpenConnector(true);
  };

  const onCloseConnector = () => {
    setOpenConnector(false);
    setSelectedConnection(undefined);
  };

  const onSelectConnection = (connection: IDataSourceItem) => {
    switch (connection.source_type.name) {
      case "mysql":
      case "postgresql":
      case "mariadb":
      case "slack":
        setSelectedConnectionPayload({
          datasource_id: connection.source_type.id!,
          datasource_name: connection.name,
          connection_string: "",
        });
        break;

      default:
        break;
    }
    setSelectedConnection(connection);
    onOpenConnector();
  };

  const handleDeleteConnection = async (connection: IDataSourceItem) => {
    try {
      setLoading(true);
      await apiUtil.datasourceService.deleteSource(connection.id);
      await currentAuth.refreshDataSource();
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      } else {
        message.error("Unable to delete connection");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col w-full">
      <LoadingOverlay
        loading={currentAuth.loading || currentAuth.loadingSources || loading}
      />

      <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full">
        <div className="flex flex-col">
          <HeaderItem icon="" title={`CONNECTIONS`} withBg={false} />
          <span className="text-xs text-foreground-secondary truncate w-full">
            Your datasource and workflow connections
          </span>
        </div>

        <div onClick={onOpenConnector}>
          <HeaderItem
            icon="mdi:connection"
            title="Add new connection"
            withBg={true}
          />
        </div>
      </section>

      <section className=" flex items-center w-full  px-8 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
        {(currentAuth.dataSources ?? []).map((datasource) => (
          <div className="w-4/12 ">
            <div className="mr-4 relative cursor-pointer hoverContainer transition-all">
              <Card
                onClick={() => onSelectConnection(datasource)}
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
                    onConfirm={() => handleDeleteConnection(datasource)}
                  >
                    <Button
                      className="text-red-500"
                      icon={<DeleteOutlined />}
                      type="link"
                    />
                  </Popconfirm>
                  <Button
                    onClick={() => onSelectConnection(datasource)}
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
      <ConnectorModal
        defaultFormPayload={selectedConnectionPayload}
        closable={true}
        visible={openConnector}
        onClose={onCloseConnector}
        defaultSelected={selectedConnection}
      />
    </main>
  );
};

export default Connections;
