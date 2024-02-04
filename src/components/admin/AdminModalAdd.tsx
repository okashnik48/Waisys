"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { ListGroup } from "flowbite-react";
import { useEffect, useMemo, useState, useRef } from "react";

import { SetFieldNewUser } from "../../store/slices/admin-user-list";
import { SetTokens, SetUserProperties } from "../../store/slices/user";
import { useClickOutside } from "../../modules/useClickOutside";
import { SetAddUserModal} from "../../store/slices/admin"

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import adminUsersService from "../../services/admin/admin-users.service"
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";


interface User {
  accessToken: string,
  refreshToken: string,
  id: string,
  firstName: string,
  lastName: string,
  role: string,
  username: string
}

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
  let user: User = useAppSelector((state) => {
    return state.user.user;
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
    <Dialog open={modalStatus.modalAddUSerStatus} onClose={handleClose} maxWidth="md">
      <DialogTitle>Create new User</DialogTitle>
      <DialogContent>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create new User</h3>
          <div>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <TextField
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
              fullWidth
            />
          </div>
          <div>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <TextField
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
              fullWidth
            />
          </div>
          <div>
            <InputLabel htmlFor="username">Username</InputLabel>
            <TextField
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
              fullWidth
            />
          </div>
          <div>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
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
              fullWidth
            />
          </div>
          <div>
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              id="role"
              onChange={(event) => {
                dispatch(
                  SetFieldNewUser({
                    value: `${event.target.value}`,
                    fieldname: "role",
                  })
                );
              }}
              value={newUser.role}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <MenuItem value="WAITER">Waiter</MenuItem>
              <MenuItem value="COOK">Cooker</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
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
      </DialogContent>
    </Dialog>
  );
};
export default AdminModalAdd;
