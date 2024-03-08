import { Avatar, Button, Card, Input, Select, Typography } from "antd";
import React, { useMemo, useState } from "react";

import {
  CommentOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import adminDishesService from "../../services/admin/admin-dishes.service";
import postService from "../../services/posts.service";
import { UserDishCard } from "./UserDishCard";

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
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<
    "name" | "priceDesc" | "priceAsc" | ""
  >("");
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
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {SearchedPosts.map((post, index) => (
          <UserDishCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
