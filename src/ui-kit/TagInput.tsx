import React, { FC, useMemo, useState } from "react";

import {
  Modal,
  Input,
  Select,
  Button,
  SelectProps,
  Space,
  ColorPicker,
  Tag,
  Form,
} from "antd";
import { useForm } from "react-hook-form";
import adminDishesService from "../services/admin/admin-dishes.service";
import { useAppDispatch } from "../store/store-hooks";
import postService from "../services/posts.service";
import { CustomInput } from "./CustomInput";

type DefaultValues = {
  color: string;
  name: string;
};

const TagInput: FC<{ index?: number }> = ({ index }) => {
  console.log(index);
  const { register, handleSubmit, setValue, control } = useForm<DefaultValues>({
    defaultValues: {
      name: "",
      color: "#2B84DB",
    },
  });
  const dispatch = useAppDispatch();
  const [AddTagTrigger] = adminDishesService.useAddTagMutation();
  const onSubmit = (data: DefaultValues) => {
    AddTagTrigger(data).then(() => {
      if (index !== undefined) {
        dispatch(
          postService.util.updateQueryData("dishes", "", (draftPost) => {
            draftPost[index]["tags"] = {
              ...draftPost[index]["tags"],
              [data.name]: data.color,
            };
          })
        );
      }
      setValue("name", "");
      setValue("color", "#2B84DB");
    });
  };
  return (
    <Form
      onFinish={handleSubmit(onSubmit, (error) => {
        console.log("error", error);
      })}
    >
      <Space>
        <CustomInput
          style={{ width: "100px" }}
          control={control}
          label=""
          name="name"
          type="text"
          rules={{ required: "Tag name is required" }}
          size="large"
          placeholder="New tag"
        />
        <ColorPicker
          style={{
            display: "inline-block",
            marginLeft: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
          {...register("color")}
          onChange={(color) => setValue("color", `#${color.toHex()}`)}
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={false}
          style={{ marginLeft: "5px" }}
        >
          add
        </Button>
      </Space>
    </Form>
  );
};

export default TagInput;
