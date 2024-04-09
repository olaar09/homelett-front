"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import { Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
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
import RenderChatItem from "../_components/ChatDisplay";

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
  const [displayedChats, setDisplayedChats] = useState<
    IChatHistoryItem[] | null
  >(null);
  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openPrevChats, setOpenPrevChats] = useState(false);
  const [openConnectedDatasources, setOpenConnectedDatasources] =
    useState(false);
  const [loadingNewChat, setLoadingNewChat] = useState(false);

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the div
    if (chat) scrollToBottom();
  }, [chat]);

  const jumpToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;

    const maxScroll = element.scrollHeight - element.clientHeight;
    const step = () => {
      if (element.scrollTop < maxScroll) {
        element.scrollTop += 20; // Adjust speed as necessary
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

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
    setDisplayedChats(chatHistoryList);
  }, [chatHistoryList]);

  useEffect(() => {
    if (chat) {
      refreshChatHistory();
    }
  }, [chat]);

  useEffect(() => {
    if (displayedChats && displayedChats.length > 0) {
      if (displayedChats[displayedChats.length - 1].type === "answer") {
        scrollToBottom();
      } else {
        jumpToBottom();
      }
    }
  }, [displayedChats]);

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

  const onSendChat = async () => {
    if (loading) return;
    try {
      const newChats = [...(displayedChats ?? [])];
      setUserInput("");
      newChats.push({
        message: userInput,
        type: "question",
        chat_id: chat!.id!,
      });
      setDisplayedChats(newChats);

      setLoading(true);
      const response = await apiUtil.chatService.askQuestion({
        chat_id: chat!.id,
        question: userInput,
        datasource_id: chat!.datasource.id!,
      });

      let data;
      try {
        data = JSON.parse(response.data.message!);
      } catch (error) {
        data = response.data;
      }

      console.log("PARSED", data);

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
    <main className="h-full bg-background-thin min-h-screen flex flex-col">
      <LoadingOverlay
        loading={
          currentAuth.loading || currentAuth.loadingSources || loadingNewChat
        }
      />
      <ChatListDrawer
        open={openPrevChats}
        onClose={onClosePreviousChats}
        items={chatList}
        onClick={onSelectChat}
      />
      <StartChatModal
        loading={loadingNewChat}
        datasources={currentAuth.dataSources ?? []}
        visible={openConnectedDatasources}
        onClickItem={onDatasourceSelected}
        onClose={() => setOpenConnectedDatasources(false)}
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
            <span className="text-xs text-foreground-secondary truncate w-52">
              {chat.slug}
            </span>
          </div>

          <div className="flex items-center gap-x-7">
            {chatList?.length > 1 && (
              <div onClick={onOpenPreviousChats}>
                <HeaderItem
                  icon="fluent:history-32-filled"
                  title="Previous chats"
                  withBg={false}
                />
              </div>
            )}

            <div onClick={onOpenStartChatModal}>
              <HeaderItem
                icon="ri:chat-new-fill"
                title="Start new chat"
                withBg={true}
              />
            </div>
          </div>
        </section>
      )}

      {displayedChats && (
        <div
          ref={scrollRef}
          className="flex w-full flex-grow lg:w-full xl:w-8/12 mx-auto py-10 h-4/5 overflow-y-scroll"
        >
          <div className="flex flex-col gap-y-5 px-4">
            {displayedChats.map((cht: any) => {
              return (
                <div className={` text-foreground flex `}>
                  <RenderChatItem data={cht} datasource={chat!.datasource!} />
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
