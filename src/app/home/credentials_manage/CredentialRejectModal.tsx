import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
  Tag,
  message,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { DownOutlined } from "@ant-design/icons";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import ACButton from "@/app/components/Button";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";

const ApproveCredentialModal: React.FC<{
  open: boolean;
  selectedCredential: string | null;
  selectedPlatform: { name: string; id: string } | null;
  handleCancel: () => void;
  handleOk: () => void;
}> = ({
  handleOk,
  handleCancel,
  open,
  selectedCredential,
  selectedPlatform,
}) => {
  const [loading, setLoading] = useState(false);

  const [checkData, setCheckData] = useState({
    gmail: false,
    duration: false,
    plan: false,
    auth: false,
  });

  console.log("oqjiwrndskl", selectedPlatform?.name);

  const onChange = (key: string, value: boolean) => {
    setCheckData({ ...checkData, [key]: value });
  };
  const plan = Str.platforms.find((pl) => pl.value == selectedPlatform?.id);
  const apiUtil = new APIUtil();
  console.log(selectedCredential, plan);

  const onValidate = () => {
    if (!checkData.gmail) {
      message.error("Confirm if the gmail login is valid");
      return;
    }

    if (!checkData.auth) {
      message.error("Confirm if the service login is valid");
      return;
    }

    if (!checkData.plan) {
      message.error("Confirm if the correct plan is selected and paid for");
      return;
    }

    if (!checkData.duration) {
      message.error("Confirm if the duration is at least 30 days");
      return;
    }

    return true;
  };

  const onApproveCredential = () => {
    if (onValidate()) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      await apiUtil.productService.acceptCredential({
        credential_id: selectedCredential!,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.reason ??
            "Unable to complete request"
          }`
        );
      } else {
        message.error("Unable to complete request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Approve  Credential"
      open={open && selectedCredential != null}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <div className=" h-60 mt-10 flex flex-col gap-y-7">
        <Checkbox onChange={(e) => onChange("gmail", e.target.checked)}>
          I confirmed the Gmail password is valid
        </Checkbox>

        <Checkbox onChange={(e) => onChange("auth", e.target.checked)}>
          I confirmed the {selectedPlatform?.name} login is working and valid
        </Checkbox>

        <Checkbox onChange={(e) => onChange("plan", e.target.checked)}>
          I confirmed the correct plan ( {plan?.pricingName} ) is selected and
          paid for
        </Checkbox>

        <Checkbox onChange={(e) => onChange("duration", e.target.checked)}>
          I confirmed that the duration of the plan is at least 1 month
        </Checkbox>

        <div className="mt-0">
          <ACButton
            onClick={onApproveCredential}
            text={""}
            type={"button"}
            loading={loading}
          >
            <span className="text-white text-sm"> Approve credential</span>
          </ACButton>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveCredentialModal;
