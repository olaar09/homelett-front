"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ChangeEventHandler } from "react";

type InputFieldProps = {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  loading: boolean;
  children: any;
};

const ACButton: React.FC<InputFieldProps> = ({
  onClick,
  text,
  children,
  loading = false,
  type = "button",
}) => {
  // Define the props the component accepts

  const btnClicked = () => {
    if (!loading && type === "button" && onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={loading}
      type={type}
      className=" bg-primary text-xl rounded-xl text-foreground py-3 px-6 w-full h-12"
      onClick={btnClicked}
    >
      <div className="flex items-center  justify-center gap-x-4 ">
        {loading && (
          <div className={`${"w-10"} transition-all duration-150`}>
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className={` text-2xl text-white
           transition-all duration-150
           ${loading ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        )}
        {!loading && children && <>{children}</>}
        {!loading && !children && (
          <span className="text-white text-sm text-center block flex-grow">
            {" "}
            {text}
          </span>
        )}
      </div>
    </button>
  );
};

export default ACButton;
