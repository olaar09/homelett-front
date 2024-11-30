"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Statistic, Table, Tag, message, Spin, Row, Col } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { useRouter } from "next/navigation";
import CredentialsTable from "../_components/CredentialsTable";
import RejectCredentialModal from "./CredentialRejectModal";
import DashboardTable from "../_components/DashboardTable";
import { HomeOutlined, UserOutlined, BankOutlined, DollarOutlined } from "@ant-design/icons";
const { Meta } = Card;

const DashboardSummary = () => {
  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const getDashboardSummary = async (): Promise<any> => {
    try {
      const data = await apiUtil.dashboardService.getDashboard();
      console.log(data);
      return data;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const {
    data: dashboardSummary,
    error,
    loading: loadingDashboardSummary,
    refresh: refreshDashboardSummary,
  } = useRequest(() => getDashboardSummary(), {
    ready: currentAuth.currentUser != null && currentAuth.currentUser != undefined,
  });

  if (loadingDashboardSummary) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <span className="mb-6">Dashboard Overview</span>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Houses"
              value={dashboardSummary?.total_houses}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Residents"
              value={dashboardSummary?.total_residents}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Monthly Transactions"
              value={dashboardSummary?.total_month_transactions}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Monthly Revenue"
              value={dashboardSummary?.total_month_transactions_amount}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Houses Table */}
      <Card bordered={false} title="Houses Overview" className="mb-6">
        <Table
          columns={[
            {
              title: 'House Code',
              dataIndex: 'house_code',
              key: 'house_code',
            },
            {
              title: 'House Name',
              dataIndex: 'house_name',
              key: 'house_name',
            },
            {
              title: 'Contact Person',
              dataIndex: 'contact_person_name',
              key: 'contact_person_name',
            },
            {
              title: 'Contact Phone',
              dataIndex: 'contact_phone',
              key: 'contact_phone',
            },
            {
              title: 'Expected Usage',
              dataIndex: 'expected_usage',
              key: 'expected_usage',
              render: (usage: number) => `${usage} kW`,
            },
            {
              title: 'Token Rate',
              dataIndex: 'token_per_kw',
              key: 'token_per_kw',
              render: (rate: number) => `₦${rate}/kW`,
            }
          ]}
          dataSource={dashboardSummary?.house_list}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Monthly Transactions Card */}
      <Card bordered={false} title="Monthly Overview" className="mb-6">
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Total Transactions"
              value={dashboardSummary?.total_month_transactions}
              prefix={<BankOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Amount"
              value={dashboardSummary?.total_month_transactions_amount}
              prefix="₦"
              precision={2}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardSummary;
