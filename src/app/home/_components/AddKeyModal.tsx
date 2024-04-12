import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import { Modal, message } from "antd";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";

interface DAddKeyModalProps {
  open: boolean;
  onCancel: (status?: boolean) => void;
}

const AddKeyModal: React.FC<DAddKeyModalProps> = ({ onCancel, open }) => {
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const handleCancel = () => {
    setEmail("null");
    setFullName("");
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (!email || !fullname) {
        message.error("Please complete all fields");
        return;
      } else {
        await apiUtil.teamService.addTeam({
          fullname,
          email,
          user_role_description: "Account member",
        });
        authContext.refreshProfile();
        message.success("Updated OpenAI key");
        onCancel(true);
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

  return (
    <Modal
      title={
        <div className="flex items-center gap-x-2 text-foreground">
          Add team member
        </div>
      }
      open={open}
      onCancel={handleCancel}
      width={400}
      footer={null}
    >
      <div className="flex flex-col gap-y-10 h-full items-center pt-10 w-11/12 mx-auto">
        <div className="flex flex-col w-full">
          <span className=" text-foreground">Member name</span>
          <InputField
            placeHolder={"Member name"}
            type={"text"}
            value={fullname}
            name={"member_name"}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <span className=" text-foreground">Member email</span>
          <InputField
            placeHolder={"email@member.com"}
            type={"text"}
            value={email}
            name={"member_email"}
            onChange={(e) => setEmail(e.target.value)}
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
