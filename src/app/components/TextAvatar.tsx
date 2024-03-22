// components/TextAvatar.tsx
"use client";
import React from "react";

interface TextAvatarProps {
  character: string;
  bgColor?: string;
}

const TextAvatar: React.FC<TextAvatarProps> = ({
  character,
  bgColor = "gray",
}) => {
  return (
    <div
      style={{ background: bgColor }}
      className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold`}
    >
      {character.toUpperCase()}
    </div>
  );
};

export default TextAvatar;
