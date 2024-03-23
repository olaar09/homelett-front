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
      className={`h-14 w-full fixed top-0 bg-background left-0 right-0 px-4 pt-2 border-b-[0.5px] border-b-foreground-secondary `}
    >
      {children}
    </div>
  );
};

export default StickyHead;
