"use client";

import "../../styles/Tailwind.css";

import React from "react";

import {
  List,
  ListItem,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
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
        <List className="list-group mb-4 sm:mb-0">
          <ListItem className="list-group-item">Menu</ListItem>
          <TextField
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            required
            className="list-group-item"
          />
          {SearchedPosts.map((post) => (
            <div
              className="task list-group-item"
              key={post.id}
              item-id={post.id}
            >
              <img
                src={post.image}
                className="list-group-item"
                alt="Dish Image"
              />
              <TextField
                id="Name"
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
                className="list-group-item post-text"
              />
              <TextField
                id="Price"
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
                className="list-group-item post-text"
              />
              <TextField
                id="Description"
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
                className="list-group-item post-text"
              />
              <Select
                value={post.tags}
                id="countries"
                onChange={(e) => {
                  dispatch(
                    SetFieldForChangedDish({
                      id: post.id,
                      fieldname: "tags",
                      value: e.target.value,
                    })
                  );
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <MenuItem value="cold">Cold</MenuItem>
                <MenuItem value="hot">Hot</MenuItem>
                <MenuItem value="salad">Salad</MenuItem>
              </Select>
              <Button
                className="Confirm list-group-item"
                onClick={(e) => ChangeCurrentDish(e, post.id)}
              >
                Confirm
              </Button>
              <Button
                className="w-full list-group-item mt-2 sm:mt-0"
                onClick={(e) => DeleteDish(e, post.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </List>
      </div>
  );
};
export default AdminDishesList;
