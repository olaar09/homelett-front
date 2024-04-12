import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import { Modal, message } from "antd";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";

interface AddKeyModalProps {
  open: boolean;
  onCancel: (status?: boolean) => void;
}

const AddKeyModal: React.FC<AddKeyModalProps> = ({ onCancel, open }) => {
  const [key, setKey] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const authContext = useContext(AuthContext);

  const handleCancel = () => {
    setKey("null");
    onCancel();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    if (!key) {
      message.error("Please complete all fields");
      return;
    } else {
      const response = await authContext.updateKey(key);
      if (response) {
        onCancel(true);
      }
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-x-2 text-foreground">
          Add OpenAI key
        </div>
      }
      open={open}
      onCancel={handleCancel}
      width={600}
      footer={null}
    >
      <div className="flex flex-col gap-y-10 h-full items-center pt-10 w-11/12 mx-auto">
        <div className="flex flex-col w-full">
          <span className=" text-foreground">OpenAI key</span>
          <InputField
            placeHolder={"OpenAI key "}
            type={"password"}
            value={key}
            name={"open_ai_key"}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="w-full mx-auto ">
          <ACButton
            onClick={handleSubmit}
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

export default AddKeyModal;
