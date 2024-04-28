import React, { useContext, useEffect, useState } from "react";
import { Modal, List, Avatar, Button, message } from "antd";
import { useRequest } from "ahooks";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import DynamicComponent from "./DynamicComponent";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

// Define TypeScript interface for your item data
export interface ListItem {
  title: string;
  avatar: string;
  description: string;
  category: string;
  id: number;
  datasource_id?: number;
  datasource_name?: string;
  isActive: boolean;
}

const ConnectorModal: React.FC<{
  visible: boolean;
  closable: boolean;
  defaultFormPayload?: any;
  onClose: (needRefresh: boolean) => void;
  defaultSelected?: IDataSourceItem;
}> = ({
  defaultSelected,
  visible,
  onClose,
  closable = false,
  defaultFormPayload = undefined,
}) => {
  const apiUtil = new APIUtil();
  const auth = useContext(AuthContext);

  const [selected, setSelected] = useState<ListItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [defaultPayload, setDefaultPayload] = useState(undefined);
  const [toListItem, setToListItem] = useState<ListItem | null>(null);

  useEffect(() => {
    console.log(defaultSelected, "KWDCWDKSDSKM");

    if (defaultSelected) {
      setToListItem({
        datasource_id: Number(defaultSelected.id),
        datasource_name: defaultSelected.name,
        id: defaultSelected.source_type.id!,
        title: defaultSelected.source_type.name!,
        avatar: defaultSelected.source_type.icon,
        description: defaultSelected.source_type.description!,
        isActive: defaultSelected.source_type.is_active == 1,
        category: defaultSelected.source_type.category,
      });
    }
  }, [defaultSelected]);

  useEffect(() => {
    console.log("LIST ITEMMM", toListItem, defaultFormPayload);
    setSelected(toListItem);
    setDefaultPayload(defaultFormPayload);
  }, [toListItem]);

  const fetchSources = async () => {
    try {
      const response = await apiUtil.datasourceService.listSourceTypes();
      const data = response.data;

      const mapped = data!.map((sourceType: any) => {
        return {
          id: sourceType.id,
          title: sourceType.name,
          avatar: sourceType.icon,
          description: sourceType.description,
          isActive: sourceType.is_active == 1,
          category: sourceType.category,
        };
      });
      return mapped;
    } catch (error) {
      console.log("none");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      if (!data.password || !data.email || !data.datasource_name) {
        message.error("Please complete all fields");
        return;
      } else {
        let source;
        if (defaultPayload && defaultFormPayload) {
          source = await apiUtil.datasourceService.updateSource({
            ...data,
            datasource_id: defaultFormPayload.datasource_id,
            datasource_type_id: selected!.id,
          });
        } else {
          source = await apiUtil.datasourceService.addSource({
            ...data,
            datasource_type_id: selected!.id,
          });
        }

        await auth.refreshDataSource();
        if (selected?.category === "datasource") {
        }
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
  const title =
    dataSourceTypes && dataSourceTypes.length > 0
      ? "Connect a data source"
      : "";

  const existingSourceTitle = `Update ${toListItem?.datasource_name} (${toListItem?.title})`;
  const newSourceTitle = `Connect  ${selected?.title} `;
  const modalTitle = selected
    ? `${defaultPayload ? existingSourceTitle : newSourceTitle}`
    : title;

  const onClickItem = (item: ListItem) => {
    if (item.isActive) {
      setSelected(item);
    }
    console.log(item.description);
  };

  const onResetItem = () => {
    setSelected(null);
    setDefaultPayload(undefined);
    setToListItem(null);
  };

  const handleCancel = () => {
    onResetItem();
    onClose(false);
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
            {modalTitle}
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
          <div style={{ height: 450, overflow: "auto" }}>
            <DynamicComponent
              defaultPayload={defaultPayload}
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
                  avatar={
                    <Icon icon={item.avatar} className="text-2xl w-10 mt-2" />
                  }
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
                            className="text-xl w-10 mt-2"
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
