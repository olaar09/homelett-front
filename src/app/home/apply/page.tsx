"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

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
import { Avatar, message } from "antd";
import { Str } from "@/utils/consts";
import Image from "next/image";
import { ExperienceItem } from "./ExperienceItem";
import { OverviewItem } from "./OverviewItem";
import HeaderSide from "./CVSide/Header";
import ASide from "./CVSide";

const Chat = () => {
  const [chat, setChat] = useState<IChat | null>(null);

  const [displayedChats, setDisplayedChats] = useState<
    IChatHistoryItem[] | null
  >(null);

  const prevDisplayedChats = usePrevious(displayedChats);

  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [jobs, setJobs] = useState<any[]>([]);

  const [loadingNewChat, setLoadingNewChat] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  useEffect(() => {
    setJobs(Str.dummyJobs);
    setSelectedJob(Str.dummyJobs[0]);
  }, []);

  useEffect(() => {
    onLoad();
  }, [selectedJob]);

  const onLoad = async () => {
    setLoadingCV(true);
    await waitforme(5000);
    setLoadingCV(false);
  };

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

  const onSelectJob = (jobItem: any) => {
    setSelectedJob(jobItem);
  };

  function waitforme(millisec: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, millisec);
    });
  }

  const onClosePreviousChats = () => {
    // setOpenPrevChats(false);
  };

  const onApplyJob = async (job: any) => {
    if (selectedJob?.name !== job.name) {
      setSelectedJob(job);
      message.warning("Review your cv before applying for this job");
      return;
    }

    setLoading(true);
    await waitforme(5000);
    const clone = [...jobs];
    const jobIndex = clone.findIndex((i) => i.name === job.name);
    clone[jobIndex].applied = true;
    setLoading(false);
    setJobs(clone);
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col 3xl:w-10/12  w-full mx-auto">
      <LoadingOverlay
        loading={
          currentAuth.loading || currentAuth.loadingSources || loadingNewChat
        }
      />

      <section className=" flex items-center h-screen overflow-scroll">
        <div className="lg:flex hidden lg:w-9/12  h-full   flex-col overflow-y-scroll">
          <div className="px-2 w-full">{loadingCV && <LoadingJobItem />}</div>

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-1">
              <div className="flex flex-col w-9/12">
                <section className="px-6 pt-7">
                  <div className="flex items-center gap-x-2">
                    <Icon className="text-xl" icon={"iconamoon:profile-fill"} />
                    <span className="font-black text-xl">Career Profile</span>
                  </div>

                  <OverviewItem title={""} duration={""} content={""} />
                </section>

                <section className="px-6 pt-7">
                  <div className="flex items-center gap-x-2">
                    <Icon
                      className="text-xl"
                      icon={"ic:baseline-work-history"}
                    />
                    <span className="font-black text-xl">Experiences</span>
                  </div>

                  <ExperienceItem title={""} duration={""} content={""} />
                  <ExperienceItem title={""} duration={""} content={""} />
                  <ExperienceItem title={""} duration={""} content={""} />
                  <ExperienceItem title={""} duration={""} content={""} />
                </section>
              </div>

              <ASide />
            </div>
          </div>
        </div>

        <div className="lg:w-[400px] w-full  h-full overflow-y-scroll pb-10 ">
          {Str.dummyJobs.map((job) => (
            <JobItem
              job={job}
              applying={job.name === selectedJob?.name && loading}
              onApplyJob={() => onApplyJob(job)}
              onSelectJob={() => onSelectJob(job)}
              active={job.name === selectedJob?.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Chat;
