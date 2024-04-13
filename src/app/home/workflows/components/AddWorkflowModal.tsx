import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import { Modal, message } from "antd";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface AddWorkflowModalProps {
  open: boolean;
  onCancel: (status?: boolean) => void;
}

const AddWorkflowModal: React.FC<AddWorkflowModalProps> = ({
  onCancel,
  open,
}) => {
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const apiUtil = new APIUtil();

  const handleCancel = () => {
    setEmail("null");
    setFullName("");
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-x-2 text-foreground">
          Add workflow
        </div>
      }
      open={open}
      onCancel={handleCancel}
      width={400}
      footer={null}
    >
      <div className="flex flex-col gap-y-10 h-full items-center pt-10 w-11/12 mx-auto">
        <div className=" flex items-center justify-center">
          <span className="text-center text-foreground">
            To create a new workflow, open a chat to get a specific data, and
            click on the workflow icon, to turn the chat response to a
            continuous workflow
          </span>
        </div>
        <div className="w-full mx-auto ">
          <ACButton
            onClick={handleCancel}
            text={"Continue"}
            type={"button"}
            loading={submitting}
            children={undefined}
          ></ACButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddWorkflowModal;
