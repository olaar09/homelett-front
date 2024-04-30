"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Drawer, Form, Input, Select, message } from "antd";
import { useState } from "react";
import ACButton from "@/app/components/Button";
import { v4 as uuidv4 } from "uuid";
import { UnControlledInput } from "./Form";

const Experiences = ({ onContinue }: { onContinue: any }) => {
  const [academics, setAcademics] = useState([
    {
      role: "",
      duration: "",
      id: uuidv4(),
      skills: "",
      description: "",
      company: "",
    },
  ]);

  const onFinishForm = (data: any) => {
    for (const item of academics) {
      if (!item.role || !item.description) {
        message.error("Complete all fields or remove unused fields");
        return;
      }
    }

    onContinue(data);
  };

  const onAddNew = () => {
    setAcademics([
      ...academics,
      {
        role: "",
        duration: "",
        id: uuidv4(),
        skills: "",
        description: "",
        company: "",
      },
    ]);
  };

  const onRemove = (id: string) => {
    console.log("Last", academics[academics.length - 1].id);
    console.log("Removed", id);

    const removedAcademics = academics.filter((record) => record.id !== id);
    console.log(removedAcademics);

    setAcademics([...removedAcademics]);
  };

  const onChange = (
    key: "role" | "description" | "duration" | "skills" | "company",
    value: string,
    id: string
  ) => {
    const cloned = [...academics];
    const index = academics.findIndex((record) => record.id === id);
    cloned[index][key] = value;

    console.log(cloned);

    setAcademics(cloned);
  };

  /*   const getSkillType = (ac: any) =>
    academics.find((item) => item.id === ac.id)?.skill_type;

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
  }; */

  return (
    <Form onFinish={onFinishForm} className=" gap-y-12">
      <div>
        <div className="flex flex-col items-center px-2">
          {academics.map((ac, index) => (
            <div
              key={ac.id}
              className="w-full flex flex-row border rounded-md mt-3 py-1 px-2 relative h-96"
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
              <div className="w-full flex flex-col gap-y-4 items-center">
                <div className="w-full flex ">
                  <div className="w-6/12  px-2 flex flex-col gap-y-2">
                    <UnControlledInput
                      required
                      disabled={false}
                      title={"Role title"}
                      name={`role_${index}`}
                      label={"What was your job title"}
                      value={academics.find((item) => item.id === ac.id)?.role}
                      onChange={(val: string) => onChange("role", val, ac.id)}
                    />
                  </div>
                  <div className="w-6/12  px-2">
                    <UnControlledInput
                      required
                      disabled={false}
                      title={"Duration"}
                      name={`role_${index}`}
                      label={"Feb 2021 -  June 2022"}
                      value={
                        academics.find((item) => item.id === ac.id)?.duration
                      }
                      onChange={(val: string) =>
                        onChange("duration", val, ac.id)
                      }
                    />
                  </div>
                </div>

                <div className="w-full flex items-center my-2">
                  <div className="w-6/12  px-2 flex flex-col gap-y-2">
                    <UnControlledInput
                      required
                      disabled={false}
                      title={"Skills"}
                      name={`role_${index}`}
                      label={"Excel, GSuite, ReactJS, etc"}
                      value={
                        academics.find((item) => item.id === ac.id)?.skills
                      }
                      onChange={(val: string) => onChange("skills", val, ac.id)}
                    />
                  </div>
                  <div className="w-6/12  px-2">
                    <UnControlledInput
                      required
                      disabled={false}
                      title={"Company name"}
                      name={`role_${index}`}
                      label={"Company name"}
                      value={
                        academics.find((item) => item.id === ac.id)?.company
                      }
                      onChange={(val: string) =>
                        onChange("company", val, ac.id)
                      }
                    />
                  </div>
                </div>

                <div className="w-full px-2">
                  <Input.TextArea
                    placeholder="Describe your role and what  you accomplished in this role. talk a little about the company too"
                    cols={10}
                    className="w-full"
                    rows={5}
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
        <span className="">Add new experience </span>
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

export default Experiences;
