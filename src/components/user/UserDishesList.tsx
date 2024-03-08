import {
  Avatar,
  Badge,
  Button,
  Card,
  FloatButton,
  Input,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";

import {
  CheckOutlined,
  CommentOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import adminDishesService from "../../services/admin/admin-dishes.service";
import postService from "../../services/posts.service";
import { UserDishCard } from "./UserDishCard";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SetTableNumberForQuest } from "../../store/slices/guest";

const { Meta } = Card;

const SortOptionProps = [
  {
    value: "priceDesc",
    label: "price desc",
  },

  {
    value: "priceAsc",
    label: "price asc",
  },
  {
    value: "name",
    label: "name",
  },
  {
    value: "",
    label: "none",
  },
];

export const UserDishesList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const { tableNumber } = useParams();
  console.log(tableNumber)
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<
    "name" | "priceDesc" | "priceAsc" | ""
  >("");
  useEffect(() =>{
    dispatch(SetTableNumberForQuest(Number(tableNumber)))
  }, [])
  const selectedDishes = useAppSelector((state) => state.guest.selectedPosts);
  const countOfSelectedDishes = useMemo(() => {
    return Object.values(selectedDishes).reduce(
      (sum, dish) => sum + (dish.count || 0),
      0
    );
  }, [selectedDishes]);
  const { tagsProps } = adminDishesService.useGetTagsQuery("", {
    selectFromResult: ({ data }) => ({
      tagsProps: data
        ? Object.keys(data).map((tag) => ({
            value: tag,
            label: tag,
          }))
        : [],
    }),
  });
  const { data: posts, isLoading } = postService.useDishesQuery("", {
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

  const SearchedPosts = useMemo(() => {
    let NewPosts = posts.filter((Dish) =>
      Dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchTags.length !== 0) {
      NewPosts = NewPosts.filter((dish) => {
        return searchTags.every((element) =>
          Object.keys(dish.tags).includes(element)
        );
      });
    }

    if (sortOption) {
      if (sortOption === "name") {
        NewPosts.sort((a, b) => {
          return a[sortOption].localeCompare(b[sortOption]);
        });
      } else if (sortOption === "priceAsc") {
        NewPosts.sort((a, b) => {
          return a.price.value - b.price.value;
        });
      } else if (sortOption === "priceDesc") {
        NewPosts.sort((a, b) => {
          return b.price.value - a.price.value;
        });
      }
    }
    return NewPosts;
  }, [searchTags, searchText, posts, sortOption]);
  return (
    <div
      style={{
        width: "1220px",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <div>
            <Typography.Title
              level={3}
              style={{ marginBottom: "5px", display: "inline-block" }}
            >
              Tag
            </Typography.Title>
            <Select
              id="tags"
              mode="multiple"
              onChange={(value) => {
                setSearchTags(value);
              }}
              style={{
                minWidth: "150px",
                display: "inline-block",
                marginLeft: "10px",
              }}
              options={tagsProps}
            />
          </div>
        </div>
        <div>
          <Typography.Title
            level={3}
            style={{ marginBottom: "5px", display: "inline-block" }}
          >
            Sort by
          </Typography.Title>
          <Select
            id="sort"
            style={{
              minWidth: "150px",
              display: "inline-block",
              marginLeft: "10px",
            }}
            onChange={(value) => {
              setSortOption(value);
            }}
            options={SortOptionProps}
          />
        </div>
      </div>
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
