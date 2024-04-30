"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer, Form, Input } from "antd";
import { useState } from "react";
import IInput from "./Form";
import ACButton from "@/app/components/Button";

const BioInfo = ({ onContinue }: { onContinue: any }) => {
  const onFinishForm = (data: any) => {
    onContinue(data);
  };

  return (
    <Form onFinish={onFinishForm} className="flex flex-col gap-y-12">
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
              name="niche"
              title="Job specialization"
              label="(e.g) React Frontend engineer"
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
