import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DownOutlined } from "@ant-design/icons";

import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { IPlatform } from "@/app/interfaces/IProduct";
import moment from "moment";

interface DataType {
  key: string;
  credential_email: string;
  id: number;
  fullname: string;
  credential_password: string;
  invite_link: string;
}

type DataIndex = keyof DataType;

const PlatformSubTable: React.FC<{
  data: any[];
  title: string;
}> = ({ data, title }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
  type Filters = Parameters<OnChange>[1];

  type GetSingle<T> = T extends (infer U)[] ? U : never;
  type Sorts = GetSingle<Parameters<OnChange>[2]>;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: "5%",
    },
    {
      title: "Credential Email",
      dataIndex: "credential_email",
      key: "credential_email",

      ...getColumnSearchProps("credential_email"),
    },
    {
      title: "Credential Password",
      dataIndex: "credential_email",
      key: "credential_email",
    },

    {
      title: "Invite link",
      dataIndex: "invite_link",
      key: "invite_link",
      ...getColumnSearchProps("invite_link"),
    },
    {
      title: "Extra data",
      dataIndex: "extra_data",
      key: "extra_data",
    },
    {
      title: "User's Fullname",
      dataIndex: "user_fullname",
      key: "user_fullname",
    },
    {
      title: "User email",
      dataIndex: "user_email",
      key: "user_email",
    },
  ];

  return (
    <Card title={title}>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-6"
        scroll={{ x: 1500 }}
        bordered
        size="small"
        rowClassName={() => "text-xs p-0 m-0  overflow-clip text-ellipsis"}
      />
    </Card>
  );
};

export default PlatformSubTable;
