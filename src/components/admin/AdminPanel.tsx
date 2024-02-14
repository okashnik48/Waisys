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

import { Input, Select, Button, Image, Typography, Col, Row } from "antd";
interface Post {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string;
}

const AdminDishesList = () => {
  let posts: Record<string, Post> = useAppSelector((state) => {
    return state.admin.posts;
  });
  const dispatch = useAppDispatch();
  const { refetch: updateDishesList } = postService.useDishesQuery("");
  const [deleteDishTriger, {}] = adminDishesService.useDeleteDishMutation();
  const [changeDishTriger, {}] = adminDishesService.useChangeDishMutation();
  useEffect(() => {
    updateDishesList()
      .unwrap()
      .then((DishList) => {
        DishList.map((Dish) => {
          dispatch(AddNewPost(Dish));
        });
      });
  }, []);

  const [searchText, setSearchText] = useState("");
  let SearchedPosts = [];
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

  SearchedPosts = useMemo(() => {
    const Newposts = Object.values(posts);
    return Newposts.filter((Dish) =>
      Dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, posts]);
  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
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
                marginLeft: "15%",
              }}
            >
              <div
                style={{
                  marginLeft: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  width={560}
                  src={post.image}
                  style={{ display: "block" }}
                />
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
                <Typography.Title level={5}>Tag</Typography.Title>
                <Select
                  value={post.tags}
                  size="large"
                  id="countries"
                  onChange={(value) => {
                    dispatch(
                      SetFieldForChangedDish({
                        id: post.id,
                        fieldname: "tags",
                        value: value,
                      })
                    );
                  }}
                  options={[
                    { value: "hot", label: "hot" },
                    { value: "cold", label: "cold" },
                    { value: "salad", label: "salad" },
                    { value: "none", label: "Disabled", disabled: true },
                  ]}
                />
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
        </Col>
      </Row>
    </div>
  );
};
export default AdminDishesList;
