import React, { FC } from "react";

import { Button, Space, ColorPicker, Form } from "antd";
import {
  Control,
  FieldValues,
  Path,
  useController,
  useForm,
} from "react-hook-form";
import adminDishesService from "../services/admin/admin-dishes.service";
import { useAppDispatch } from "../store/store-hooks";
import postService from "../services/posts.service";
import { CoreInput } from "./CoreInput";

import { AddTagNewDish } from "../store/slices/admin";

type DefaultValues = {
  color: string;
  name: string;
  type: string;
};

type Props<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T, any>;
};

function ControlledColorPicker<T extends FieldValues>({
  control,
  name,
}: Props<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <ColorPicker
      style={{
        display: "inline-block",
        marginLeft: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...field}
      onChange={(color) => field.onChange(`#${color.toHex()}`)}
    />
  );
}

const TagInput: FC<{ index?: number; type?: string }> = ({ index, type }) => {
  const { handleSubmit, setValue, control } = useForm<DefaultValues>({
    defaultValues: {
      name: "",
      color: "#2B84DB",
    },
  });
  const dispatch = useAppDispatch();
  const [AddTagTrigger] = adminDishesService.useAddTagMutation();
  const onSubmit = (data: DefaultValues) => {
      if (index !== undefined) {
        console.log(index);
        dispatch(
          postService.util.updateQueryData("dishes", "", (draftPost) => {
            draftPost[index]["tags"] = {
              ...draftPost[index]["tags"],
              [data.name]: data.color,
            };
          })
        );
      }
      else if (type === "New-Dish-Tag") {
        dispatch(AddTagNewDish({ [data.name]: data.color }));
      }
      else {
        AddTagTrigger(data)
      }
      setValue("name", "");
      setValue("color", "#2B84DB");
  };
  return (
    <Form
      onFinish={handleSubmit(onSubmit, (error) => {
        console.log("error", error);
      })}
    >
      <Space>
        <div style={{ width: "150px" }}>
          <CoreInput
            control={control}
            label=""
            name="name"
            type="text"
            rules={{ required: "Tag name is required" }}
            size="large"
            placeholder="New tag"
          />
        </div>
        <ControlledColorPicker control={control} name="color" />
        <Button
          type="primary"
          htmlType="submit"
          disabled={false}
          style={{ marginLeft: "5px" }}
        >
          Add
        </Button>
      </Space>
    </Form>
  );
};

export default TagInput;
