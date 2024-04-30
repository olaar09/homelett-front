"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer, Form, Input } from "antd";

export const UnControlledInput = ({
  label,
  title,
  onChange,
  required = true,
  value,
  disabled = false,
  name,
}: {
  required?: boolean;
  title?: string;
  label: string;
  onChange: any;
  value?: string;
  name: string;
  disabled: boolean;
}) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-y-2">
        <span className="font-bold">{title}</span>
        <Input
          readOnly={disabled}
          disabled={disabled}
          required={required}
          onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
          value={value}
          className="h-11"
          placeholder={label}
        />
      </div>
    </div>
  );
};

const IInput = ({
  label,
  title,
  onChange,
  required = true,
  value,
  name,
}: {
  required?: boolean;
  title: string;
  label: string;
  onChange: any;
  value?: string;
  name: string;
}) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-y-2">
        <span className="font-bold">{title}</span>
        <Form.Item name={name}>
          <Input
            required={required}
            onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
            name={label}
            value={value}
            className="h-11"
            placeholder={label}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default IInput;
