"use client";

import { Drawer, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import IInput from "./Form";
import ACButton from "@/app/components/Button";
import { Str } from "@/utils/consts";
import FormItem from "antd/es/form/FormItem";

const BioInfo = ({
  onContinue,
  existingData = {},
}: {
  onContinue: any;
  existingData: any;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(existingData);

    form.setFieldsValue(existingData);
  }, []);

  const onFinishForm = (data: any) => {
    if (!data.job_category) {
      return message.error("Select a job category");
    }
    onContinue(data);
  };

  return (
    <Form form={form} onFinish={onFinishForm} className="flex flex-col gap-y-4">
      <div>
        <div className="flex items-center px-2">
          <div className="w-6/12  px-2">
            <IInput
              required
              title="First name"
              name="first_name"
              label="Official first name"
              onChange={undefined}
            />
          </div>

          <div className="w-6/12 px-2">
            <IInput
              required
              title="Last name"
              name="last_name"
              label="Official first name"
              onChange={undefined}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center px-2">
          <div className="w-6/12  px-2">
            <IInput
              required
              title="Phone number"
              name="phone"
              label="Number recruiters can reach you on"
              onChange={undefined}
            />
          </div>

          <div className="w-6/12 px-2">
            <IInput
              required
              title="Email"
              name="email"
              label="Best email recruiters can reach you on"
              onChange={undefined}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center px-2">
          <div className="w-6/12  px-2">
            <IInput
              required
              title="Profession"
              name="profession"
              label="General profession (e.g) Software engineer"
              onChange={undefined}
            />
          </div>

          <div className="w-6/12 px-2">
            <IInput
              required
              name="location"
              title="Your location"
              label="(e.g) Lagos, Remote"
              onChange={undefined}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center px-2">
          <div className="w-6/12  px-2">
            <IInput
              required
              title="Age"
              name="age"
              label="(e.g) Official Age"
              onChange={undefined}
            />
          </div>

          <div className="w-6/12 px-2">
            <IInput
              required
              title="Hobbies"
              name="hobbies"
              label="List your hobbies, separated by comma"
              onChange={undefined}
            />
          </div>
        </div>

        <div className="flex items-center px-2 mt-4">
          <div className="w-6/12  px-2 flex flex-col gap-y-2 ">
            <span className="font-bold"> Job category </span>
            <FormItem name={"job_category"}>
              <Select
                className="w-full border h-12 rounded-lg "
                placeholder={"Select a job category"}
                options={Str.industryCategories.map((str) => {
                  return { label: str, value: str };
                })}
              />
            </FormItem>
          </div>

          <div className="w-6/12  px-2 flex flex-col gap-y-2  ">
            <IInput
              required
              title="Job description"
              name="job_description"
              label="E.g software engineer, UI/UX, HR"
              onChange={undefined}
            />
          </div>
        </div>
      </div>

      <div className="px-4">
        <ACButton
          text={"Continue"}
          type={"submit"}
          loading={false}
          children={undefined}
        />
      </div>
    </Form>
  );
};

export default BioInfo;
