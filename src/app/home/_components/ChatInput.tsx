"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Define the props the component accepts
type ChatInputProps = {
  disabled: boolean;
  busy: boolean;
  hasChat: boolean;
  value?: string;
  onSend: () => void;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onChange,
  onSend,
  value,
  hasChat,
  busy,
  disabled,
}) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  const messages = [
    "Summarize the last class",
    "What was the topic of the first lecture",
    "Possible exam questions from all lectures",
  ];

  const noSend = busy || !value || (value?.length && value.length < 2);

  useEffect(() => {
    let currentMessageIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let timerId: ReturnType<typeof setTimeout>;
    if (busy) {
      setPlaceholder("");
      return;
    }

    const typeMessage = () => {
      if (isTyping) {
        charIndex++;
      } else {
        charIndex--;
      }

      const message = messages[currentMessageIndex];
      setPlaceholder(message.substring(0, charIndex));

      if (isTyping && charIndex === message.length) {
        // Once the end of the message is reached, pause before starting to delete
        timerId = setTimeout(() => {
          isTyping = false;
        }, 1000);
      } else if (!isTyping && charIndex === 0) {
        // Once the message is completely deleted, move to the next message and start typing
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        isTyping = true;
      }

      if (
        (isTyping && charIndex < message.length) ||
        (!isTyping && charIndex > 0)
      ) {
        // Continue typing or deleting
        const delay = isTyping ? 120 : 60; // Adjust typing and deleting speeds as needed
        timerId = setTimeout(typeMessage, delay);
      } else {
        // Handle end of typing/deleting cycle
        timerId = setTimeout(typeMessage, isTyping ? 1000 : 1500);
      }
    };

    // Start typing the first message
    timerId = setTimeout(typeMessage, 500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timerId);
  }, [busy, value]);

  return (
    <div className="relative w-full">
      <textarea
        id="prompt-textarea"
        dir="auto"
        rows={1}
        onChange={onChange}
        placeholder={"Message MainDB"}
        className="m-0 ring-[0.4px]  ring-foreground-secondary rounded-lg w-full resize-none border-0 bg-transparent focus:ring-[0.4px]  focus:ring-black  py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh]  placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[25px] outline-none"
        spellCheck={false}
        style={{ minHeight: "52px", overflowY: "hidden" }}
      />

      {/*    <textarea
        readOnly={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="pl-3 shadow pr-10 flex items-center bg-transparent py-2 min-h-12 rounded-full ring-[0.5px] ring-secondary focus:outline-none focus:ring-primary focus:ring-2 w-full  text-sm text-foreground placeholder:text-foreground-secondary transition-all duration-150 appearance-none placeholder:pt-2 "
      /> */}
      <div
        onClick={() => {
          if (!noSend) onSend();
        }}
        className="absolute inset-y-0 right-0 pr-0 flex items-center -top-1"
      >
        <Icon
          icon={
            busy
              ? "eos-icons:three-dots-loading"
              : "solar:round-arrow-right-bold"
          }
          className={`text-5xl  ${
            noSend ? "text-foreground-secondary" : "text-primary"
          }`}
        />
      </div>
    </div>
  );
};

export default ChatInput;
