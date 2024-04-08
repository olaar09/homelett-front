import React, { useContext, useState } from "react";
import { Modal, List, Avatar, Button, message } from "antd";

import { Icon } from "@iconify/react";

import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

const StartChartModal: React.FC<{
  datasources: IDataSourceItem[];
  visible: boolean;
  onClickItem: (item: IDataSourceItem) => void;
  onClose: (needRefresh: boolean) => void;
}> = ({ visible, onClose, datasources, onClickItem }) => {
  const handleOk = () => onClose(false);
  const handleCancel = () => onClose(false);
  const title = "Start a new chat";

  const handleOnClickItem = (item: IDataSourceItem) => {
    onClickItem(item);
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-x-2 text-foreground">
            {title}
          </div>
        }
        open={visible}
        onOk={handleOk}
        closable={false}
        maskClosable={false}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={datasources ?? []}
          renderItem={(item: IDataSourceItem) => (
            <List.Item
              onClick={() => handleOnClickItem(item)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={
                  <Icon
                    icon={item.source_type.icon}
                    className="text-2xl w-10"
                  />
                }
                title={
                  <div className=" items-center w-full flex justify-between">
                    <span className={`text-foreground`}>{item.name}</span>

                    <span className="text-foreground text-xs py-1 px-2 rounded-xl">
                      <Icon icon={"ep:arrow-right"} className="text-xl w-10" />
                    </span>
                  </div>
                }
                description={<span>{item.source_type.description}</span>}
              />
            </List.Item>
          )}
          style={{ height: 400, overflow: "auto" }}
        />
      </Modal>
    </>
  );
};

export default StartChartModal;
