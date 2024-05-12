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

const Settings = ({
  onContinue,
  loading,
  existingData = {
    cover_letter: "",
    experience: "",
  },
}: {
  onContinue: any;
  existingData: any;
  loading: boolean;
}) => {
  const [data, setData] = useState(existingData);

  const onFinishForm = (_: any) => {
    onContinue(data);
  };

  const onChange = (type: string, value: any) => {
    setData({ ...data, [type]: value });

    console.log({ ...data, [type]: value });
  };

  return (
    <Form onFinish={onFinishForm} className=" gap-y-12 w-full">
      <div>
        <div className="flex flex-col items-start px-2 gap-y-7 w-full">
          <div className="lg:w-6/12 w-full  px-2 flex flex-col gap-y-2 pt-10">
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

          <div className="lg:w-6/12 w-full  px-2 flex flex-col gap-y-2">
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

          <div className="lg:w-6/12 w-full  px-2 flex flex-col gap-y-2">
            <span className="font-bold text-xl">Your job type preference</span>
            <Select
              className="w-full border h-12 rounded-lg "
              placeholder={"Select one"}
              value={data.location}
              onChange={(val: string) => onChange("location", val)}
              options={[
                { label: "Work remotely", value: "Fully remote" },
                {
                  label: "Partly remote",
                  value: "Remote but can come in to the office some times",
                },
                {
                  label: "Work from office",
                  value: "Only work from office is suitable",
                },
                {
                  label: "All work locations",
                  value: "All types of work are fine",
                },
              ]}
            ></Select>
          </div>
        </div>

        <div className="px-4 mt-12">
          <ACButton
            text={"Continue"}
            type={"submit"}
            loading={loading}
            children={undefined}
          />
        </div>
      </div>
    </Form>
  );
};

export default Settings;
