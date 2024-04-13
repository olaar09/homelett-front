import React, { useContext, useState } from "react";
import {
  Modal,
  Button,
  Steps,
  Form,
  Input,
  DatePicker,
  Select,
  Dropdown,
  Space,
  message,
} from "antd";
import { Icon } from "@iconify/react";
import ACButton from "@/app/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import { AxiosError } from "axios";
const { Step } = Steps;
const { Option } = Select;

const workflowInterval = [
  { key: "onchange", label: "On data change" },
  { key: "5_min", label: "Every 5 minutes" },
  { key: "30_min", label: "Every 30 minutes" },
  { key: "hourly", label: "Every hour" },
  { key: "daily", label: "Every day" },
];
const SendQueryAnswerWorkflow = ({
  open,
  chatHistoryItem,
  onClose,
}: {
  chatHistoryItem: IChatHistoryItem;
  open: boolean;
  onClose: () => void;
}) => {
  const authContext = useContext(AuthContext);
  /*   const [isModalVisible, setIsModalVisible] = useState(false); */
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [selectedInterval, setSelectedInterval] = useState<any>(null);
  const [workflowName, setWorkflowName] = useState<any>(null);
  const apiUtil = new APIUtil();

  const handleOk = () => {
    onClose();
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const handleCancel = () => {
    setLoading(false);
    onClose();
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiUtil.workflowService.createWorkflow({
        interval: selectedInterval,
        title: workflowName,
        output_connection: selectedConnection.key,
        chat_history_item_id: chatHistoryItem.id,
      });

      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.response ??
            "Unable to complete request"
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const workflowConnections = (authContext.dataSources ?? [])
    .filter((ds) => ds.source_type.category === "workflow")
    .map((wrk) => ({
      key: wrk.id,
      label: wrk.name,
      icon: <Icon icon={wrk.source_type.icon} />,
    }));

  const onConnectionSelected = (e: any) => {
    const workflow = workflowConnections.find((wrk) => wrk.key == e.key);
    setSelectedConnection(workflow);
  };
  return (
    <>
      <Modal
        title="Setup workflow"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps
          size="small"
          current={currentStep}
          direction="vertical"
          className="mt-6"
        >
          <Step
            active
            title="Name"
            description={
              <div className=" flex my-2 w-full -m-2">
                <Form layout="vertical" className="w-full">
                  <Form.Item label="">
                    <Input
                      autoFocus
                      placeholder="Enter a name for your workflow"
                      className=" outline-none ring-0 border-0 h-12 shadow-0 focus:outline-none focus:border-0 focus:ring-0"
                    />
                  </Form.Item>
                </Form>
              </div>
            }
          />
          <Step
            active
            title="Workflow Interval"
            description={
              <div className=" flex my-2 w-full -m-2">
                <Form layout="vertical" className="w-full">
                  <Form.Item label="">
                    <Select
                      suffixIcon={
                        <Icon
                          className="text-foreground text-2xl opacity-60"
                          icon="fluent:caret-down-20-filled"
                        />
                      }
                      placeholder="Select flow interval"
                      className="focus:outline-none focus:border-0 focus:ring-0  outline-none ring-0 border-0"
                    >
                      {workflowInterval.map((wrk) => (
                        <Option value={wrk.key}>{wrk.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            }
          />
          <Step
            active
            title="Output"
            description={
              <div className=" flex my-2 w-full ">
                <Dropdown
                  menu={{
                    items: workflowConnections as any,
                    onClick: onConnectionSelected,
                  }}
                >
                  <div className="flex items-center justify-between w-full pr-4 cursor-pointer">
                    <div className="flex items-center gap-x-2">
                      {selectedConnection && selectedConnection?.icon}
                      <span>
                        {selectedConnection?.label ?? "Select connection"}
                      </span>
                    </div>

                    <Icon
                      className="text-foreground text-2xl opacity-60"
                      icon="fluent:caret-down-20-filled"
                    />
                  </div>
                </Dropdown>

                {/*         <Form layout="vertical" className="w-full">
                  <Form.Item label="">
                    <Select
                      suffixIcon={
                        <Icon
                          className="text-foreground text-2xl opacity-60"
                          icon="fluent:caret-down-20-filled"
                        />
                      }
                      placeholder="Select output connection"
                      className="focus:outline-none focus:border-0 focus:ring-0  outline-none ring-0 border-0"
                    >
                      {(authContext.dataSources ?? [])
                        .filter((ds) => ds.source_type.category === "workflow")
                        .map((wrk) => (
                          <Option value={wrk.id}>{wrk.name}</Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Form> */}
              </div>
            }
          />
        </Steps>
        <div className="steps-content mt-8">
          <ACButton
            onClick={onSubmit}
            text={"Create new workflow"}
            type={"button"}
            loading={loading}
            children={undefined}
          />
        </div>
      </Modal>
    </>
  );
};

export default SendQueryAnswerWorkflow;
