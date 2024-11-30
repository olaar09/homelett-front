import React, { useState } from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import { UserOutlined, HomeOutlined, MailOutlined, PhoneOutlined, DollarOutlined, BankOutlined } from '@ant-design/icons';
import APIUtil from '@/services/APIUtil';
import { AxiosError } from 'axios';

interface NewHouseDrawerProps {
    visible: boolean;
    onClose: (reload: boolean) => void;
}

const NewHouseDrawer: React.FC<NewHouseDrawerProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const apiUtil = new APIUtil();


    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await apiUtil.houseService.addHouse(values);
            onClose(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error?.response?.data?.reason);
                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to complete request"
                    }`
                );
            } else {
                message.error("Unable to complete request");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Add New House"
            placement="bottom"
            onClose={() => onClose(false)}
            height={900}
            open={visible}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ padding: '20px' }}
            >
                <Form.Item
                    name="house_name"
                    label="House Name"
                    rules={[{ required: true, message: 'Please enter the house name' }]}
                >
                    <Input prefix={<HomeOutlined />} placeholder="Enter house name" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter the address' }]}
                >
                    <Input prefix={<HomeOutlined />} placeholder="Enter address" />
                </Form.Item>
                <Form.Item
                    name="contact_email"
                    label="Email Notification"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="contact_phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item
                    name="token_per_kw"
                    label="Token Amount"
                    rules={[{ required: true, message: 'Please enter the token amount' }]}
                >
                    <Input prefix={<DollarOutlined />} type="number" placeholder="Enter token amount" />
                </Form.Item>
                <Form.Item
                    name="contact_person_name"
                    label="Contact Person Name"
                    rules={[{ required: true, message: 'Please enter the contact person name' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Enter contact person name" />
                </Form.Item>
                <Form.Item
                    name="bank_name"
                    label="Bank Name"
                    rules={[{ required: true, message: 'Please enter the bank name' }]}
                >
                    <Input prefix={<BankOutlined />} placeholder="Enter bank name" />
                </Form.Item>
                <Form.Item
                    name="account_name"
                    label="Account Name"
                    rules={[{ required: true, message: 'Please enter the account name' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Enter account name" />
                </Form.Item>
                <Form.Item
                    name="bank_account"
                    label="Bank Account number"
                    rules={[{ required: true, message: 'Please enter the bank account' }]}
                >
                    <Input prefix={<BankOutlined />} placeholder="Enter bank account" />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default NewHouseDrawer; 