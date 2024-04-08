"use client";

import { Icon } from "@iconify/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import ChatInput from "../_components/ChatInput";
import ConnectorModal from "../_components/Connector/Connector";
import { IChat } from "@/app/interfaces/IChatItem";
import { AxiosError } from "axios";

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
      className={` items-center flex gap-x-1 py-2 cursor-pointer hover:opacity-55 transition-all duration-150 ${
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
  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();
  const router = useRouter();

  const getChatHistory = async (): Promise<any> => {
    try {
      const data = await apiUtil.chatHistoryService.getChatHistory(chat!.id);
      console.log(data);
      return data.data;
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

  console.log(chatHistoryList);

  const onSendChat = async () => {
    try {
      setLoading(true);
      const response = await apiUtil.chatService.askQuestion({
        chat_id: chat!.id,
        question: userInput,
        datasource_id: chat!.datasource.id!,
      });
      refreshChatHistory();
      setUserInput("");

      console.log(response);
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

  const onChange = (ev: any) => {
    setUserInput(ev.target?.value);
  };

  const onOpenConnector = () => {
    setOpenConnector(true);
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

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col">
      <LoadingOverlay
        loading={currentAuth.loading || currentAuth.loadingSources}
      />
      <ConnectorModal visible={openConnector} onClose={onCloseConnector} />
      {chat && (
        <section className="h-20  flex items-center justify-between px-4 mt-0 mx-auto w-11/12">
          <div className="flex flex-col">
            <HeaderItem
              icon={chat?.datasource.source_type.icon}
              title={`${chat?.datasource.name}`}
              withBg={false}
            />
            <span className="text-xs text-foreground-secondary">
              {chat.slug}
            </span>
          </div>

          <div className="flex items-center gap-x-7">
            {chatList?.length > 1 && (
              <HeaderItem
                icon="fluent:history-32-filled"
                title="Previous chats"
                withBg={false}
              />
            )}
            <HeaderItem
              withBg
              icon="ri:chat-new-fill"
              title="Start a new chat"
            />
          </div>
        </section>
      )}

      {chatHistoryList && (
        <div className="flex w-full flex-grow lg:w-full xl:w-8/12 mx-auto py-10 h-4/5 overflow-y-scroll">
          <div className="flex flex-col gap-y-5 px-4">
            {chatHistoryList.map((cht: any) => {
              return (
                <div className={` text-foreground flex `}>
                  <div className="w-full">{cht.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {chatList && chatList?.length > 0 && (
        <section className="flex flex-grow justify-end flex-col  px-6  ">
          <div className="flex w-full lg:w-full xl:w-8/12 mx-auto py-10 h-40">
            <ChatInput
              datasource={chat?.datasource}
              disabled={loading || loadingChatHistory}
              busy={loading || loadingChatHistory}
              hasChat={false}
              value={userInput}
              onSend={onSendChat}
              onChange={onChange}
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default Chat;
