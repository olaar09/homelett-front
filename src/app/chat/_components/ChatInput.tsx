"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Define the props the component accepts
type ChatInputProps = {
  disabled: boolean;
  busy: boolean;
  hasChat: boolean;
  value: string;
  onSend: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
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

  const noSend = busy || value.length < 2;

  useEffect(() => {
    let currentMessageIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let timerId: ReturnType<typeof setTimeout>;
    if (hasChat) {
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
  }, [hasChat]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        readOnly={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="pl-3 shadow pr-10 bg-transparent py-2 h-12 rounded-full ring-[0.5px] ring-secondary focus:outline-none focus:ring-primary focus:ring-2 w-full  text-sm text-foreground placeholder:text-foreground-secondary transition-all duration-150 appearance-none"
      />
      <div
        onClick={() => {
          if (!noSend) onSend();
        }}
        className="absolute inset-y-0 right-0 pr-0 flex items-center"
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
