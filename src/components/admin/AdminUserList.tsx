"use client";

import React from "react";

import { Alert, Button, Col, Input, Row, Select, Typography } from "antd";

import { useEffect, useMemo, useState } from "react";

import {
  DeleteUser,
  SetUsersList,
  ChangeCurrentField,
} from "../../store/slices/admin-user-list";

import adminUsersService from "../../services/admin/admin-users.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";

type AlertInfo = {
  status: boolean;
  text: string;
  type: "error" | "warning" | "info" | "success" | undefined;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
}

const AdminUserList = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  let SearchedUsers = [];
  let users: Record<string, User> = useAppSelector((state) => {
    return state.adminUserList.userlist;
  });

  const alertProps: AlertInfo = {
    status: false,
    text: "",
    type: undefined,
  };

  const { refetch: updateUsersList } = adminUsersService.useUsersQuery("");
  const [deleteUserTriger, {}] = adminUsersService.useDeleteUserMutation();
  const [changeUserTriger, {}] = adminUsersService.useChangeUserMutation();

  useEffect(() => {
    updateUsersList()
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(SetUsersList(data));
      });
  }, []);
  const ChangeUserHandler = (
    e: React.MouseEvent<HTMLElement>,
    userBody: User
  ) => {
    e.preventDefault();
    changeUserTriger({
      id: userBody.id,
      body: userBody,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const DeleteUserHandler = (
    e: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    e.preventDefault();
    deleteUserTriger({ id: userId })
      .unwrap()
      .then(() => {
        alertProps.status = true;
        alertProps.type = "success";
        alertProps.text = "User is removed";
        dispatch(DeleteUser({ id: userId }));
      })
      .catch((data) => {
        alertProps.status = true;
        alertProps.type = "error";
        alertProps.text = "Error" + data;
        console.log(data);
      });
  };
  SearchedUsers = useMemo(() => {
    const Newposts = Object.values(users);
    return Newposts.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  return (
    <>
      {alertProps.status && (
        <Alert
          message={alertProps.text}
          type={alertProps.type}
          style={{ position: "fixed", top: 0, right: 0, zIndex: 50 }}
          onClose={(e) => {
            e.preventDefault();
            alertProps.status = false;
          }}
        />
      )}
      <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
        <h1>User List</h1>
        <div style={{ marginBottom: "16px" }}>
        <Input
            size="large"
            placeholder={searchText}
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          </div>
          <div>
          {SearchedUsers.map((post) => (
            <div
              key={post.id}
              item-id={post.id}
              className="task"
              style={{ marginBottom: "16px" }}
            >
              <Input
                id="firstName"
                size="large"
                onChange={(e) =>
                  dispatch(
                    ChangeCurrentField({
                      id: post.id,
                      value: e.target.value,
                      fieldname: "firstName",
                    })
                  )
                }
                value={post.firstName}
                placeholder="First Name"
                style={{ marginBottom: "16px" }}
              />

              <Input
                id="lastName"
                size="large"
                onChange={(e) =>
                  dispatch(
                    ChangeCurrentField({
                      id: post.id,
                      value: e.target.value,
                      fieldname: "lastName",
                    })
                  )
                }
                value={post.lastName}
                placeholder="Last Name"
                style={{ marginBottom: "16px" }}
              />

              <Input
                id="username"
                size="large"
                onChange={(e) =>
                  dispatch(
                    ChangeCurrentField({
                      id: post.id,
                      value: e.target.value,
                      fieldname: "username",
                    })
                  )
                }
                value={post.username}
                placeholder="Username"
                style={{ marginBottom: "16px" }}
              />

              <Input.Password
                id="password"
                size="large"
                onChange={(e) =>
                  dispatch(
                    ChangeCurrentField({
                      id: post.id,
                      value: e.target.value,
                      fieldname: "password",
                    })
                  )
                }
                value={post.password}
                placeholder="Password"
                style={{ marginBottom: "16px" }}
              />

              <div style={{ marginBottom: "16px" }}>
              <Typography.Title level={5}>Role</Typography.Title>
                <Select
                size="large"
                  id="countries"
                  value={post.role}
                  onChange={(value) =>
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value,
                        fieldname: "role",
                      })
                    )
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="WAITER">Waiter</Select.Option>
                  <Select.Option value="COOK">Cooker</Select.Option>
                  <Select.Option value="ADMIN">Admin</Select.Option>
                </Select>
              </div>

              <Button
                type="primary"
                onClick={(e) => {
                  ChangeUserHandler(e, post);
                }}
                style={{ marginRight: "8px" }}
              >
                CONFIRM
              </Button>
              <Button
                type="primary"
                danger
                onClick={(e) => {
                  DeleteUserHandler(e, post.id);
                }}
              >
                DELETE
              </Button>
            </div>
          ))}
          </div>
        </Col>
      </Row>
      </div>
    </>
  );
};
export default AdminUserList;
