"use client";
import React, { ChangeEventHandler } from "react";

type InputFieldProps = {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
};

const ACButton: React.FC<InputFieldProps> = ({
  onClick,
  text,
  type = "button",
}) => {
  // Define the props the component accepts

  return (
    <button
      type={type}
      className=" flex items-center  justify-center gap-x-3 bg-primary text-xl rounded-3xl text-foreground py-3 px-6 w-full"
      onClick={onClick}
    >
      <span className="text-foreground text-sm text-center block flex-grow">
        {" "}
        {text}
      </span>
    </button>
  );
};

export default ACButton;
