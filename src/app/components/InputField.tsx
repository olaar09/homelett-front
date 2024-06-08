"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Define the props the component accepts
type InputFieldProps = {
  placeHolder: string;
  type: string;
  required?: boolean;
  name: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const InputField: React.FC<InputFieldProps> = ({
  onChange,
  placeHolder,
  name,
  type,
  value,
  required = true,
}) => {
  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        defaultValue={value}
        placeholder={placeHolder}
        onChange={onChange}
        className="pl-3 shadow-sm pr-10 bg-transparent py-2 h-9 rounded-md ring-[0.5px] ring-secondary focus:outline-none focus:ring-primary focus:ring-2 w-full  text-sm text-foreground placeholder:text-foreground-secondary transition-all duration-150 appearance-none"
      />
    </div>
  );
};

export default InputField;
