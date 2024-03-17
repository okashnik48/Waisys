import React from "react";

import DishesTypes from "../../../store/types/dishes-types";
import adminDishesService from "../../../services/admin/admin-dishes.service";

import { Button, Form, Image, Typography } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";

import TagInput from "../../../ui-kit/TagInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { CoreInput } from "../../../ui-kit/CoreInput";
import { TagSelect } from "../../../ui-kit/TagSelect";
import { CoreInputTextArea } from "../../../ui-kit/CoreInputTextAria";
import CorePriceInput from "../../../ui-kit/CorePriceInput";
import * as yup from "yup";

type DefaultValues = {
  name: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  image: string;
  tags: Record<string, string>;
};

type Props = {
  post: DishesTypes.Dish;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required("Description is required"),
  price: yup.object().shape({
    value: yup.number().required(),
    currency: yup.string().required(),
  }),
  tags: yup.object<Record<string, string>>().defined(),
  image: yup.string().defined(),
});

function DishItem({ post }: Props) {
  const [deleteDishTrigger] = adminDishesService.useDeleteDishMutation();
  const [changeDishTrigger] = adminDishesService.useChangeDishMutation();

  const { control, handleSubmit, formState, setValue, getValues } =
    useForm<DefaultValues>({
      defaultValues: {
        description: post.description,
        image: post.image,
        name: post.name,
        price: post.price,
        tags: post.tags,
      },
      resolver: yupResolver(schema),
    });
  console.debug("formState", formState.errors);

  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
    console.debug("formData", formData);
    changeDishTrigger({ id: post.id, body: formData });
  };

  const onDelete = () => {
    deleteDishTrigger({ id: post.id });
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image width={500} src={post.image} style={{ display: "block" }} />
      </div>
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <Typography.Title level={5}>Name</Typography.Title>
        <CoreInput
          control={control}
          label=""
          name="name"
          placeholder="Enter Name"
          size="large"
          type="text"
        />
        <Typography.Title level={5}>Price</Typography.Title>
        <CorePriceInput
          control={control}
          label=""
          name="price"
          placeholder="Enter Price"
          size="large"
          type="number"
        />
        <Typography.Title level={5}>Description</Typography.Title>
        <CoreInputTextArea
          control={control}
          label=""
          name="description"
          placeholder="Enter Description"
          size="large"
          type="text"
          // rules={[{ required: true, message: "Please input dish name!" }]}
        />

        <div>
          <div style={{ display: "block" }}>
            <Typography.Title level={5} style={{ display: "inline-block" }}>
              Tag
            </Typography.Title>
            <TagSelect control={control} name={"tags"} />
          </div>
          <TagInput SetTagValueForDish={setValue} GetTagsValues={getValues} />
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            htmlType="submit"
            disabled={!formState.isDirty}
            style={{
              backgroundColor: "rgba(0, 200, 0, 0.7)",
              marginRight: "10px",
            }}
          >
            Confirm
          </Button>
          <Button type="primary" danger onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default React.memo(DishItem);
