"use client";

import React from "react";

import { SetFieldNewUser } from "../../store/slices/admin-user-list";

import { SetAddUserModal} from "../../store/slices/admin"

import { Modal, Input, Select, Button } from 'antd';
import adminUsersService from "../../services/admin/admin-users.service"
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";

interface NewUser {
  firstName: string,
  lastName: string,
  role: string,
  username: string,
  password: string,
}


const AdminModalAdd = () => {
  const dispatch = useAppDispatch();
  let newUser: NewUser = useAppSelector((state) => {
    return state.adminUserList.newuser;
  });
  let modalStatus = useAppSelector((state) =>{
    return state.admin.modalStatus
  })
  const hasEmptyField = () => {
    return Object.values(newUser).some((value) => !value);
  };
  const [AddUserTriger, {}] = adminUsersService.useCreateUserMutation();

  const AddNewUser = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasEmptyField()) {
      e.preventDefault();
              AddUserTriger({body: newUser}).unwrap().then((data) => {
                console.log(data);
              });
            }
    else {
      alert("Some fields are empty");
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(SetAddUserModal({ status: false }));
  };

  return (
<Modal
  visible={modalStatus.modalAddUSerStatus}
  onCancel={handleClose}
  footer={null}
  width="md"
>
  <h2>Create new User</h2>
  <div className="space-y-6">
    <div>
      <label htmlFor="firstName">First Name</label>
      <Input
        id="firstName"
        onChange={(e) => {
          dispatch(
            SetFieldNewUser({
              value: e.target.value,
              fieldname: "firstName",
            })
          );
        }}
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
      <Button onClick={(e) => {
        e.preventDefault();
        AddNewUser(e);
      }}>
        Create new user
      </Button>
    </div>
  </div>
</Modal>
  );
};
export default AdminModalAdd;
