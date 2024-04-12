import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import { Modal, message } from "antd";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface DAddTeamModalProps {
  open: boolean;
  onCancel: (status?: boolean) => void;
}

const AddTeamModal: React.FC<DAddTeamModalProps> = ({ onCancel, open }) => {
  const [dataSourceName, setDataSourceName] = useState<string>("");
  const [dataSourceConnection, setDatasourceConnection] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const apiUtil = new APIUtil();

  const handleCancel = () => {
    setDataSourceName("null");
    setDatasourceConnection("");
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (!dataSourceName || !dataSourceConnection) {
        message.error("Please complete all fields");
        return;
      } else {
        await apiUtil.datasourceService.addSource({
          dataSourceConnection,
          dataSourceName,
        });
        message.success("Data source added");
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
            value={dataSourceName}
            name={"member_name"}
            onChange={(e) => setDataSourceName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <span className=" text-foreground">Member email</span>
          <InputField
            placeHolder={"email@member.com"}
            type={"text"}
            value={dataSourceConnection}
            name={"member_email"}
            onChange={(e) => setDatasourceConnection(e.target.value)}
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

export default AddTeamModal;
