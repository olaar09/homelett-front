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
    <main className="h-full bg-red-300">
      <section className="h-full">
        <span className="text-black">Chat name</span>
      </section>
    </main>
  );
};

export default Chat;
