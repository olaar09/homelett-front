"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

// Define the props the component accepts
type ChatInputProps = {
  disabled: boolean;
  datasource?: IDataSourceItem;
  busy: boolean;
  hasChat: boolean;
  onSend: (e: any, question: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend, datasource, busy }) => {
  const [value, setValue] = useState("");

  const noContent = !value || (value?.length && value.length < 2);
  const noSend = busy || noContent;

  const handleSend = (e: any) => {
    setValue("");
    onSend(e, value);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSend}>
        <textarea
          id="prompt-textarea"
          dir="auto"
          rows={1}
          value={value}
          onChange={(x) => setValue(x.target?.value)}
          placeholder={`Message ${datasource?.name ?? ""}`}
          className="m-0 ring-[0.4px]  ring-foreground-secondary rounded-lg w-full resize-none border-0 bg-transparent focus:ring-[0.4px]  focus:ring-black  py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh]  placeholder-black/50 dark:placeholder-foreground pl-10 md:pl-[25px] outline-none"
          spellCheck={false}
          style={{ minHeight: "52px", overflowY: "hidden" }}
        />

        <div className="absolute inset-y-0 right-3 pr-0 flex items-center -top-6 hover:opacity-85 cursor-pointer z-40">
          <Button
            className="text-1xl bg-primary"
            htmlType="submit"
            loading={busy}
            disabled={noSend as boolean}
            type="primary"
            icon={<ArrowUpOutlined />}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
