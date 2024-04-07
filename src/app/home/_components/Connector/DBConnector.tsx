import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import React, { useState } from "react";

interface DBConnectorProps {
  loading: boolean;
  onSubmit: ({
    dataSourceName,
    dataSourceConnection,
  }: {
    dataSourceName: string;
    dataSourceConnection: string;
  }) => void;
}

const DBConnect: React.FC<DBConnectorProps> = ({ onSubmit, loading }) => {
  const [dataSourceName, setDataSourceName] = useState<string>("");
  const [dataSourceConnection, setdatasourceConnection] = useState<string>("");

  return (
    <div className="flex flex-col gap-y-10 h-full items-center pt-10 w-11/12 mx-auto">
      <InputField
        placeHolder={"Connection name"}
        type={"text"}
        value={dataSourceName}
        name={"connection_name"}
        onChange={(e) => setDataSourceName(e.target.value)}
      />
      <InputField
        placeHolder={"Connection string"}
        type={"text"}
        value={dataSourceConnection}
        name={"connection_url"}
        onChange={(e) => setdatasourceConnection(e.target.value)}
      />
      <div className="w-7/12 mx-auto ">
        <ACButton
          onClick={() => onSubmit({ dataSourceName, dataSourceConnection })}
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
