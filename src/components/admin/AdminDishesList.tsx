import React, { useCallback, useMemo, useState } from "react";

import postService, { dishesReply } from "../../services/posts.service";
import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch } from "../../store/store-hooks";

import {
  Input,
  Select,
  Button,
  Image,
  Typography,
  SelectProps,
  Tag,
} from "antd";

import TagInput from "../../ui-kit/TagInput";
import DishItem from "./ui-elements/DishItem";

const AdminDishesList = () => {
  const dispatch = useAppDispatch();
  const { data: dishesListReply } = postService.useDishesQuery("");
  const [deleteDishTrigger] = adminDishesService.useDeleteDishMutation();
  const [changeDishTrigger] = adminDishesService.useChangeDishMutation();

  const dishesList = useMemo(() => {
    return dishesListReply ? dishesListReply : [];
  }, [dishesListReply]);

  const ChangeFieldDish = useCallback(
    (index: number, label: keyof Post, value: string) => {
      dispatch(
        postService.util.updateQueryData("dishes", "", (draftPost) => {
          draftPost[index][label] = value;
        })
      );
    },
    []
  );

  const [searchText, setSearchText] = useState("");

  const DeleteDish = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, itemId: string) => {
      deleteDishTrigger({ id: itemId });
    },
    []
  );

  // const ChangeCurrentDish = useCallback(
  //   (
  //     e: React.MouseEvent<HTMLElement, MouseEvent>,
  //     itemId: string,
  //     index: number
  //   ) => {

  //   },
  //   []
  // );

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
        <DishItem key={post.id} post={post} />
      ))}
    </div>
  );
};
export default AdminDishesList;
