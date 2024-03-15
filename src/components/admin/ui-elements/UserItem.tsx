import React from "react";
import AdminUsersTypes from "../../../store/types/admin-types/adminUsers-types";
import { Button, Typography } from "antd";
import adminUsersService from "../../../services/admin/admin-users.service";
import { SubmitHandler, useForm } from "react-hook-form";

import { CoreInput } from "../../../ui-kit/CoreInput";
import { CorePasswordInput } from "../../../ui-kit/CorePasswordInput";
import { CoreSelect } from "../../../ui-kit/CoreSelect";
import { roleOptions } from "../../../configs/SelectPatern";

type DefaultValues = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
};

type Props = {
  post: AdminUsersTypes.User;
};



export const UserItem = ({ post }: Props) => {
  const { control, handleSubmit, setValue } = useForm<DefaultValues>({
    defaultValues: {
      id: post.id,
      firstName: post.firstName,
      lastName: post.lastName,
      role: post.role,
      username: post.username,
      password: post.password,
    },
  });

  const [deleteUserTrigger] = adminUsersService.useDeleteUserMutation();
  const [changeUserTrigger] = adminUsersService.useChangeUserMutation();

  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
    changeUserTrigger({ id: formData.id, body: formData })
      .unwrap()
      .then(() => {
        setValue("password", "");
      });
  };

  const DeleteUserHandler = (
    e: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    e.preventDefault();
    deleteUserTrigger({ id: userId });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        key={post.id}
        item-id={post.id}
        className="task"
        style={{ marginBottom: "40px" }}
      >
        <div style={{ marginBottom: "16px" }}>
          <CoreInput
            name="firstName"
            size="large"
            control={control}
            label=""
            placeholder="First Name"
            type="text"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <CoreInput
            name="lastName"
            size="large"
            control={control}
            label=""
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <CoreInput
            name="username"
            size="large"
            control={control}
            label=""
            placeholder="UserName"
            type="text"
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
          />
        </div>
        <div style={{ marginBottom: "16px", display: "block" }}>
          <h3 style={{ display: "inline-block" }}>Role:</h3>
          <div style={{ display: "inline-block", marginLeft: "5px" }}>
            <CoreSelect
              name="role"
              size="large"
              control={control}
              placeholder="Role"
              options={roleOptions}
            />
          </div>
        </div>

        <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
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
    </form>
  );
};
