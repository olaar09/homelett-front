import React, { useState } from "react";
import { Modal, Button, Steps, Form, Input, DatePicker, Select } from "antd";
const { Step } = Steps;
const { Option } = Select;

const SendQueryAnswerWorkflow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Handle submission or navigation to next step here");
    setIsModalVisible(false);
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0); // Reset step on modal close if needed
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with Steps
      </Button>
      <Modal
        title="Step Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={currentStep} direction="vertical">
          <Step title="Title" description="Enter the title." />
          <Step title="Date & Time" description="Select date and time." />
          <Step title="Output" description="Select a platform group." />
        </Steps>
        <div className="steps-content">
          {currentStep === 0 && (
            <Form layout="vertical">
              <Form.Item label="Title">
                <Input placeholder="Enter title" />
              </Form.Item>
            </Form>
          )}
          {currentStep === 1 && (
            <Form layout="vertical">
              <Form.Item label="Date & Time">
                <DatePicker showTime placeholder="Select time" />
              </Form.Item>
            </Form>
          )}
          {currentStep === 2 && (
            <Form layout="vertical">
              <Form.Item label="Output">
                <Select placeholder="Select a platform group">
                  <Option value="platform1">Platform 1</Option>
                  <Option value="platform2">Platform 2</Option>
                  {/* Add more platforms as needed */}
                </Select>
              </Form.Item>
            </Form>
          )}
        </div>
        <div className="steps-action">
          {currentStep < 2 && (
            <Button type="primary" onClick={() => nextStep()}>
              Next
            </Button>
          )}
          {currentStep === 2 && (
            <Button type="primary" onClick={handleOk}>
              Done
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SendQueryAnswerWorkflow;
