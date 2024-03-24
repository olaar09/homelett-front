"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Define the props the component accepts
type InputFieldProps = {
  placeHolder: string;
  type: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const InputField: React.FC<InputFieldProps> = ({
  onChange,
  placeHolder,
  type,
  required = true,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        required={required}
        placeholder={placeHolder}
        onChange={onChange}
        className="pl-3 shadow pr-10 bg-transparent py-2 h-12 rounded-xl ring-[0.5px] ring-secondary focus:outline-none focus:ring-primary focus:ring-2 w-full  text-sm text-foreground placeholder:text-foreground-secondary transition-all duration-150 appearance-none"
      />
    </div>
  );
};

export default InputField;
