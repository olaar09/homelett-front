import React, { useState } from "react";
import { Drawer, List, Button } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";

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
            <List.Item onClick={() => handleItemClick(item)}>
              {item.slug} {/* Assuming each item has a 'name' property */}
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
