"use client";

import { Icon } from "@iconify/react";
import React from "react";

// Define the props interface
interface ChipProps {
  action?: (content: string) => void;
  isSelected: boolean;
  icon: string;
  title: string;
  toggleSelect?: () => void;
}

const Chip: React.FC<ChipProps> = ({ action, title, isSelected, icon }) => {
  return (
    <div
      onClick={() => {
        if (action) {
          action(title);
        }
      }}
      className="rounded-2xl bg-gray-200 px-2 flex items-center gap-x-2 hover:opacity-60 transition-all duration-100 cursor-pointer"
    >
      <span>{title}</span>
      {action && <Icon icon={"lucide:plus"} />}
    </div>
  );
};

export default Chip;
