import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import RenderChatItem from "../DBChat/ChatItemDisplay";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface ChatHistoryProps {
  loadingChatHistory: boolean;
  datasource: IDataSourceItem;
  displayedChats: IChatHistoryItem[] | null;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  loadingChatHistory,
  displayedChats,
  datasource,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayedChats && displayedChats.length > 0) {
      if (displayedChats[displayedChats.length - 1].type === "answer") {
        console.log("i am here");
        scrollToBottom();
      } else {
        jumpToBottom();
      }
    }
  }, [displayedChats]);

  useEffect(() => {
    // Scroll to the bottom of the div
    if (displayedChats) scrollToBottom();
  }, [displayedChats]);

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

  return (
    <>
      {loadingChatHistory && (
        <div className="flex w-full flex-grow lg:w-full xl:w-8/12 mx-auto py-10 h-4/5 items-center justify-center">
          <Icon
            icon="eos-icons:three-dots-loading"
            className="text-6xl text-foreground"
          />
        </div>
      )}
      {!loadingChatHistory && displayedChats && (
        <div
          ref={scrollRef}
          className="flex w-full flex-grow lg:w-full xl:w-8/12 mx-auto py-10 h-4/5 overflow-y-scroll"
        >
          <div className="flex flex-col gap-y-5 px-4 w-full ">
            {displayedChats.map((cht: IChatHistoryItem) => (
              <div key={cht.id} className="text-foreground flex">
                <RenderChatItem data={cht} datasource={datasource} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHistory;
