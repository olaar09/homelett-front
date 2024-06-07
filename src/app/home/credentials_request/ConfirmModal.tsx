import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { DownOutlined } from "@ant-design/icons";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";

const ApproveCredentialModal: React.FC<{
  open: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}> = ({ handleOk, handleCancel, open }) => {
  return (
    <Modal
      title="Approve  Credential"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ApproveCredentialModal;
