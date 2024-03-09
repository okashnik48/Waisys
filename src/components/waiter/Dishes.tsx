/* eslint-disable array-callback-return */
import React, { FC, useMemo, useState } from "react";
import { addSelectedPost } from "../../store/slices/selected-posts";

import postService from "../../services/dishes.service";
import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import {
  Image,
  Input,
  Select,
  Button,
  Typography,
  Card,
  Spin,
  Empty,
  Tag,
} from "antd";

import DishCounter from "./DishCounter";
import DishesTagsService from "../../services/dishes-tags.service";
import { dishesTagsOptionsSelector } from "../../store/slices/dishes-tags-hooks";
import DishesTypes from "../../store/types/dishes-types";


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

const Dishes: FC = () => {
  const dispatch = useAppDispatch();
  const [sortOption, setSortOption] = useState<
    "name" | "priceDesc" | "priceAsc" | ""
  >("");

  const tagsOptions = useAppSelector(dishesTagsOptionsSelector);

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

  const ChangeFieldDish = (
    index: number,
    label: "comment" | "count",
    value: string | number
  ) => {
    dispatch(
      postService.util.updateQueryData("dishes", null, (draftPost) => {
        if (label === "comment") {
          draftPost[index].comment = value as string;
        } else {
          draftPost[index].count = value as number;
        }
      })
    );
  };

  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  // let SearchedPosts: Dish[] = [];

  const AddDish = (index: number) => {
    const selectedPostId = crypto.randomUUID();
    const NewSelectedPost: DishesTypes.SelectedDish = {
      ...posts[index],
      selectedPostId: selectedPostId,
    };
    dispatch(
      addSelectedPost({ post: NewSelectedPost, listId: selectedPostId })
    );
    ChangeFieldDish(index, "comment", "");
    ChangeFieldDish(index, "count", 1);
  };

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
            <Input.Search
              id="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              size="large"
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
                    options={tagsOptions}
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

            {SearchedPosts.length === 0 ? (
              <Empty />
            ) : (
              <>
                {SearchedPosts.map((post) => {
                  const index = posts.findIndex(
                    (searchedPost) => searchedPost.id === post.id
                  );
                  return (
                    <Card key={post.id}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography.Title level={2}>
                          {post.name}
                        </Typography.Title>
                      </div>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Image alt={post.name} src={post.image} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "block" }}>
                          {Object.keys(post.tags).map((label) => (
                            <Tag
                              key={label}
                              color={post.tags[label]}
                              style={{
                                fontSize: "16px",
                                padding: "8px 12px",
                                display: "inline-block",
                              }}
                            >
                              {label}
                            </Tag>
                          ))}
                        </div>
                        <Typography.Title
                          level={3}
                          style={{ marginLeft: "10px" }}
                        >
                          {" "}
                          {`Price: ${post.price.value} ${post.price.currency}`}{" "}
                        </Typography.Title>
                      </div>
                      <Typography.Title
                        level={4}
                        style={{ marginLeft: "10px", textAlign: "center" }}
                      >
                        {post.description}
                      </Typography.Title>
                      <div
                        style={{
                          margin: "0 auto",
                          width: "200px",
                          marginTop: "40px",
                        }}
                      >
                        <Input
                          id="Coment"
                          value={post.comment}
                          onChange={(e) =>
                            ChangeFieldDish(index, "comment", e.target.value)
                          }
                          placeholder="Comment"
                          required
                          size="large"
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography.Title level={3}>Count:</Typography.Title>
                          <DishCounter post={post} index={index} />
                        </div>
                        <Button
                          size="large"
                          style={{
                            backgroundColor: "rgba(0, 200, 0, 0.7)",
                            marginTop: "10px",
                            width: "100%",
                          }}
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => AddDish(index)}
                        >
                          Add
                        </Button>
                      </div>
                    </Card>
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
