"use client";

import "../../styles/Tailwind.css";

import React from "react";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import Alert from "@mui/material/Alert";

import { useAppDispatch, useAppSelector } from "../../App";
import {
  AddNewUser,
  DeleteUser,
  ChangeUser,
  SetUsersList,
  ChangeCurrentField,
} from "../Flowbite/redux/adminUserList";

import authService from "../../services/auth.service";
import adminUsersService from "../../services/admin/admin-users.service";

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
        alertProps.text = "User is removed"
        dispatch(DeleteUser({ id: userId }));
      })
      .catch((data) => {
        alertProps.status = true;
        alertProps.type = "error";
        alertProps.text = "Error" + data
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
          severity={alertProps.type}
          style={{ position: "fixed", top: 0, right: 0, zIndex: 50 }}
          onClose={(e) => {
            e.preventDefault()
            alertProps.status = false}}
        >
          {alertProps.text}
        </Alert>
      )}
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4, width: "60%" }}>
        <Box
          sx={{
            width: "75%",
            p: 4,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">User List</h2>

          <Box mb={4}>
            <TextField
              id="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              label="Search"
              fullWidth
              required
            />
          </Box>

          {SearchedUsers.map((post) => (
            <Box key={post.id} item-id={post.id} className="task">
              <TextField
                id="firstName"
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
                label="First Name"
                fullWidth
              />

              <TextField
                id="lastName"
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
                label="Last Name"
                fullWidth
              />

              <TextField
                id="username"
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
                label="Username"
                fullWidth
              />

              <TextField
                id="password"
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
                label="Password"
                fullWidth
                type="password"
              />

              <Box mb={4}>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <Select
                  id="countries"
                  value={post.role}
                  onChange={(e) =>
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value: e.target.value,
                        fieldname: "role",
                      })
                    )
                  }
                  className="input-field"
                >
                  <MenuItem value="WAITER">Waiter</MenuItem>
                  <MenuItem value="COOK">Cooker</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  ChangeUserHandler(e, post);
                }}
              >
                CONFIRM
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  DeleteUserHandler(e, post.id);
                }}
              >
                DELETE
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};
export default AdminUserList;
