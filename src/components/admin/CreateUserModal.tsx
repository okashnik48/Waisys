"use client";

import React from "react";

import { SetFieldNewUser } from "../../store/slices/admin-user-list";

import { SetAddUserModal } from "../../store/slices/admin";

import { Modal, Input, Select, Button } from "antd";
import adminUsersService from "../../services/admin/admin-users.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";

interface NewUser {
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
}

const CreateUserModal = () => {
  const dispatch = useAppDispatch();
  let newUser: NewUser = useAppSelector((state) => {
    return state.adminUserList.newuser;
  });
  const modalStatus = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const hasEmptyField = () => {
    return Object.values(newUser).some((value) => !value);
  };
  const [AddUserTrigger] = adminUsersService.useCreateUserMutation();

  const AddNewUser = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasEmptyField()) {
      e.preventDefault();
      AddUserTrigger({ body: newUser })
    } else {
      alert("Some fields are empty");
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(SetAddUserModal({ status: false }));
  };

  const setFieldNewUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      SetFieldNewUser({
        value: e.target.value,
        fieldname: "firstName",
      })
    );
  };

  return (
    <Modal
      visible={modalStatus.modalAddUSerStatus}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <h2>Create new User</h2>
      <div style={{ minWidth: "400px", maxWidth: "600px" }}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            onChange={setFieldNewUserHandler}
            value={newUser.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Input
            id="lastName"
            onChange={(e) => {
              dispatch(
                SetFieldNewUser({
                  value: e.target.value,
                  fieldname: "lastName",
                })
              );
            }}
            value={newUser.lastName}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            onChange={(e) => {
              dispatch(
                SetFieldNewUser({
                  value: e.target.value,
                  fieldname: "username",
                })
              );
            }}
            value={newUser.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input.Password
            id="password"
            onChange={(e) => {
              dispatch(
                SetFieldNewUser({
                  value: e.target.value,
                  fieldname: "password",
                })
              );
            }}
            value={newUser.password}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <Select
            onChange={(value) => {
              dispatch(
                SetFieldNewUser({
                  value: value,
                  fieldname: "role",
                })
              );
            }}
            value={newUser.role}
          >
            <Select.Option value="WAITER">Waiter</Select.Option>
            <Select.Option value="COOK">Cooker</Select.Option>
            <Select.Option value="ADMIN">Admin</Select.Option>
          </Select>
        </div>
        <div className="w-full">
          <Button
            onClick={(e) => {
              e.preventDefault();
              AddNewUser(e);
            }}
          >
            Create new user
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateUserModal;
