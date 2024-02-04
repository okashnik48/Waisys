"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { useEffect, useMemo, useState } from "react";

import {
  AddNewPost,
  RemovePost,
  SetFieldForChangedDish,
  ChangeDish,
} from "../../store/slices/admin";

import authService from "../../services/auth.service";
import postService from "../../services/posts.service";
import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import NavigationLayout from "../../layouts/Navigation";

import { List, Input, Select, Button, Image, Typography, Col, Row  } from "antd";

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
    <div className="flex-container flex-col items-center">
      <List
        dataSource={Object.values(SearchedPosts)}
        header={<div className="list-group-item">Menu</div>}
        renderItem={(post) => (
          <List.Item key={post.id} className="task list-group-item">
            <Row align="middle" justify="center">
              <Col >
                <Image width={400} src={post.image} />
              </Col>
              <Col >
                <div className="list-item-content">
                  <Typography.Title level={5}>Name</Typography.Title>
                  <Input
                    id="Name"
                    onChange={(e) =>
                      dispatch(
                        SetFieldForChangedDish({
                          id: post.id,
                          fieldname: 'name',
                          value: e.target.value,
                        })
                      )
                    }
                    value={post.name}
                    className="list-group-item post-text"
                  />
                  <Typography.Title level={5}>Price</Typography.Title>
                  <Input
                    id="Price"
                    onChange={(e) =>
                      dispatch(
                        SetFieldForChangedDish({
                          id: post.id,
                          fieldname: 'price',
                          value: parseInt(e.target.value),
                        })
                      )
                    }
                    value={String(post.price)}
                    className="list-group-item post-text"
                  />
                  <Typography.Title level={5}>Description</Typography.Title>
                  <Input
                    id="Description"
                    onChange={(e) =>
                      dispatch(
                        SetFieldForChangedDish({
                          id: post.id,
                          fieldname: 'description',
                          value: e.target.value,
                        })
                      )
                    }
                    value={post.description}
                    className="list-group-item post-text"
                  />
                  <Typography.Title level={5}>Tag</Typography.Title>
                  <Select
                    value={post.tags}
                    id="countries"
                    onChange={(e) => {
                      dispatch(
                        SetFieldForChangedDish({
                          id: post.id,
                          fieldname: 'tags',
                          value: e,
                        })
                      );
                    }}
                    options={[
                      { value: 'hot', label: 'hot' },
                      { value: 'cold', label: 'cold' },
                      { value: 'salad', label: 'salad' },
                      { value: 'none', label: 'Disabled', disabled: true },
                    ]}
                  />
                  <Button
                    style={{ backgroundColor: 'rgba(0, 200, 0, 0.7)' }}
                    className="Confirm list-group-item"
                    onClick={(e) => ChangeCurrentDish(e, post.id)}
                  >
                    Confirm
                  </Button>
                  <Button type="primary" danger onClick={(e) => DeleteDish(e, post.id)}>
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>

  );
};
export default AdminDishesList;
