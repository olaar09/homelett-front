"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import { Button, Card, Tooltip, message } from "antd";
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

      <section className=" flex items-center h-screen">
        <div className="flex w-9/12 bg-red-200 h-full">
          <span>jobs here</span>
        </div>

        <div className="w-[400px]  h-full overflow-y-scroll pb-10 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => (
            <Card
              hoverable
              className=" h-48 border-b rounded-none flex flex-col relative"
            >
              <Card.Meta
                title={
                  <div className="  items-start block text-wrap line-clamp-2">
                    Frontend Engineer (Senior / Mid)
                  </div>
                }
                description={
                  <div className="flex flex-col items-start h-full">
                    <span className="text-black text-foreground-secondary">
                      Trust Wallet
                    </span>
                    <span>United Kingdom (Remote)</span>
                  </div>
                }
              />

              <div className=" absolute bottom-2 left-3 right-0">
                <div className="flex justify-between items-center w-full ">
                  <Button type="link" className=" text-foreground">
                    <div className="flex items-center gap-x-2">
                      <Icon
                        className="mt-0 text-primary"
                        icon={"streamline:send-email-solid"}
                      />
                      <span className="  block">Apply for this job</span>
                    </div>
                  </Button>

                  <div className="flex gap-x-3 px-3">
                    <Tooltip title="Remove this job (for this profile)">
                      <Button type="link" className=" text-foreground px-0">
                        <div className="flex items-center gap-x-2">
                          <Icon className="mt-0" icon={"ic:round-block"} />
                          <span className="  block text-xs">Skip this job</span>
                        </div>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Chat;
