"use client";

import React from "react";

import { SetAddUserModal } from "../../store/slices/admin";

import { Modal, Button, Form } from "antd";
import adminUsersService from "../../services/admin/admin-users.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { roleOptions } from "../../configs/SelectPatern";
import { CoreSelect } from "../../ui-kit/CoreSelect";
import { CorePasswordInput } from "../../ui-kit/CorePasswordInput";
import { CoreInputRequired } from "../../ui-kit/CoreInputRequired";
type DefaultValues = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
};

const NewUserProps = {
  firstName: "",
  lastName: "",
  role: "",
  username: "",
  password: "",
};

const CreateUserModal = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm<DefaultValues>({
    defaultValues: NewUserProps,
  });
  const modalStatus = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const [AddUserTrigger] = adminUsersService.useCreateUserMutation();

  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
    AddUserTrigger({ body: formData }).then(() => {
      reset(NewUserProps);
      console.log(formData)
    });
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(SetAddUserModal({ status: false }));
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
        <Form onFinish={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "16px" }}>
            <CoreInputRequired
              name="firstName"
              size="large"
              control={control}
              label=""
              placeholder="First Name"
              type="text"
              rules={[{ required: true, message: "Please input first name!" }]}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <CoreInputRequired
              name="lastName"
              size="large"
              control={control}
              label=""
              placeholder="Last Name"
              type="text"
              rules={[{ required: true, message: "Please input last name!" }]}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <CoreInputRequired
              name="username"
              size="large"
              control={control}
              label=""
              placeholder="UserName"
              type="text"
              rules={[{ required: true, message: "Please input username!" }]}
            />
          </div>
          <div style={{ marginBottom: "16px", display: "block" }}>
            <CorePasswordInput
              name="password"
              size="large"
              control={control}
              label=""
              placeholder="Password"
              type="text"
              rules={[{ required: true, message: "Please input password!" }]}
            />
          </div>
          <div >
              <CoreSelect
                name="role"
                size="large"
                control={control}
                placeholder="Role"
                options={roleOptions}
                rules={[{ required: true, message: "Please select role!" }]}
              />
          </div>

          <div className="w-full">
            <Button type="primary" htmlType="submit">
              Create new user
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
export default CreateUserModal;
