import React, { useState } from "react";
import { Drawer, List, Button } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";

// Define types for the component props
interface ChatListDrawerProps {
  items: IChat[];
  open: boolean;
  onClose: () => void;
  onClick: (item: IChat) => void;
}

const ChatListDrawer: React.FC<ChatListDrawerProps> = ({
  items,
  onClick,
  onClose,
  open,
}) => {
  const handleItemClick = (item: IChat) => {
    // Call the onClick function passed via props
    onClick(item);
  };

  return (
    <>
      <Drawer
        title="Previous chats"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              className="hover:opacity-75 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <List.Item.Meta
                avatar={
                  <Icon
                    icon={item.datasource.source_type.icon}
                    className="text-2xl w-10"
                  />
                }
                title={
                  <div className=" items-center w-full flex justify-between">
                    <span className={"text-foreground"}>
                      {item.datasource.name}
                    </span>

                    <span className="text-foreground text-xs py-1 px-2 rounded-xl">
                      <Icon icon={"ep:arrow-right"} className="text-xl w-10" />
                    </span>
                  </div>
                }
                description={<span>{item.slug ?? "No title yet"}</span>}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

// Usage Example
// const App: React.FC = () => {
//   const items: ItemType[] = [
//     { name: "Item 1" },
//     { name: "Item 2" },
//     { name: "Item 3" },
//   ];

//   const handleItemClick = (item: ItemType) => {
//     console.log("Item clicked:", item);
//   };

//   return <ChatListDrawer items={items} onClick={handleItemClick} />;
// };

export default ChatListDrawer;
