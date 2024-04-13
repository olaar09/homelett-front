import React, { useContext, useState } from "react";
import { Modal, Button, Steps, Form, Input, DatePicker, Select } from "antd";
import { Icon } from "@iconify/react";
import ACButton from "@/app/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
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
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const authContext = useContext(AuthContext);
  /*   const [isModalVisible, setIsModalVisible] = useState(false); */
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    console.log("Handle submission or navigation to next step here");
    onClose();
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const handleCancel = () => {
    setLoading(false);
    onClose();
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const onSubmit = () => {
    setLoading(true);
    // onClose();
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
            title="Output"
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
                </Form>
              </div>
            }
          />
        </Steps>
        <div className="steps-content">
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
