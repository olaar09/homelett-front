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
  email: string;
  id: number;
  phone: string;
  platform: IPlatform;
  fullname: string;
  password: string;
  gpassword: string;
  gmail: string;
  status: string;
  sharing: any;
  admin_status: string;
  next_renewal: string;
  invite_link: string;
  extra_data: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

type DataIndex = keyof DataType;

const CredentialsTable: React.FC<{
  data: any[];
  actions: string[];
  title: string;
  onSelect: (key: string) => void;
}> = ({ data, onSelect, actions, title }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
  type Filters = Parameters<OnChange>[1];

  type GetSingle<T> = T extends (infer U)[] ? U : never;
  type Sorts = GetSingle<Parameters<OnChange>[2]>;

  const handleMenuClick = (e: any) => {
    onSelect(e.key);
  };

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
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      fixed: "left",
      width: "10%",
      render: (val) => <span> {moment(val).format("DD MMM YYYY HH:mm")}</span>,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user.fullname",
      render: (user) => <a>{user?.fullname}</a>,
      //  ...getColumnSearchProps("fullname"),
    },
    {
      title: "Phone",
      dataIndex: "user",
      key: "phone",
      render: (user) => <a>{user?.phone}</a>,
      //  ...getColumnSearchProps("phone"),
    },
    {
      title: "Bank name",
      dataIndex: "user",
      key: "bank",
      render: (user) => {
        return <a>{user?.bank?.bank_title}</a>;
      },
      //  ...getColumnSearchProps("phone"),
    },
    {
      title: "Account number",
      dataIndex: "user",
      key: "bank",
      render: (user) => <a>{user?.bank?.bank_account_number}</a>,
      //  ...getColumnSearchProps("phone"),
    },
    {
      title: "Account name",
      dataIndex: "user",
      key: "bank",
      render: (user) => <a>{user?.bank?.bank_account_name}</a>,
      //  ...getColumnSearchProps("phone"),
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "name",
      render: (platform) => {
        return (
          <div>
            {platform?.name} <Brands size="default" brands={[]} />
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
    },
    {
      title: "GPassword",
      dataIndex: "gpassword",
      key: "gpassword",
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
      title: "Admin Status",
      dataIndex: "admin_status",
      key: "admin_status",
      render: (status) => {
        const isApproved = status === "active";
        const isPending = "";
        const isRejected = status === "rejected";

        return (
          <Tag color={isApproved ? "green" : isRejected ? "volcano" : ""}>
            {status ?? "Pending"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Approved",
          value: "active",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => {
        if ((value as string) === "pending") {
          return !record.admin_status || record.admin_status?.length < 1;
        }
        return (record.admin_status ?? "").indexOf(value as string) === 0;
      },
    },
    {
      title: "Share Status",
      dataIndex: "sharing",
      key: "sharing",
      render: (sharing) => {
        return (
          <Tag color={sharing ? "green" : ""}>
            {sharing ? "Shared" : "Not shared"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Shared",
          value: "shared",
        },
        {
          text: "Not shared",
          value: "not_shared",
        },
      ],
      onFilter: (value, record) => {
        if ((value as string) === "shared") {
          return record.sharing != null;
        }
        return !record.sharing;
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (value, record) => {
        const items: any = actions.map((it) => {
          let color;
          if (it === "Approve") {
            color = "text-green-600";
          } else if (it === "Reject") {
            color = "text-red-600";
          } else if (it === "Revoke") {
            color = "text-red-600";
          }

          return {
            label: <span className={`${color}`}>{it}</span>,
            key: `${record.id}__${record.platform?.name}__${record.platform?.id}__${it}__${record?.email}`,
          };
        });
        return (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span className="text-banner"> Actions</span>
                <DownOutlined className="text-banner" />
              </Space>
            </a>
          </Dropdown>
        );
      },
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

export default CredentialsTable;
