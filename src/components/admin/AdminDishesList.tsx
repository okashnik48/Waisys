"use client";

import React from "react";

import { useEffect, useMemo, useState } from "react";

import {
  AddNewPost,
  RemovePost,
  SetFieldForChangedDish,
  ChangeDish,
} from "../../store/slices/admin";

import postService from "../../services/posts.service";
import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";

import {
  Input,
  Select,
  Button,
  Image,
  Typography,
  SelectProps,
  ColorPicker,
  Space,
  Tag,
} from "antd";
import { time } from "console";
import TagInput from "../../ui-kit/TagInput";

type DishTag = {
  value: string;
  color: string;
};

type DishTags = Record<string, DishTag>;
interface Post {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Record<string, string>;
}
type TagRender = SelectProps["tagRender"];

const AdminDishesList = () => {
  const dispatch = useAppDispatch();
  const { data: dishesListReply } = postService.useDishesQuery("");
  const [deleteDishTriger] = adminDishesService.useDeleteDishMutation();
  const [changeDishTriger] = adminDishesService.useChangeDishMutation();
  const { tagsProps } = adminDishesService.useGetTagsQuery("", {
    selectFromResult: ({ data }) => ({
      tagsProps: data
        ? Object.keys(data).map((tag) => ({
            value: data[tag],
            label: tag,
          }))
        : [],
    }),
  });
  const dishesList = useMemo(() =>{
    return dishesListReply
    ? dishesListReply
    : []}, [dishesListReply])

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const ChangeFieldDish = (index: number, label: string, value: string) => {
    dispatch(
      postService.util.updateQueryData("dishes", "", (draftPost) => {
        draftPost[index][label] = value;  
      })
    );
  };

  const [searchText, setSearchText] = useState("");

  const DeleteDish = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    itemId: string
  ) => {
    deleteDishTriger({ id: itemId });
  };

  const ChangeCurrentDish = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    itemId: string,
    index: number
  ) => {
    console.log(dishesList);
    changeDishTriger({ id: itemId, body: dishesList[index] });
  };


  const SearchedPosts = useMemo(
    () =>
      Object.values(dishesList).filter((Dish) =>
        Dish.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, dishesList]
  );

  return (
    <div
      style={{
        width: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Menu</h1>
      <Input
        size="large"
        placeholder={searchText}
        style={{ marginBottom: "10px" }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {SearchedPosts.map((post, index) => (
        <div
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
            <Input
              id="Name"
              size="large"
              onChange={(e) => ChangeFieldDish(index, "name", e.target.value)}
              value={post.name}
            />
            <Typography.Title level={5}>Price</Typography.Title>
            <Input
              id="Price"
              size="large"
              onChange={(e) => ChangeFieldDish(index, "price", e.target.value)}
              value={String(post.price)}
            />
            <Typography.Title level={5}>Description</Typography.Title>
            <Input.TextArea
              id="Description"
              size="large"
              onChange={(e) =>
                ChangeFieldDish(index, "description", e.target.value)
              }
              value={post.description}
              autoSize
            />

            <div>
              <div style={{ display: "block" }}>
                <Typography.Title level={5} style={{ display: "inline-block" }}>
                  Tag
                </Typography.Title>
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
                    const selectedTags = options.reduce((acc, option) => {
                      acc[option.label] = option.value;
                      return acc;
                    }, {});
                    ChangeFieldDish(index, "tags", selectedTags);
                  }}
                  value={
                    post.tags
                      ? Object.keys(post.tags).map((tag) => ({
                          value: post.tags[tag],
                          label: tag,
                        }))
                      : []
                  }
                  options={tagsProps}
                />
              </div>
              <TagInput index={index}/>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                style={{
                  backgroundColor: "rgba(0, 200, 0, 0.7)",
                  marginRight: "10px",
                }}
                onClick={(e) => ChangeCurrentDish(e, post.id, index)}
              >
                Confirm
              </Button>
              <Button
                type="primary"
                danger
                onClick={(e) => DeleteDish(e, post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdminDishesList;
