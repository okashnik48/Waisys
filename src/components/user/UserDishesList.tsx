import { FloatButton, Input, Select, Typography } from "antd";
import React, { useEffect, useMemo } from "react";

import { CheckOutlined } from "@ant-design/icons";
import postService from "../../services/dishes.service";
import { UserDishCard } from "./UserDishCard";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { SetTableNumberForQuest } from "../../store/slices/guest";
import { useForm, useWatch } from "react-hook-form";
import { CoreSearch } from "../../ui-kit/CoreSearch";

import { SearchFunction } from "../../configs/SearchFunction";

type DefaultValues = {
  searchText: string;
  searchTags: string[];
  sortOption: "name" | "priceDesc" | "priceAsc" | "";
};

export const UserDishesList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {tableNumber} = useParams();

  useEffect(() => {
    dispatch(SetTableNumberForQuest(Number(tableNumber)));
  }, []);

  const { handleSubmit, control, getValues } = useForm<DefaultValues>({
    defaultValues: {
      searchText: "",
      searchTags: [],
      sortOption: "",
    },
  });

  const isSearchPropsUpdated = useWatch({ control });

  const selectedDishes = useAppSelector((state) => state.guest.selectedPosts);
  const countOfSelectedDishes = useMemo(() => {
    return Object.values(selectedDishes).reduce(
      (sum, dish) => sum + (dish.count || 0),
      0
    );
  }, [selectedDishes]);
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
    <div
      style={{
        width: "1220px",
        margin: "0 auto",
      }}
    >
      <h1>Menu</h1>
      <CoreSearch control={control} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {SearchedPosts.map((post) => {
          const index = posts.findIndex(
            (searchedPost) => searchedPost.id === post.id
          );
          return <UserDishCard key={post.id} post={post} index={index} />;
        })}
      </div>
      <div style={countOfSelectedDishes ? {} : { display: "none" }}>
        <FloatButton
          icon={<CheckOutlined />}
          type="primary"
          style={{ right: 24 }}
          badge={{ count: countOfSelectedDishes, color: "blue" }}
          onClick={() => {
            navigate("/selected-list");
          }}
        />
      </div>
    </div>
  );
};
