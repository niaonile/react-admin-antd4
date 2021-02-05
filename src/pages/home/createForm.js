import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const CreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="新建招标"
            okText="保存"
            cancelText="取消"
            destroyOnClose={true}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.List name="users" initialValue={[{first: "", last: ""}]}>
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', position: 'relative' }} align="baseline">
                                        <Form.Item
                                            label={field.name === 0 ? "公司名称" : ""}
                                            {...field}
                                            name={[field.name, 'first']}
                                            fieldKey={[field.fieldKey, 'first']}
                                            rules={[{ required: true, message: 'Missing first name' }]}
                                        >
                                            <Input placeholder="First Name" />
                                        </Form.Item>
                                        {/* <Form.Item
                                            label={field.name === 0 ? " " : ""}
                                            {...field}
                                            required={false}
                                            name={[field.name, 'last']}
                                            fieldKey={[field.fieldKey, 'last']}
                                            rules={[{ required: true, message: 'Missing last name' }]}
                                        >
                                            <Input placeholder="Last Name" />
                                        </Form.Item> */}
                                        <div style={{ position: 'absolute', bottom: 28 }}>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </div>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }}
                </Form.List>
                <Form.Item name="description" label="描述">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateForm;