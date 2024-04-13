import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Dropdown, Table, Tooltip, message } from "antd";
import { Icon } from "@iconify/react";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import AreaChart from "@/app/components/RenderChat/RenderAreaChat";
import LineChart from "@/app/components/RenderChat/RenderLineChart";
import BarChart from "@/app/components/RenderChat/RenderBarChat";
import PieChat from "@/app/components/RenderChat/RenderPieChat";
import { ChatContext } from "@/contexts/ChatContext";
import APIUtil from "@/services/APIUtil";
import SendQueryAnswerWorkflow from "../WorkFlowManage/SendQueryAnswerWorkflow";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import QueryDisplay from "../QueryDisplay";

const actionTypes = [
  {
    icon: "octicon:workflow-16",
    key: "workflow",
    label: "Create workflow",
  },
  { icon: "tabler:file-type-sql", key: "view_sql", label: "View SQL" },
];

const viewTypes = [
  { icon: "mdi:table", key: "table", label: "Table" },
  { icon: "bi:pie-chart-fill", key: "pie_chart", label: "Pie chart" },
  { icon: "mingcute:chart-bar-fill", key: "bar_chart", label: "Bar chart" },
  { icon: "fa6-solid:chart-line", key: "line_chart", label: "Line chart" },
  { icon: "fa6-solid:chart-area", key: "area_chart", label: "Area chart" },
];

export const TextContentDisplay = ({
  avatar,
  senderName,
  content,
}: {
  avatar: string;
  senderName: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col gap-y-3 my-4 cursor-pointer px-2 rounded-lg py-2 w-full">
      <Header avatar={avatar} senderName={senderName} />
      <span className=" text-[0.85rem]">{content}</span>
    </div>
  );
};

export const ViewSelector = ({
  onClick,
  selectedView,
  chatHistoryItem,
}: {
  onClick: (name: string) => void;
  selectedView: string | null;
  chatHistoryItem: IChatHistoryItem;
}) => {
  const handleShowWorkflowModal = () => {
    setIsModalVisible(true);
  };

  const closeWorkflowModal = () => {
    setIsModalVisible(false);
  };

  const closeQueryModal = () => {
    setIsQueryModalVisible(false);
  };

  const handleOpenQueryModal = () => {
    setIsQueryModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQueryModalVisible, setIsQueryModalVisible] = useState(false);

  const mapOptions = viewTypes.map((vw) => {
    return {
      key: vw.key,
      onClick: () => onClick(vw.key),
      label: (
        <div className="flex items-center gap-x-2">
          <Icon icon={vw.icon} />
          <span>{vw.label}</span>
        </div>
      ),
    };
  });

  const oClickAction = (action: string) => {
    switch (action) {
      case "workflow":
        handleShowWorkflowModal();
        break;
      case "view_sql":
        handleOpenQueryModal();
        break;
      default:
        break;
    }
  };

  const selectedViewIcon =
    viewTypes.find((vt) => vt.key === selectedView)?.icon ??
    "lets-icons:chart-alt";
  return (
    <>
      <QueryDisplay
        query={chatHistoryItem.datasource_query}
        open={isQueryModalVisible}
        onClose={closeQueryModal}
      />
      <SendQueryAnswerWorkflow
        chatHistoryItem={chatHistoryItem}
        open={isModalVisible}
        onClose={closeWorkflowModal}
      />
      <div className="absolute  right-1 flex items-center gap-x-2">
        {actionTypes.map((view, i) => (
          <Tooltip key={i} title={view.label}>
            <Button
              className="w-2"
              type="link"
              onClick={() => oClickAction(view.key)}
            >
              <Icon
                className={`${
                  selectedView === view.key ? " text-primary" : " text-gray-700"
                }`}
                icon={view.icon}
              />
            </Button>
          </Tooltip>
        ))}
        <Dropdown menu={{ items: mapOptions }} placement="bottom">
          <Button type="link">
            <Icon className={`text-gray-700`} icon={selectedViewIcon} />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export const Header = ({
  avatar,
  senderName,
}: {
  avatar: string;
  senderName: string;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Icon icon={avatar} className="bg-transparent text-3xl text-gray-600" />
      <span className="text-foreground font-bold">{senderName}</span>
    </div>
  );
};

export const ContentDisplay = ({
  chatHistoryItem,
  data,
  columns,
  avatar,
  senderName,
}: {
  chatHistoryItem: IChatHistoryItem;
  data: any;
  columns: any;
  senderName: string;
  avatar: string;
}) => {
  const [viewKey, setViewKey] = useState("table");
  const chatContext = useContext(ChatContext);
  const apiUtil = new APIUtil();

  useEffect(() => {
    setViewKey(chatHistoryItem.extra?.current ?? "table");
  }, []);

  const onChangeDisplay = (selected: string) => {
    setViewKey(selected);
    //chatContext.scrollToBottom!();

    if (selected === "table") {
      onUpdateDisplay({ table: "normal" });
      // onUpdateDisplay({ key: "table", value: "normal" });
    }
  };

  const onUpdateDisplay = async (config: { key: string; value: string }) => {
    try {
      const newUpdate = {
        ...chatHistoryItem,
        extra: {
          ...(chatHistoryItem.extra ?? {}),
          [Object.keys(config)[0]]: Object.values(config)[0],
        },
      };
      chatContext.updateChatHistoryAtIndex(newUpdate);
      await apiUtil.chatHistoryService.updateChatHistory(
        chatHistoryItem.id!,
        config
      );
    } catch (error) {
      message.error("unable to update chat config ");
    }
  };

  return (
    <div className="  w-full">
      <div className="absolute top-10 right-1 flex items-center gap-x-3 z-30">
        <ViewSelector
          onClick={onChangeDisplay}
          selectedView={viewKey}
          chatHistoryItem={chatHistoryItem}
        />
      </div>
      <div>
        {viewKey === "table" && (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
            size="small"
            // scroll={{ x: columns.length > 5 ? 3300 : undefined }}
            rowClassName={() => "text-xs p-0 m-0 "}
          />
        )}

        {viewKey === "area_chart" && (
          <AreaChart
            onUpdateConfig={onUpdateDisplay}
            data={data}
            title=""
            chatHistoryItem={chatHistoryItem}
          />
        )}
        {viewKey === "pie_chart" && (
          <PieChat
            chatHistoryItem={chatHistoryItem}
            onUpdateConfig={onUpdateDisplay}
            data={data}
            title=""
          />
        )}
        {viewKey === "bar_chart" && (
          <BarChart
            chatHistoryItem={chatHistoryItem}
            onUpdateConfig={onUpdateDisplay}
            data={data}
            title=""
          />
        )}
        {viewKey === "line_chart" && (
          <LineChart
            chatHistoryItem={chatHistoryItem}
            onUpdateConfig={onUpdateDisplay}
            data={data}
            title=""
          />
        )}
      </div>
    </div>
  );
};
