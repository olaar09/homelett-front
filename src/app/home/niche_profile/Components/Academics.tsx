"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Drawer, Form, Input, message } from "antd";
import { useState } from "react";
import ACButton from "@/app/components/Button";
import { v4 as uuidv4 } from "uuid";
import { UnControlledInput } from "./Form";

const AcademicInfo = ({
  onContinue,
  existingData = [{ institution: "", award: "", id: uuidv4() }],
}: {
  onContinue: any;
  existingData: any[];
}) => {
  const [allData, setAllData] = useState(existingData);

  const onFinishForm = (_: any) => {
    onContinue(allData);
  };

  const onAddNew = () => {
    setAllData([...allData, { institution: "", award: "", id: uuidv4() }]);
  };

  const onRemove = (id: string) => {
    if (allData.length < 2) {
      return;
    }

    const removedallData = allData.filter((record) => record.id !== id);
    console.log(removedallData);

    setAllData([...removedallData]);
  };

  const onChange = (
    key: "institution" | "award",
    value: string,
    id: string
  ) => {
    const cloned = [...allData];
    const index = allData.findIndex((record) => record.id === id);
    cloned[index][key] = value;

    console.log(cloned);

    setAllData(cloned);
  };

  return (
    <Form onFinish={onFinishForm} className=" gap-y-12">
      <div>
        <div className="flex flex-col items-center px-2">
          {allData.map((ac, index) => (
            <div
              key={ac.id}
              className="w-full flex flex-row border rounded-md mt-3 py-3 px-2 relative h-32"
            >
              {allData.length > 1 && (
                <Button
                  onClick={() => onRemove(ac.id)}
                  type="link"
                  className="absolute bottom-0 right-1 flex items-center gap-x-2"
                >
                  <span className="text-gray-600">Remove</span>
                  <Icon icon={"zondicons:minus-solid"} />
                </Button>
              )}
              <div className="w-6/12  px-2">
                <UnControlledInput
                  required
                  title="Institution name"
                  name={`institution_${index}`}
                  label="Name of the school or organization"
                  value={allData.find((item) => item.id === ac.id)?.institution}
                  onChange={(val: string) =>
                    onChange("institution", val, ac.id)
                  }
                  disabled={false}
                />
              </div>
              <div className="w-6/12 px-2">
                <UnControlledInput
                  required
                  title="Award"
                  name={`award_${index}`}
                  value={allData.find((item) => item.id === ac.id)?.award}
                  label="Award you received, such as MSC or BSC"
                  onChange={(val: string) => onChange("award", val, ac.id)}
                  disabled={false}
                />
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
        <span className="">Add new academic </span>
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

export default AcademicInfo;
