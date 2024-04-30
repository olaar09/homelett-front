"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Drawer, Form, Input, Select, message } from "antd";
import { useState } from "react";
import ACButton from "@/app/components/Button";
import { v4 as uuidv4 } from "uuid";
import { UnControlledInput } from "./Form";

const Accomplishment = ({ onContinue }: { onContinue: any }) => {
  const [academics, setAcademics] = useState([
    { title: "", details: "", id: uuidv4() },
  ]);

  const onFinishForm = (data: any) => {
    for (const item of academics) {
      if (!item.details || !item.title) {
        message.error("Complete all fields or remove unused fields");
        return;
      }
    }

    onContinue(data);
  };

  const onAddNew = () => {
    setAcademics([...academics, { title: "", details: "", id: uuidv4() }]);
  };

  const onRemove = (id: string) => {
    console.log("Last", academics[academics.length - 1].id);
    console.log("Removed", id);

    const removedAcademics = academics.filter((record) => record.id !== id);
    console.log(removedAcademics);

    setAcademics([...removedAcademics]);
  };

  const onChange = (key: "details" | "title", value: string, id: string) => {
    const cloned = [...academics];
    const index = academics.findIndex((record) => record.id === id);
    cloned[index][key] = value;

    console.log(cloned);

    setAcademics(cloned);
  };

  return (
    <Form onFinish={onFinishForm} className=" gap-y-12">
      <div>
        <div className="flex flex-col items-center px-2">
          {academics.map((ac, index) => (
            <div
              key={ac.id}
              className="w-full flex flex-row border rounded-md mt-3 py-1 px-2 relative h-32"
            >
              {academics.length > 1 && (
                <Button
                  onClick={() => onRemove(ac.id)}
                  title="details"
                  className="absolute  -bottom-1 right-1 flex items-center gap-x-2"
                >
                  <span className="text-gray-600">Remove</span>
                  <Icon icon={"zondicons:minus-solid"} />
                </Button>
              )}

              <div className="w-full flex items-center">
                <div className="w-6/12  px-2">
                  <UnControlledInput
                    required
                    disabled={false}
                    title={"Title"}
                    name={`title_${index}`}
                    label={"e.g Math Hackathon, Open source project"}
                    value={academics.find((item) => item.id === ac.id)?.title}
                    onChange={(val: string) => onChange("title", val, ac.id)}
                  />
                </div>
                <div className="w-6/12  px-2">
                  <UnControlledInput
                    required
                    disabled={false}
                    title={"Details"}
                    name={`details_${index}`}
                    label={"Finished first in 20 seconds, 5 millions stars"}
                    value={academics.find((item) => item.id === ac.id)?.details}
                    onChange={(val: string) => onChange("details", val, ac.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={onAddNew}
        className="px-3 mt-6 cursor-pointer text-gray-700 hover:text-gray-900 duration-200 transition-all flex items-center gap-x-2"
      >
        <Icon icon={"mingcute:add-fill"} />
        <span className="">Add new skill </span>
      </div>

      <div className="px-4 mt-12">
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

export default Accomplishment;
