"use client";

import React from "react";

import { Button, Col, Input, Row, Select, Typography } from "antd";

import { useMemo, useState } from "react";

import adminUsersService from "../../services/admin/admin-users.service";
import { useAppDispatch } from "../../store/store-hooks";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
}

const AdminUsersList = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  let SearchedUsers = [];

  const { data, refetch: updateUsersList } =
    adminUsersService.useUsersQuery("");
  const [deleteUserTriger, {}] = adminUsersService.useDeleteUserMutation();
  const [changeUserTriger, {}] = adminUsersService.useChangeUserMutation();

  const users = useMemo(() => {
    return data === undefined ? [] : Object.values(data);
  }, [data]);

  const ChangeUserHandler = (
    e: React.MouseEvent<HTMLElement>,
    userBody: User
  ) => {
    e.preventDefault();
    changeUserTriger({
      id: userBody.id,
      body: userBody,
    });
  };
  const ChangeFieldUserHandler = (id: string, label: string, value: string) => {
    dispatch(
      adminUsersService.util.updateQueryData("users", "", (draftPost) => {
        draftPost[id][label] = value;
      })
    );
  };

  const DeleteUserHandler = (
    e: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    e.preventDefault();
    deleteUserTriger({ id: userId });
  };
  SearchedUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  return (
    <>
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
            {SearchedUsers.map((post, index) => (
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
                    ChangeFieldUserHandler(post.id, "firstName", e.target.value)
                  }
                  value={post.firstName}
                  placeholder="First Name"
                  style={{ marginBottom: "16px" }}
                />

                <Input
                  id="lastName"
                  size="large"
                  onChange={(e) =>
                    ChangeFieldUserHandler(post.id, "lastName", e.target.value)
                  }
                  value={post.lastName}
                  placeholder="Last Name"
                  style={{ marginBottom: "16px" }}
                />

                <Input
                  id="username"
                  size="large"
                  onChange={(e) =>
                    ChangeFieldUserHandler(post.id, "username", e.target.value)
                  }
                  value={post.username}
                  placeholder="Username"
                  style={{ marginBottom: "16px" }}
                />

                <Input.Password
                  id="password"
                  size="large"
                  onChange={(e) =>
                    ChangeFieldUserHandler(post.id, "password", e.target.value)
                  }
                  value={post.password}
                  placeholder="Password"
                />

                <div style={{ marginBottom: "16px" }}>
                  <Typography.Title level={5}>Role</Typography.Title>
                  <Select
                    size="large"
                    id="countries"
                    value={post.role}
                    onChange={(value) =>
                      ChangeFieldUserHandler(post.id, "role", value)
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
    </>
  );
};
export default AdminUsersList;
