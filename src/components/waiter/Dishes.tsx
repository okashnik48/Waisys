/* eslint-disable array-callback-return */
import React, { FC, useEffect, useMemo, useState } from "react";
import { addSelectedPost } from "../../store/slices/selected-posts";

import postService from "../../services/posts.service";
import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import {
  Image,
  Input,
  Select,
  Button,
  Col,
  Row,
  Typography,
  Card,
  Spin,
  Empty,
  Tag,
} from "antd";

import DishCounter from "./DishCounter";

interface ReplyDish {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: Record<string, string>;
  id: string;
  post: string;
}
interface Dish {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: Record<string, string>;
  id: string;
  post: string;
  count: number;
  comment: string;
}
interface SelectedPost {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: Record<string, string>;
  id: string;
  post: string;
  count: number;
  comment: string;
  selectedPostId: string;
}

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
        isLoading
    }),
  });

  const ChangeFieldDish = (
    index: number,
    label: string,
    value: string | number
  ) => {
    dispatch(
      postService.util.updateQueryData("dishes", "", (draftPost) => {
        draftPost[index][label] = value;
      })
    );
  };

  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  let SearchedPosts: Dish[] = [];

  const AddDish = (index: number) => {
    const selectedPostId = crypto.randomUUID();
    console.log(index);
    console.log(posts);
    const NewSelectedPost: SelectedPost = {
      ...posts[index],
      selectedPostId: selectedPostId,
    };
    dispatch(
      addSelectedPost({ post: NewSelectedPost, listId: selectedPostId })
    );
    ChangeFieldDish(index, "comment", "");
    ChangeFieldDish(index, "count", 1);
  };

  SearchedPosts = useMemo(() => {
    let NewPosts = posts.filter((Dish: Dish) =>
      Dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchTags.length !== 0) {
      NewPosts = NewPosts.filter((dish: Dish) => {
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
          return a.price - b.price;
        });
      } else if (sortOption === "priceDesc") {
        NewPosts.sort((a, b) => {
          return b.price - a.price;
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
                      console.log(value);
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
            {SearchedPosts.length === 0 ? (
              <Empty />
            ) : (
              <>
                {SearchedPosts.map((post: Dish, index: number) => (
                  <Card key={post.id}>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography.Title level={2}>{post.name}</Typography.Title>
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
                        {`Price: ${post.price}`}{" "}
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
                        onChange={
                          (e) =>
                            ChangeFieldDish(index, "comment", e.target.value)
                          // dispatch(
                          //   setComment({ id: post.id, comment: e.target.value })
                          // )
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
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dishes;
//const { data: tagList } = adminDishesService.useGetTagsQuery("");
//const [selectTagsOptions, SetSelectTagsOptions] = useState<TagsOptions[]>([]);
// useMemo(() => {
//   if (tagList) {;
//     SetSelectTagsOptions([]);
//     Object.keys(tagList).map((label) => {
//       SetSelectTagsOptions((prevProps) => {
//         return [
//           ...prevProps,
//           {
//             label: label,
//             value: label,
//           },
//         ];
//       });
//     });
//   }
// }, [tagList]);
// useEffect(() => {
//   setIsLoading(true);
//   updateDishesList()
//     .unwrap()
//     .then((dishesData) => {
//       const DishesPosts: ReplyDish[] = Object.values(dishesData);
//       DishesPosts.map((post: ReplyDish) => {
//         dispatch(
//           addPost({ id: post.id, post: { ...post, comment: "", count: 1 } })
//         );
//       });
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       setIsLoading(false);
//       console.error("Loading dishes error", error);
//     });
// }, []);
