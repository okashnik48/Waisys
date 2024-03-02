import React from "react";

import { dishesReply } from "../../../services/posts.service";
import adminDishesService from "../../../services/admin/admin-dishes.service";

import { Select, Button, Image, Typography, SelectProps, Tag } from "antd";

import TagInput from "../../../ui-kit/TagInput";
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { CoreInput } from "../../../ui-kit/CoreInput";
type TagRender = SelectProps["tagRender"];

type DefaultValues = {
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Record<string, string>;
};

type Props = {
  post: dishesReply[0];
};

type TagSelectProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
};

function TagSelect<T extends FieldValues>({
  control,
  name,
}: TagSelectProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const { tagsList } = adminDishesService.useGetTagsQuery("", {
    selectFromResult: ({ data }) => ({
      tagsList: data
        ? Object.keys(data).map((tag) => ({
            value: data[tag],
            label: tag,
          }))
        : [],
    }),
  });
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const tagRender: TagRender = (params) => {
    return (
      //   <Tag
      //     onMouseDown={onPreventMouseDown}
      //     style={{ marginRight: 3 }}
      //     // color={params.value}
      //     // closable={params.closable}
      //     // onClose={params.onClose}
      //     // key={params.value}
      // 	{...params}
      //   >
      //     {params.label}
      //   </Tag>
      <div
        key={params.value}
        style={{
          backgroundColor: params.value,
        }}
      >
        {params.label}
      </div>
    );
  };

  return (
    <Select
      mode="multiple"
      id="countries"
      placeholder="Choose tag"
      tagRender={tagRender}
      style={{
        marginLeft: "10px",
        minWidth: "120px",
        display: "inline-block",
      }}
      dropdownStyle={{ width: "auto" }}
      onChange={(values, options) => {
        const selectedTags = (
          options as Array<{ value: string; label: string }>
        ).reduce((acc, option) => {
          acc[option.label] = option.value;
          return acc;
        }, {} as Record<string, string>);
        onChange(selectedTags);
      }}
      value={
        value
          ? Object.keys(value).map((tag) => ({
              value: value[tag],
              label: tag,
            }))
          : []
      }
      options={tagsList}
	  
      optionRender={(tag, index) => {
		console.debug(tag, index);
		console.debug(tag, index);
        return <div key={`${tag.label}_${index}`}>{tag.label}</div>;
      }}
    />
  );
}

function DishItem({ post }: Props) {
  const [deleteDishTrigger] = adminDishesService.useDeleteDishMutation();
  const [changeDishTrigger] = adminDishesService.useChangeDishMutation();

  const { control, handleSubmit, formState } = useForm<DefaultValues>({
    defaultValues: {
      description: post.description,
      image: post.image,
      name: post.name,
      price: post.price,
      tags: post.tags,
    },
  });

  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
    changeDishTrigger({ id: post.id, body: formData });
  };

  const onDelete = () => {
    deleteDishTrigger({ id: post.id });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <CoreInput
          control={control}
          label=""
          name="price"
          placeholder="Enter Price"
          size="large"
          type="number"
        />
        <Typography.Title level={5}>Description</Typography.Title>
        <CoreInput
          control={control}
          label=""
          name="description"
          placeholder="Enter Description"
          size="large"
          type="text"
        />

        <div>
          <div style={{ display: "block" }}>
            <Typography.Title level={5} style={{ display: "inline-block" }}>
              Tag
            </Typography.Title>
            <TagSelect control={control} name="tags" />
          </div>
          <TagInput />
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
    </form>
  );
}

export default React.memo(DishItem);
