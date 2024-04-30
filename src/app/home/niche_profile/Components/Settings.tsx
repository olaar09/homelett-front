"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import { useState } from "react";
import ACButton from "@/app/components/Button";
import { v4 as uuidv4 } from "uuid";
import { UnControlledInput } from "./Form";

const Settings = ({ onContinue }: { onContinue: any }) => {
  const [data, setData] = useState({
    cover_letter: "",
    experience: "",
  });

  const onFinishForm = (_: any) => {
    onContinue(data);
  };

  const onChange = (type: string, value: any) => {
    setData({ ...data, [type]: value });

    console.log({ ...data, [type]: value });
  };

  return (
    <Form onFinish={onFinishForm} className=" gap-y-12">
      <div>
        <div className="flex flex-col items-start px-2 gap-y-7">
          <div className="w-6/12  px-2 flex flex-col gap-y-2 py-10">
            <span className="font-bold text-xl">
              How creative it should be when generating cover letter
            </span>
            <Select
              className="w-full border h-12 rounded-lg "
              placeholder={"Select one"}
              value={data.cover_letter}
              onChange={(val: string) => onChange("cover_letter", val)}
              options={[
                { label: "Imaginative", value: "imaginative" },
                { label: "Conservative", value: "conservative" },
              ]}
            ></Select>
          </div>

          <div className="w-6/12  px-2 flex flex-col gap-y-2">
            <span className="font-bold text-xl">
              How creative it should be when rewriting CV for specific job
            </span>
            <Select
              className="w-full border h-12 rounded-lg "
              placeholder={"Select one"}
              value={data.experience}
              onChange={(val: string) => onChange("experience", val)}
              options={[
                { label: "Imaginative", value: "imaginative" },
                { label: "Conservative", value: "conservative" },
              ]}
            ></Select>
          </div>
        </div>

        <div className="px-4 mt-12">
          <ACButton
            text={"Continue"}
            type={"submit"}
            loading={false}
            children={undefined}
          />
        </div>
      </div>
    </Form>
  );
};

export default Settings;
