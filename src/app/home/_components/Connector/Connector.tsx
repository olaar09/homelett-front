import React, { useContext, useEffect, useState } from "react";
import { Modal, List, Avatar, Button, message } from "antd";
import { useRequest } from "ahooks";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import DynamicComponent from "./DynamicComponent";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

// Define TypeScript interface for your item data
interface ListItem {
  title: string;
  avatar: string;
  description: string;
  category: string;
  id: number;
  isActive: boolean;
}

const ConnectorModal: React.FC<{
  visible: boolean;
  closable: boolean;
  onClose: (needRefresh: boolean) => void;
  defaultSelected: ListItem;
}> = ({ defaultSelected, visible, onClose, closable = false }) => {
  const apiUtil = new APIUtil();
  const auth = useContext(AuthContext);

  const [selected, setSelected] = useState<ListItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [defaultSelected]);

  const fetchSources = async () => {
    try {
      const response = await apiUtil.datasourceService.listSourceTypes();
      const data = response.data;

      const mapped = data!.map((sourceType: any) => {
        console.log(sourceType.category);

        return {
          id: sourceType.id,
          title: sourceType.name,
          avatar: sourceType.icon,
          description: sourceType.description,
          isActive: sourceType.is_active == 1,
          category: sourceType.category,
        };
      });

      console.log(mapped);

      return mapped;
    } catch (error) {
      console.log("none");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      if (!data.connection_string || !data.datasource_name) {
        message.error("Please complete all fields");
        return;
      } else {
        const source = await apiUtil.datasourceService.addSource({
          ...data,
          datasource_type_id: selected!.id,
        });
        await auth.refreshDataSource();
        await apiUtil.chatService.startChat({ datasource_id: source.data.id });
        message.success("Data source added");
        onClose(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.reason ??
            "Unable to complete request"
          }`
        );
      }
      message.error("Unable to complete request");
    } finally {
      setSubmitting(false);
    }
  };

  const { data: dataSourceTypes, loading, refresh } = useRequest(fetchSources);

  const handleOk = () => onClose(false);
  const handleCancel = () => onClose(false);
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
        closable={closable}
        maskClosable={closable}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        {selected && (
          <div style={{ height: 400, overflow: "auto" }}>
            <DynamicComponent
              loading={submitting}
              onSubmit={onSubmit}
              type={selected.title}
            />
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
            style={{ height: 650, overflow: "auto" }}
          />
        )}
      </Modal>
    </>
  );
};

export default ConnectorModal;
