import React, { useState } from "react";
import { Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { Icon } from "@iconify/react/dist/iconify.js";

// Define the shape of items
interface Item {
  key: string;
  label: string;
}

interface DropdownProps {
  items: IDataSourceItem[];
  onItemSelect: (key: string) => void;
}

const ChatDropdown: React.FC<DropdownProps> = ({ items, onItemSelect }) => {
  console.log(items);

  const [visible, setVisible] = useState<boolean>(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleMenuClick = (e: any) => {
    onItemSelect(e.key);
    setVisible(false); // Optionally close the dropdown menu after selection
  };

  const mapped = items.map((it) => {
    return {
      ...it,
      label: it.name!,
      key: it.id!,
      icon: (
        <Icon icon={it.source_type.icon!} className="text-black text-5xl" />
      ),
    };
  });

  return (
    <Dropdown
      menu={{ items: mapped, onClick: handleMenuClick }}
      placement="bottom"
    >
      <div
        className={` items-center flex gap-x-1 py-2 cursor-pointer hover:opacity-55 transition-all duration-150 bg-primary text-foreground-inverted rounded-lg px-3 `}
      >
        <Icon icon={"ri:chat-new-fill"} className="text-xl" />
        <span className="text-sm font-bold mt-0"> {"Start a new chat"}</span>
      </div>
    </Dropdown>
  );
};

export default ChatDropdown;
