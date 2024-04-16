"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import { Avatar, Button, Card, Tooltip, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { usePrevious, useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import ChatInput from "../_components/ChatInput";
import ConnectorModal from "../_components/Connector/Connector";
import { IChat } from "@/app/interfaces/IChatItem";
import { AxiosError } from "axios";
import ChatListDrawer from "../_components/SelectChatDrawer";
import StartChatModal from "../_components/StartChatModal";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import ChatHistory from "../_components/ChatDisplay";
import { ChatContext } from "@/contexts/ChatContext";
import JobItem from "../_components/JobItem";
import LoadingJobItem from "../_components/LoadingJobItem";

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
      className={` items-center flex gap-x-1 py-3 cursor-pointer hover:opacity-55 transition-all duration-150 ${
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

const Chat = () => {
  const [chat, setChat] = useState<IChat | null>(null);

  const [displayedChats, setDisplayedChats] = useState<
    IChatHistoryItem[] | null
  >(null);

  const prevDisplayedChats = usePrevious(displayedChats);

  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openPrevChats, setOpenPrevChats] = useState(false);
  const [openConnectedDatasources, setOpenConnectedDatasources] =
    useState(false);
  const [loadingNewChat, setLoadingNewChat] = useState(false);

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const chatSources = (currentAuth.dataSources ?? []).filter((dt) => {
    return dt.source_type.category === "datasource";
  });

  const getChatHistory = async (): Promise<any> => {
    try {
      const data = await apiUtil.chatHistoryService.getChatHistory(chat!.id);
      return data.data.reverse();
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const getChats = async (): Promise<any> => {
    try {
      const data = await apiUtil.chatService.listChats();
      const list = data.data;

      if (list.length > 0) {
        setChat(list[0]);
      }
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const {
    data: chatList,
    error,
    loading: loadingChat,
    refresh: refreshChats,
  } = useRequest(() => getChats(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  const {
    data: chatHistoryList,
    error: historyError,
    loading: loadingChatHistory,
    refresh: refreshChatHistory,
  } = useRequest(() => getChatHistory(), {
    ready: chat != null && chat.id != null,
  });

  useEffect(() => {
    setDisplayedChats(chatHistoryList);
  }, [chatHistoryList]);

  useEffect(() => {
    if (chat) {
      refreshChatHistory();
    }
  }, [chat]);

  useEffect(() => {
    if (currentAuth) {
      if (
        (!currentAuth.dataSources || currentAuth.dataSources?.length < 1) &&
        !currentAuth.loadingSources
      ) {
        onOpenConnector();
      }
    }
  }, [currentAuth, currentAuth.loadingSources]);

  const onSendChat = async (e: any, question: string) => {
    e.preventDefault();

    try {
      const newChats = [...(displayedChats ?? [])];
      newChats.push({
        message: question,
        type: "question",
        chat_id: chat!.id!,
        ai_explanation: "",
        datasource_query: "",
      });
      setDisplayedChats(newChats);

      setLoading(true);
      const response = await apiUtil.chatService.askQuestion({
        chat_id: chat!.id,
        question: question,
        datasource_id: chat!.datasource.id!,
      });

      let data;
      try {
        data = JSON.parse(response.data.message!);
      } catch (error) {
        data = response.data;
      }

      setDisplayedChats([...newChats, response.data]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onOpenConnector = () => {
    setOpenConnector(true);
  };

  const updateChatHistoryAtIndex = (historyItem: IChatHistoryItem) => {
    const index = displayedChats!.findIndex((ch) => ch.id === historyItem.id);

    if (index !== -1) {
      displayedChats![index] = historyItem;
      setDisplayedChats([...displayedChats!]);
    }
  };

  const onCloseConnector = async (needRefresh = false) => {
    /*  if (!currentAuth.dataSources || currentAuth.dataSources?.length < 1) {
      alert("no dsource");
      return;
    } */
    if (needRefresh) {
      refreshChats();
    }
    setOpenConnector(false);
  };

  const onStartNewChat = async (dataSourceId: any) => {
    try {
      setLoadingNewChat(true);
      await apiUtil.chatService.startChat({ datasource_id: dataSourceId });
      refreshChats();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      }
    } finally {
      setLoadingNewChat(false);
    }
  };

  const onOpenPreviousChats = () => {
    setOpenPrevChats(true);
  };

  const onClosePreviousChats = () => {
    setOpenPrevChats(false);
  };

  const onSelectChat = (chat: IChat) => {
    setChat(chat);
    onClosePreviousChats();
  };

  const onOpenStartChatModal = () => {
    setOpenConnectedDatasources(true);
  };

  const onDatasourceSelected = async (item: IDataSourceItem) => {
    await onStartNewChat(item.id);
    setOpenConnectedDatasources(false);
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col 3xl:w-10/12  w-full mx-auto">
      <LoadingOverlay
        loading={
          currentAuth.loading || currentAuth.loadingSources || loadingNewChat
        }
      />

      <section className=" flex items-center h-screen overflow-scroll">
        <div className="lg:flex hidden lg:w-9/12  h-full  px-2 flex-col overflow-y-scroll">
          <LoadingJobItem />
        </div>

        <div className="lg:w-[400px] w-full  h-full overflow-y-scroll pb-10 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <JobItem active={i === 1} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Chat;
