import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Card, Input, Space, Table, TableProps, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";

interface DataType {
  key: string;
  email: string;
  id: number;
  phone: string;
  platform: string;
  fullname: string;
  password: string;
  gpassword: string;
  gmail: string;
  status: string;
  next_renewal: string;
}

type DataIndex = keyof DataType;

const SearchedTable: React.FC<{ data: any[] }> = ({ data }) => {
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
        .toString()
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
      title: "User",
      dataIndex: "user",
      key: "user.fullname",
      render: (user) => <a>{user.fullname}</a>,
      //  ...getColumnSearchProps("fullname"),
    },
    {
      title: "Phone",
      dataIndex: "user",
      key: "phone",
      render: (user) => <a>{user.phone}</a>,
      //  ...getColumnSearchProps("phone"),
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "name",
      render: (platform) => {
        const br = Str.platforms.find((pl) => pl.label == "Spotify Premium");

        console.log(br);

        return (
          <div>
            {platform.name} <Brands size="default" brands={[]} />
          </div>
        );
      },
      //  ...getColumnSearchProps("platform"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      ...getColumnSearchProps("email"),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",

      ...getColumnSearchProps("password"),
    },
    {
      title: "Gmail",
      dataIndex: "name",
      key: "name",

      ...getColumnSearchProps("gmail"),
    },
    {
      title: "GPassword",
      dataIndex: "name",
      key: "name",

      ...getColumnSearchProps("gpassword"),
    },
    {
      title: "Share Status",
      dataIndex: "sharing",
      key: "sharing",
      render: (sharing) => {
        return (
          <Tag color={sharing ? "green" : "volcano"}>
            {sharing ? "Shared" : "Pending"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Accepted",
          value: "accepted",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
    {
      title: "Share Status",
      dataIndex: "sharing",
      key: "sharing",
      render: (sharing) => {
        return (
          <Tag color={sharing ? "green" : "volcano"}>
            {sharing ? "Shared" : "Pending"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Accepted",
          value: "accepted",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  return (
    <Card title="Credential requests">
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

export default SearchedTable;
