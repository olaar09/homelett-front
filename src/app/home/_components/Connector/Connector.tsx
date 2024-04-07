import React, { useState } from "react";
import { Modal, List, Avatar, Button } from "antd";
import { useRequest } from "ahooks";
import APIUtil from "@/services/APIUtil";

// Define TypeScript interface for your item data
interface ListItem {
  title: string;
  avatar: string;
}

const ConnectorModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const apiUtil = new APIUtil();

  const fetchSources = async () => {
    try {
      const list = await apiUtil.datasourceService.listSourceTypes();
    } catch (error) {
      console.log("none");
    }
  };

  const { data: dataSourceTypes, loading, refresh } = useRequest(fetchSources);

  // Sample data for list items
  const data: ListItem[] = [
    {
      title: "Item 1",
      avatar: "https://joeschmoe.io/api/v1/random",
    },
    // Add more items as needed
  ];

  const handleOk = () => onClose();
  const handleCancel = () => onClose();

  return (
    <>
      <Modal
        title="Connect a data source"
        open={visible}
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          loading={true}
          dataSource={data}
          renderItem={(item: ListItem) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Description here"
              />
            </List.Item>
          )}
          style={{ minHeight: "600px", overflow: "auto" }}
        />
      </Modal>
    </>
  );
};

export default ConnectorModal;
