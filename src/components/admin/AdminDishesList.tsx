import React, {  useMemo, useState } from "react";

import postService from "../../services/dishes.service";

import {
  Input,

} from "antd";

import DishItem from "./ui-elements/DishItem";

const AdminDishesList = () => {
  const { data: dishesListReply } = postService.useDishesQuery(null);

  const dishesList = useMemo(() => {
    return dishesListReply ? dishesListReply : [];
  }, [dishesListReply]);

  const [searchText, setSearchText] = useState("");

  const SearchedPosts = useMemo(
    () =>{
      let SortedPosts = Object.values(dishesList).filter((Dish) =>
        Dish.name.toLowerCase().includes(searchText.toLowerCase())
      )
      SortedPosts = Object.values(SortedPosts).sort((a, b) => new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate())
      return SortedPosts;
    },
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
