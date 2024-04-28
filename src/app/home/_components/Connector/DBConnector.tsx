import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import React, { useEffect, useState } from "react";

interface DBConnectorProps {
  loading: boolean;
  defaultPayload: {
    datasource_name: string;
    email: string;
    password: string;
  };
  type: string;
  onSubmit: ({
    password,
    email,
    datasource_name,
  }: {
    datasource_name: string;
    email: string;
    password: string;
  }) => void;
}

const DBConnect: React.FC<DBConnectorProps> = ({
  onSubmit,
  loading,
  defaultPayload,
  type,
}) => {
  const [dataSourceName, setDataSourceName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setDataSourceName(defaultPayload?.email);
    setEmail(defaultPayload?.email);
  }, [defaultPayload]);

  return (
    <div className="flex flex-col gap-y-10 h-full items-center pt-10 w-11/12 mx-auto">
      <div className="flex flex-col w-full">
        <span className=" text-foreground">Connection name</span>
        <InputField
          placeHolder={"Connection name"}
          type={"text"}
          value={dataSourceName}
          name={"connection_name"}
          onChange={(e) => setDataSourceName(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full">
        <span className=" text-foreground">{type} Email</span>
        <InputField
          placeHolder={""}
          type={"text"}
          value={email}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full">
        <span className=" text-foreground">{type} Password</span>
        <InputField
          placeHolder={""}
          type={"password"}
          value={password}
          name={"email"}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-7/12 mx-auto ">
        <ACButton
          onClick={() =>
            onSubmit({
              datasource_name: dataSourceName,
              email: email,
              password: password,
            })
          }
          text={"Continue"}
          type={"button"}
          loading={loading}
          children={undefined}
        ></ACButton>
      </div>
    </div>
  );
};

export default DBConnect;
