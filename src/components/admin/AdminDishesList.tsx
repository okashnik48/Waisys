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
type CustomTag = Record<string, { label: string; value: string }>;
type TagRender = SelectProps["tagRender"];

const AdminDishesList = () => {
  let posts: Record<string, Post> = useAppSelector((state) => {
    return state.admin.posts;
  });
  const dispatch = useAppDispatch();
  const { refetch: updateDishesList } = postService.useDishesQuery("");
  const [deleteDishTriger] = adminDishesService.useDeleteDishMutation();
  const [changeDishTriger] = adminDishesService.useChangeDishMutation();
  const { data: tagsProps } = adminDishesService.useGetTagsQuery("");

  const [customTag, setCustomTag] = useState<CustomTag>({});
  const [tagOptions, setTagOptions] = useState<SelectProps["options"]>();

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

  const tagsOptions = useMemo(() => {
    setTagOptions(
      tagsProps
        ? Object.keys(tagsProps).map((tag) => ({
            value: tagsProps[tag],
            label: tag,
          }))
        : []
    );
  }, [tagsProps]);

  useEffect(() => {
    updateDishesList()
      .unwrap()
      .then((DishList) => {
        DishList.map((Dish) => {
          dispatch(AddNewPost(Dish));
          setCustomTag((prevProps) => {
            return {
              ...prevProps,
              [Dish.id]: { label: "", value: "#FFFFFF" },
            };
          });
        });
      });
  }, []);

  const [searchText, setSearchText] = useState("");

  const DeleteDish = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: string
  ) => {
    e.preventDefault();
    deleteDishTriger({ id: itemId })
      .unwrap()
      .then(() => {
        dispatch(RemovePost(itemId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeCurrentDish = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: string
  ) => {
    e.preventDefault();
    console.log(posts[itemId]);
    changeDishTriger({ id: itemId, body: posts[itemId] })
      .unwrap()
      .then(() => {
        dispatch(ChangeDish({ id: itemId, post: posts[itemId] }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SearchedPosts = useMemo(
    () =>
      Object.values(posts).filter((Dish) =>
        Dish.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, posts]
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
      {SearchedPosts.map((post) => (
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
              onChange={(e) =>
                dispatch(
                  SetFieldForChangedDish({
                    id: post.id,
                    fieldname: "name",
                    value: e.target.value,
                  })
                )
              }
              value={post.name}
            />
            <Typography.Title level={5}>Price</Typography.Title>
            <Input
              id="Price"
              size="large"
              onChange={(e) =>
                dispatch(
                  SetFieldForChangedDish({
                    id: post.id,
                    fieldname: "price",
                    value: parseInt(e.target.value),
                  })
                )
              }
              value={String(post.price)}
            />
            <Typography.Title level={5}>Description</Typography.Title>
            <Input.TextArea
              id="Description"
              size="large"
              onChange={(e) =>
                dispatch(
                  SetFieldForChangedDish({
                    id: post.id,
                    fieldname: "description",
                    value: e.target.value,
                  })
                )
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
                    const selectedTags = options
                      .map((option: { label: string; value: string }) => {
                        return {
                          [option.label]: option.value,
                        };
                      })
                      .reduce(
                        (
                          acc: Record<string, string>,
                          curr: Record<string, string>
                        ) => {
                          return { ...acc, ...curr };
                        },
                        {}
                      );
                    dispatch(
                      SetFieldForChangedDish({
                        id: post.id,
                        value: selectedTags,
                        fieldname: "tags",
                      })
                    );
                  }}
                  value={
                    post.tags
                      ? Object.keys(post.tags).map((tag) => ({
                          value: post.tags[tag],
                          label: tag,
                        }))
                      : []
                  }
                  options={tagOptions}
                />
              </div>
              <Space>
                <Input
                  key={post.id}
                  style={{ width: "100px" }}
                  placeholder="Custom tag"
                  value={
                    customTag[post.id] === undefined
                      ? ""
                      : customTag[post.id].label
                  }
                  onChange={(e) => {
                    e.preventDefault();
                    setCustomTag((prevProps) => {
                      return {
                        ...prevProps,
                        [post.id]: {
                          ...prevProps[post.id],
                          label: e.target.value,
                        },
                      };
                    });
                  }}
                />
                <ColorPicker
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  defaultValue="#FFFFFF"
                  onChangeComplete={(currentColor) => {
                    setCustomTag((prevProps) => {
                      return {
                        ...prevProps,
                        [post.id]: {
                          ...prevProps[post.id],
                          value: `#${currentColor.toHex()}`,
                        },
                      };
                    });
                  }}
                />
                <Button
                  type="primary"
                  disabled={customTag[post.id].label === "" ? true : false}
                  style={{ marginLeft: "5px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      SetFieldForChangedDish({
                        id: post.id,
                        value: {
                          ...post.tags,
                          [customTag[post.id].label]: customTag[post.id].value,
                        },
                        fieldname: "tags",
                      })
                    );
                    setCustomTag((prevProps) => {
                      return {
                        ...prevProps,
                        [post.id]: { ...prevProps[post.id], label: "" },
                      };
                    });

                    setTagOptions((prevProps) => {
                      console.log(Date.now());
                      return [
                        ...prevProps,
                        {
                          label: customTag[post.id].label,
                          value: customTag[post.id].value,
                        },
                      ];
                    });
                  }}
                >
                  add
                </Button>
              </Space>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                style={{
                  backgroundColor: "rgba(0, 200, 0, 0.7)",
                  marginRight: "10px",
                }}
                onClick={(e) =>
                  ChangeCurrentDish(
                    e as React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    post.id
                  )
                }
              >
                Confirm
              </Button>
              <Button
                type="primary"
                danger
                onClick={(e) =>
                  DeleteDish(
                    e as React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    post.id
                  )
                }
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
