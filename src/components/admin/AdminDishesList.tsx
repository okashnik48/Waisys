import React, {  useMemo, useState } from "react";

import postService from "../../services/dishes.service";

import {
  Input,

} from "antd";

import DishItem from "./ui-elements/DishItem";
import { useForm, useWatch } from "react-hook-form";
import { SearchFunction } from "../../configs/SearchFunction";
import { CoreSearch } from "../../ui-kit/CoreSearch";

type DefaultValues = {
  searchText: string;
  searchTags: string[];
  sortOption: "name" | "priceDesc" | "priceAsc" | "";
};

const AdminDishesList = () => {
  const { data: dishesListReply } = postService.useDishesQuery(null);

  const { handleSubmit, control, getValues } = useForm<DefaultValues>({
    defaultValues: {
      searchText: "",
      searchTags: [],
      sortOption: "",
    },
  });

  const isSearchPropsUpdated = useWatch({ control });

  const dishesList = useMemo(() => {
    return dishesListReply ? dishesListReply : [];
  }, [dishesListReply]);

  const SearchedPosts = useMemo(() => {return SearchFunction(dishesList, getValues)}, [isSearchPropsUpdated, dishesList]);
  return (
    <div
      style={{
        width: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Menu</h1>
      <CoreSearch control={control} />
      {SearchedPosts.map((post, index) => {
        console.log(post)
        return (
        <DishItem key={post.id} post={post} />
      )})}
    </div>
  );
};
export default AdminDishesList;
