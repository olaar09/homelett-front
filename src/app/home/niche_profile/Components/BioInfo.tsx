"use client";

import { Drawer, Form, Input } from "antd";
import { useEffect, useState } from "react";
import IInput from "./Form";
import ACButton from "@/app/components/Button";

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
