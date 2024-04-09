import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import RenderChatItem from "../ChatItemDisplay";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface ChatHistoryProps {
  loadingChatHistory: boolean;
  datasource: IDataSourceItem;
  displayedChats: IChatHistoryItem[] | null;
  scrollRef: any;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  loadingChatHistory,
  displayedChats,
  datasource,
  scrollRef,
}) => {
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
          <div className="flex flex-col gap-y-5 px-4">
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
