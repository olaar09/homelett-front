import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import APIUtil from '@/services/APIUtil';

interface DeductUserModalProps {
    visible: boolean;
    onClose: () => void;
}

const DeductUserModal: React.FC<DeductUserModalProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const apiUtil = new APIUtil()

    const handleFinish = async (values: { email: string; amount: number }) => {
        const requestBody = { refunds: [values] }

        setLoading(true);
        try {
            const response = await apiUtil.profileService.deductMoney(requestBody)
            message.success('Deduct User processed successfully');
        } catch (error) {
            message.error('Network error');
        } finally {
            setLoading(false);
            form.resetFields();
            onClose();
        }
    };

    return (
        <Modal
            open={visible}
            title="Process refund (DEDUCT MONEY FROM USER WALLET)"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" className='bg-primary' loading={loading} onClick={() => form.submit()}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish} className='w-full'>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount"
                    className='w-full'
                    rules={[{ required: true, message: 'Please enter the DeductUser amount' }]}
                >
                    <InputNumber className='w-full' min={1} />
                </Form.Item>

                <Form.Item
                    name="reason"
                    label="Reason"
                    className='w-full'
                    rules={[{ required: true, message: 'Please enter the deduct reason' }]}
                >
                    <InputNumber className='w-full' min={1} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DeductUserModal;
