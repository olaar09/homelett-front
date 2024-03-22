"use client";

import { Icon } from "@iconify/react";
import React from "react";

// Define the props interface
interface ChipProps {
  isSelected: boolean;
  icon: string;
  title: string;
  toggleSelect: () => void;
}

const Chip: React.FC<ChipProps> = ({
  title,
  isSelected,
  icon,
  toggleSelect,
}) => {
  return (
    <div
      className={` px-6 py-[0.5rem] rounded-full cursor-pointer text-sm font-medium  flex items-center gap-x-1 ${
        isSelected
          ? "bg-primary  text-foreground"
          : "foreground-secondary transparent border-secondary border "
      }`}
      onClick={toggleSelect}
    >
      <div className="w-5">
        <Icon icon={icon} className="text-lg " />
      </div>

      <span className="text-xs"> {title} </span>
    </div>
  );
};

export default Chip;
