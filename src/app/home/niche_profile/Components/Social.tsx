"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Drawer, Form, Input, Select, message } from "antd";
import { useState } from "react";
import ACButton from "@/app/components/Button";
import { v4 as uuidv4 } from "uuid";
import { UnControlledInput } from "./Form";

const Social = ({
  onContinue,
  existingData = [{ type: "", link: "", id: uuidv4() }],
}: {
  onContinue: any;
  existingData: any[];
}) => {
  const [academics, setAcademics] = useState(existingData);

  const onFinishForm = (_: any) => {
    for (const item of academics) {
      if (!item.link || !item.type) {
        message.error("Complete all fields or remove unused fields");
        return;
      }
    }

    onContinue(academics);
  };

  const onAddNew = () => {
    setAcademics([...academics, { type: "", link: "", id: uuidv4() }]);
  };

  const onRemove = (id: string) => {
    console.log("Last", academics[academics.length - 1].id);
    console.log("Removed", id);

    const removedAcademics = academics.filter((record) => record.id !== id);
    console.log(removedAcademics);

    setAcademics([...removedAcademics]);
  };

  const onChange = (key: "link" | "type", value: string, id: string) => {
    const cloned = [...academics];
    const index = academics.findIndex((record) => record.id === id);
    cloned[index][key] = value;

    console.log(cloned);

    setAcademics(cloned);
  };

  const getSkillType = (ac: any) =>
    academics.find((item) => item.id === ac.id)?.type;

  const getValueLabel = (ac: any) => {
    const type = getSkillType(ac);

    switch (type) {
      case "language":
        return "Yoruba, Swedish, German, English";
      case "skill":
        return "Yoruba, Swedish, German, English";

      default:
        return "";
    }
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
                  type="link"
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
                    title={"Platform"}
                    name={`type_${index}`}
                    label={"e.g Github, Dribble"}
                    value={academics.find((item) => item.id === ac.id)?.type}
                    onChange={(val: string) => onChange("type", val, ac.id)}
                  />
                </div>
                <div className="w-6/12  px-2">
                  <UnControlledInput
                    required
                    disabled={false}
                    title={"Link"}
                    name={`link_${index}`}
                    label={"e.g https://github.com/supercoder"}
                    value={academics.find((item) => item.id === ac.id)?.link}
                    onChange={(val: string) => onChange("link", val, ac.id)}
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

export default Social;
