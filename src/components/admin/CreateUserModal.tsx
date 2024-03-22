"use client";

import React from "react";

import { SetAddUserModal } from "../../store/slices/admin";

import { Modal, Button, Form, Input, Select } from "antd";
import adminUsersService from "../../services/admin/admin-users.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { roleOptions } from "../../configs/SelectPatern";

type DefaultValues = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
};

const CreateUserModal = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<DefaultValues>();

  const modalStatus = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const [AddUserTrigger] = adminUsersService.useCreateUserMutation();
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(SetAddUserModal({ status: false }));
  };

  const onSubmitAndDesign = (value: DefaultValues) => {
    AddUserTrigger({ body: value }).then(() => {
      form.resetFields();
      console.log(value);
    });
  };

  return (
    <Modal
      visible={modalStatus.modalAddUSerStatus}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <h2 style={{ textAlign: "center" }}>Create new User</h2>
      <div style={{ minWidth: "400px", maxWidth: "600px" }}>
        <Form onFinish={(value) => onSubmitAndDesign(value)} form={form}>
          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Please input first name!" }]}
            name="firstName"
          >
            <Input size="large" placeholder="First Name" type="text" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Please input last name!" }]}
            name="lastName"
          >
            <Input size="large" placeholder="Last Name" type="text" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Please input username!" }]}
            name="username"
          >
            <Input size="large" placeholder="UserName" type="text" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "16px", display: "block" }}
            rules={[{ required: true, message: "Please input password!" }]}
            name="password"
          >
            <Input.Password size="large" placeholder="Password" type="text" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please select role!" }]}
            name="role"
          >
            <Select size="large" placeholder="Role" options={roleOptions} />
          </Form.Item>

          <Form.Item className="w-full">
            <Button type="primary" htmlType="submit">
              Create new user
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default CreateUserModal;
