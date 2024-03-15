/* eslint-disable array-callback-return */
import React, { FC, useMemo } from "react";

import postService from "../../services/dishes.service";
import { Spin, Empty } from "antd";

import { useForm, useWatch } from "react-hook-form";
import { CoreSearch } from "../../ui-kit/CoreSearch";
import { WaiterDishCard } from "./WaiterDishCard";
import { SearchFunction } from "../../configs/SearchFunction";

type DefaultValues = {
  searchText: string;
  searchTags: string[];
  sortOption: "name" | "priceDesc" | "priceAsc" | "";
};

const Dishes: FC = () => {
  const { handleSubmit, control, getValues } = useForm<DefaultValues>({
    defaultValues: {
      searchText: "",
      searchTags: [],
      sortOption: "",
    },
  });
  const isSearchPropsUpdated = useWatch({ control });

  const { data: posts, isLoading } = postService.useDishesQuery(null, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data
        ? data.map((post) => ({
            comment: "",
            count: 1,
            ...post,
          }))
        : [],
      isLoading,
    }),
  });

  const SearchedPosts = useMemo(() => {return SearchFunction(posts, getValues) as typeof posts}, [isSearchPropsUpdated, posts]);
  return (
    <div>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>Menu</h1>
        {isLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : Object.keys(posts).length === 0 ? (
          <Empty />
        ) : (
          <>
            <CoreSearch control={control} />

            {SearchedPosts.length === 0 ? (
              <Empty />
            ) : (
              <>
                {SearchedPosts.map((post) => {
                  const index = posts.findIndex(
                    (searchedPost) => searchedPost.id === post.id
                  );
                  return (
                    <WaiterDishCard key={post.id} post={post} index={index} />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dishes;
