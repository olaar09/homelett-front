"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { message } from "antd";
import { useRouter } from "next/navigation";

const Chat = () => {
  const auth = useContext(AuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hasChat, setHasChat] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    router.push("/home/dashboard");
  }, []);

  return <main className=" w-full bg-background-thin min-h-screen"></main>;
};

export default Chat;
