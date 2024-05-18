"use client";

import { Icon } from "@iconify/react";
import React from "react";

// Define the props interface
interface ChipProps {
  action?: (content: string) => void;
  loading: boolean;
  isSelected: boolean;
  icon: string;
  title: string;
  toggleSelect?: () => void;
}

const Chip: React.FC<ChipProps> = ({ action, title, loading, icon }) => {
  return (
    <div
      onClick={() => {
        if (!loading && action) {
          action(title);
        }
      }}
      className="rounded-2xl bg-gray-200 px-2 flex items-center gap-x-2 hover:opacity-60 transition-all duration-100 cursor-pointer"
    >
      <span className="text-xs">{title}</span>
      {action && <Icon icon={loading ? "eos-icons:loading" : "lucide:plus"} />}
    </div>
  );
};

export default Chip;
