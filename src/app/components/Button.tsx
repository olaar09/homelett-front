"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ChangeEventHandler } from "react";

type InputFieldProps = {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  loading: boolean;
};

const ACButton: React.FC<InputFieldProps> = ({
  onClick,
  text,
  loading = false,
  type = "button",
}) => {
  // Define the props the component accepts

  return (
    <button
      disabled={loading}
      type={type}
      className=" bg-primary text-xl rounded-3xl text-foreground py-3 px-6 w-full"
      onClick={onClick}
    >
      <div className="flex items-center  justify-center gap-x-4 ">
        <div className="w-3">
          <Icon
            icon={"mingcute:loading-fill"}
            className={`animate-spin text-lg
           transition-all duration-150
           ${loading ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <span className="text-foreground text-sm text-center block ">
          {" "}
          {text}
        </span>
      </div>
    </button>
  );
};

export default ACButton;
