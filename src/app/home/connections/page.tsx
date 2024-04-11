"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import { Card, message } from "antd";
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
import { ChatContext } from "@/contexts/ChatContext";
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
  const [openConnector, setOpenConnector] = useState<boolean>(false);

  const [selectedConnectionPayload, setSelectedConnectionPayload] =
    useState<any>(undefined);

  const [selectedConnection, setSelectedConnection] = useState<
    ListItem | undefined
  >(undefined);

  useState(false);
  const currentAuth = useContext(AuthContext);

  const onOpenConnector = () => {
    setOpenConnector(true);
  };

  const onCloseConnector = () => {
    setOpenConnector(false);
    setSelectedConnection(undefined);
  };

  const onSelectConnection = (connection: ListItem) => {
    switch (connection.title) {
      case "mysql":
      case "postgresql":
      case "mariadb":
        setSelectedConnectionPayload({
          datasource_id: connection.datasource_id!,
          datasource_name: connection.title,
          connection_string: "",
        });
        break;

      default:
        break;
    }
    setSelectedConnection(connection);
    onOpenConnector();
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col w-full">
      <LoadingOverlay
        loading={currentAuth.loading || currentAuth.loadingSources}
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
            <div className="mr-4">
              <Card
                onClick={() =>
                  onSelectConnection({
                    datasource_id: Number(datasource.id),
                    id: datasource.source_type.id!,
                    title: datasource.source_type.name!,
                    avatar: datasource.source_type.icon,
                    description: datasource.source_type.description!,
                    isActive: datasource.source_type.is_active == 1,
                    category: datasource.source_type.category,
                  })
                }
                className="rounded-2xl h-40"
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
