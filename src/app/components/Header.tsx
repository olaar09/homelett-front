// components/TextAvatar.tsx
"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

interface StickyHeadProps {
  hasContent: boolean;
  children: React.ReactNode;
}

const StickyHead: React.FC<StickyHeadProps> = ({ hasContent, children }) => {
  return (
    <div
      className={`h-14 w-full top-3 bg-background left-0 right-0 px-4 border-b-[0.5px] border-b-foreground-secondary ${
        hasContent ? "sticky" : "fixed "
      }`}
    >
      {children}
    </div>
  );
};

export default StickyHead;
