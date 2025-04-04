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
      <h2 style={{ textAlign: "center" }}>Створити нового користувача</h2>
      <div style={{ minWidth: "400px", maxWidth: "600px" }}>
        <Form onFinish={(value) => onSubmitAndDesign(value)} form={form}>
          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Введіть Ім'я" }]}
            name="firstName"
          >
            <Input size="large" placeholder="Ім'я" type="text" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Введіть прізвище" }]}
            name="lastName"
          >
            <Input size="large" placeholder="Прізвище" type="text" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "16px" }}
            rules={[{ required: true, message: "Введіть логін" }]}
            name="username"
          >
            <Input size="large" placeholder="Логін" type="text" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "16px", display: "block" }}
            rules={[{ required: true, message: "Введіть пароль!" }]}
            name="password"
          >
            <Input.Password size="large" placeholder="Пароль" type="text" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Виберіть роль!" }]}
            name="role"
          >
            <Select size="large" placeholder="Роль" options={roleOptions} />
          </Form.Item>

          <Form.Item className="w-full">
            <Button type="primary" htmlType="submit">
              Створити користувача
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default CreateUserModal;
