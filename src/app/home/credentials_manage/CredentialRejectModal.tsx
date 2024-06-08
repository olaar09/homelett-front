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

const RejectCredentialModal: React.FC<{
  open: boolean;
  selectedCredential: string | null;
  selectedPlatform: { name: string; id: string } | null;
  handleCancel: (refresh: boolean) => void;
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

  const onRejectCredential = () => {
    onSubmit();
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      await apiUtil.productService.rejectCredential({
        credential_id: selectedCredential!,
      });
      handleCancel(true);
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
      title="Reject  Credential"
      open={open && selectedCredential != null}
      onOk={handleOk}
      onCancel={() => handleCancel(false)}
      maskClosable={false}
      footer={null}
    >
      <div className=" h-60 mt-10 flex flex-col gap-y-7">
        <Checkbox onChange={(e) => onChange("gmail", e.target.checked)}>
          The gmail password is invalid
        </Checkbox>

        <Checkbox onChange={(e) => onChange("auth", e.target.checked)}>
          The {selectedPlatform?.name} login details are invalid
        </Checkbox>

        <Checkbox onChange={(e) => onChange("plan", e.target.checked)}>
          This credential does not have the right plan ( {plan?.pricingName} )
        </Checkbox>

        <Checkbox onChange={(e) => onChange("duration", e.target.checked)}>
          The subscription duration is less than 1 month
        </Checkbox>

        <div className="mt-0">
          <ACButton
            onClick={onRejectCredential}
            text={""}
            type={"button"}
            loading={loading}
          >
            <span className="text-white text-sm"> Reject credential</span>
          </ACButton>
        </div>
      </div>
    </Modal>
  );
};

export default RejectCredentialModal;
