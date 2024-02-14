import React, { FC, useEffect, useMemo, useState } from "react";
import {
  initPosts,
  addPost,
  removePost,
  setComment,
  setCountDefault,
} from "../../store/slices/posts";
import { addSelectedPost } from "../../store/slices/selected-posts";

import postService from "../../services/posts.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { Image, Input, Select, Button, Col, Row, Typography } from "antd";

import Counter from "../../modules/Counter";

interface Dish {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: string;
  id: string;
  post: string;
  count?: number;
  comment?: string;
}
interface SelectedPost {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: string;
  id: string;
  post: string;
  count: number;
  comment: string;
  selectedPostId: string;
}

const Dishes: FC = () => {
  const posts: Record<string, Dish> = useAppSelector((state) => {
    return state.posts.posts;
  });

  const dispatch = useAppDispatch();
  const { refetch: updateDishesList } = dispatch(
    postService.endpoints.dishes.initiate("")
  );

  useEffect(() => {
    updateDishesList()
      .unwrap()
      .then((dishesData) => {
        const DishesPosts: Dish[] = Object.values(dishesData);
        console.log(DishesPosts);
        DishesPosts.map((post: Dish) => {
          dispatch(
            addPost({ id: post.id, post: { ...post, comment: "", count: 1 } })
          );
        });
      })
      .catch((error) => {
        console.error("Loadind dishes error", error);
      });
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState("");
  let SearchedPosts: Dish[] = [];

  const AddDish = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: string
  ) => {
    e.preventDefault();
    const selectedPostId = crypto.randomUUID();
    const NewSelectedPost: SelectedPost = {
      ...posts[itemId],
      selectedPostId: selectedPostId,
    };
    dispatch(
      addSelectedPost({ post: NewSelectedPost, listId: selectedPostId })
    );
    dispatch(setComment({ id: itemId, comment: "" }));
    dispatch(setCountDefault({ id: itemId }));
  };

  SearchedPosts = useMemo(() => {
    let Newposts = Object.values(posts) as Dish[];
    Newposts = Newposts.filter((Dish: Dish) =>
      Dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchTags != "") {
      Newposts = Newposts.filter((dish: Dish) => {
        console.log(Newposts);
        return dish.tags.includes(searchTags);
      });
    }
    return Newposts;
  }, [searchTags, searchText, posts]);
  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <h1>Menu</h1>
          <Input.Search
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            size="large"
          />
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <Typography.Title
              level={3}
              style={{ marginBottom: "5px", display: "inline-block" }}
            >
              Tag
            </Typography.Title>
            <Select
              id="countries"
              onChange={(value) => setSearchTags(value)}
              defaultValue=""
              style={{
                width: "150px",
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              <Select.Option value="">None</Select.Option>
              <Select.Option value="cold">Cold</Select.Option>
              <Select.Option value="hot">Hot</Select.Option>
              <Select.Option value="salad">Salad</Select.Option>
            </Select>
          </div>

          {SearchedPosts.map((post: Dish) => (
            <div key={post.id}>
              <Image
                width = {560}
                src={post.image}
              />
              <Typography.Title level={3}>{post.name}</Typography.Title>
              <Input
                id="Coment"
                value={post.comment}
                onChange={(e) =>
                  dispatch(setComment({ id: post.id, comment: e.target.value }))
                }
                placeholder="Comment"
                required
                size="large"
              />
              <Typography.Title
                level={3}
              >{`Tag: ${post.tags}`}</Typography.Title>
              <Typography.Title
                level={3}
              >{`Price: ${post.price}`}</Typography.Title>
              <div style={{ display: "inline-block", marginRight: "10px" }}>
                <Typography.Title
                  style={{ marginBottom: "5px", display: "inline-block" }}
                  level={3}
                >
                  Count:{" "}
                </Typography.Title>
                <div
                  style={{
                    width: "150px",
                    display: "inline-block",
                    marginLeft: "10px",
                  }}
                >
                  <Counter post={post} />
                </div>
              </div>

              <Button
                size="large"
                style={{
                  backgroundColor: "rgba(0, 200, 0, 0.7)",
                  display: "block",
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  AddDish(e, post.id)
                }
              >
                Add
              </Button>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Dishes;
