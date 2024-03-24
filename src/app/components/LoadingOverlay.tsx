"use client";

import { Icon } from "@iconify/react";
import React from "react";

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Icon icon={"eos-icons:three-dots-loading"} className=" text-7xl"></Icon>
    </div>
  );
};

export default LoadingOverlay;
