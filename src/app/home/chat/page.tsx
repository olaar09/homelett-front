"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { IChat } from "@/app/interfaces/ISubjectItem";
import { useRequest } from "ahooks";
import TextAvatar from "@/app/components/TextAvatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/components/LoadingOverlay";

const HeaderItem = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className=" items-center flex gap-x-1">
      <Icon icon={icon} className="text-xl" />
      <span className="text-black font-bold mt-0"> {title}</span>
    </div>
  );
};

const Chat = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();
  const router = useRouter();

  const getChats = async (): Promise<any> => {
    try {
      const data = await apiUtil.profileService.loadProfile();
      if (data) {
        return data;
      }
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const { data, error, loading } = useRequest(() => getChats(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  return (
    <main className="h-full bg-background-thin min-h-screen">
      <section className="h-14  flex items-center justify-between px-5">
        <HeaderItem icon="devicon:mysql-wordmark" title="Main DB" />

        <div className="flex items-center gap-x-7">
          <HeaderItem icon="fluent:history-32-filled" title="Previous chats" />
          <HeaderItem icon="ri:chat-new-fill" title="New chat" />
        </div>
      </section>
    </main>
  );
};

export default Chat;
