import React, { useState } from "react";
import { Modal, List, Avatar, Button } from "antd";
import { useRequest } from "ahooks";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";

// Define TypeScript interface for your item data
interface ListItem {
  title: string;
  avatar: string;
  description: string;
  isActive: boolean;
}

const ConnectorModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const apiUtil = new APIUtil();
  const [selected, setSelected] = useState<ListItem | null>(null);

  const fetchSources = async () => {
    try {
      const response = await apiUtil.datasourceService.listSourceTypes();
      const data = response.data;

      const mapped = data!.map((sourceType: any) => {
        return {
          title: sourceType.name,
          avatar: sourceType.icon,
          description: sourceType.description,
          isActive: sourceType.is_active == 1,
        };
      });

      console.log(mapped);

      return mapped;
    } catch (error) {
      console.log("none");
    }
  };

  const { data: dataSourceTypes, loading, refresh } = useRequest(fetchSources);

  const handleOk = () => onClose();
  const handleCancel = () => onClose();
  const title =
    dataSourceTypes && dataSourceTypes.length > 0
      ? "Connect a data source"
      : "";

  const onClickItem = (item: ListItem) => {
    if (item.isActive) {
      setSelected(item);
    }
    console.log(item.description);
  };

  const onResetItem = () => {
    setSelected(null);
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-x-2 text-foreground">
            {selected && (
              <Icon
                onClick={onResetItem}
                icon={"formkit:arrowleft"}
                className="text-lg w-10 text-foreground cursor-pointer"
              />
            )}
            {selected ? `Connect ${selected?.title}` : title}
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
        {selected && (
          <div style={{ height: 400, overflow: "auto" }}>
            <span className="text-black">Hello world</span>
          </div>
        )}
        {!selected && (
          <List
            itemLayout="horizontal"
            loading={loading}
            dataSource={dataSourceTypes ?? []}
            renderItem={(item: ListItem) => (
              <List.Item
                onClick={() => onClickItem(item)}
                style={{ cursor: item.isActive ? "pointer" : "auto" }}
              >
                <List.Item.Meta
                  avatar={<Icon icon={item.avatar} className="text-2xl w-10" />}
                  title={
                    <div className=" items-center w-full flex justify-between">
                      <span
                        className={`${
                          item.isActive
                            ? "text-foreground"
                            : "text-foreground-secondary"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.isActive && (
                        <span className="text-foreground text-xs py-1 px-2 rounded-xl">
                          <Icon
                            icon={"ep:arrow-right"}
                            className="text-xl w-10"
                          />
                        </span>
                      )}

                      {!item.isActive && (
                        <span className="bg-[#E8E7FF]  text-primary text-xs py-1 px-2 rounded-xl">
                          Soon
                        </span>
                      )}
                    </div>
                  }
                  description={<span>{item.description}</span>}
                />
              </List.Item>
            )}
            style={{ height: 400, overflow: "auto" }}
          />
        )}
      </Modal>
    </>
  );
};

export default ConnectorModal;
