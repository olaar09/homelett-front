"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer, Form, Input } from "antd";

const IInput = ({
  label,
  title,
  onChange,
  required = true,
  name,
}: {
  required?: boolean;
  title: string;
  label: string;
  onChange: any;
  name: string;
}) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-y-2">
        <span className="font-bold">{title}</span>
        <Form.Item name={name}>
          <Input
            required={required}
            onChange={onChange}
            name={label}
            className="h-11"
            placeholder={label}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default IInput;
