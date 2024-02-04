"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { ListGroup } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";

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
  const [refreshTokenTriger, {}] = authService.useChangeAccessTokenMutation();
  const {
    refetch: updateUsersList,
  } = adminUsersService.useUsersQuery("");
  const [deleteUserTriger, {}] = adminUsersService.useDeleteUserMutation();
  const [changeUserTriger, {}] = adminUsersService.useChangeUserMutation();

  useEffect(() => {
    updateUsersList()
      .unwrap()
      .then((data) => {
          console.log(data)
          dispatch(SetUsersList(data));
        
      });
  }, []);
  const ChangeUserHandler = (e: React.MouseEvent<HTMLElement>, userBody: User) => {
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

  const DeleteUserHandler = (e: React.MouseEvent<HTMLElement>, userId: string) => {
    e.preventDefault();
    deleteUserTriger({ id: userId })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
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
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full sm:w-3/4 md:w-1/2 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">User List</h2>

          <div className="mb-4">
            <TextInput
              id="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              required
              className="input-field"
            />
          </div>

          {SearchedUsers.map((post, index) => {
            let IsfirstNameOnClick = false;
            let IslastNameOnClick = false;
            let IsusernameOnClick = false;
            let IspasswordOnClick = false;

            return (
              <div className="task" key={post.id} item-id={post.id}>
                <TextInput
                  id="firstName"
                  onChange={(e) => {
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value: e.target.value,
                        fieldname: "firstName",
                      })
                    );
                  }}
                  value={post.firstName}
                  className={`input-field ${
                    !IsfirstNameOnClick ? "opacity-50" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    IsfirstNameOnClick = true;
                  }}
                />

                <TextInput
                  id="lastName"
                  onChange={(e) => {
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value: e.target.value,
                        fieldname: "lastName",
                      })
                    );
                  }}
                  value={post.lastName}
                  className={`input-field ${
                    !IslastNameOnClick ? "opacity-50" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    IslastNameOnClick = true;
                  }}
                />

                <TextInput
                  id="username"
                  onChange={(e) => {
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value: e.target.value,
                        fieldname: "username",
                      })
                    );
                  }}
                  value={post.username}
                  className={`input-field ${
                    !IsusernameOnClick ? "opacity-50" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    IsusernameOnClick = true;
                  }}
                />

                <TextInput
                  id="password"
                  onChange={(e) => {
                    dispatch(
                      ChangeCurrentField({
                        id: post.id,
                        value: e.target.value,
                        fieldname: "password",
                      })
                    );
                  }}
                  value={post.password}
                  className={`input-field ${
                    !IspasswordOnClick ? "opacity-50" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    IspasswordOnClick = true;
                  }}
                />

                <div className="mb-4">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
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
                    <option value="WAITER">Waiter</option>
                    <option value="COOK">Cooker</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <button
                  onClick={(e) => {
                    ChangeUserHandler(e, post);
                  }}
                >
                  CONFIRM
                </button>
                <button
                  onClick={(e) => {
                    DeleteUserHandler(e, post.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AdminUserList;
