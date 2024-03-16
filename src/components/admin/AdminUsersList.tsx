"use client";

import React from "react";

import { Col, Input, Row} from "antd";

import { useMemo, useState } from "react";

import adminUsersService from "../../services/admin/admin-users.service";

import { UserItem } from "./ui-elements/UserItem";

const AdminUsersList = () => {
  const [searchText, setSearchText] = useState("");
  let SearchedUsers = [];

  const { data } =
    adminUsersService.useUsersQuery(null);

  const users = useMemo(() => {
    return data === undefined ? [] : Object.values(data);
  }, [data]);

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
              <UserItem key = {post.id} post = {post} />
            )
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default AdminUsersList;
