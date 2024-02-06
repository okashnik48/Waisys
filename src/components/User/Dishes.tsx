import React, { FC, useEffect, useMemo, useState } from "react";
import { initPosts, addPost, removePost, setComment, setCountDefault } from "../../store/slices/posts";
import { addSelectedPost } from "../../store/slices/selected-posts";

import postService from "../../services/posts.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { List, Input, Select, Button } from 'antd';

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
  const {refetch: updateDishesList } = dispatch(postService.endpoints.dishes.initiate(""))

  
  useEffect(() => {
    // refreshTokenTriger({refreshToken: user.refreshToken}).unwrap()
    //   .then(({ accessToken, refreshToken }) => {
    //     dispatch(SetTokens({ accessToken, refreshToken }))
    //   });

    updateDishesList().unwrap()
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

  const AddDish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string) => {
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
    dispatch(setCountDefault({id: itemId}));
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
    <div className="flex flex-col items-center">
      <List className="w-full md:w-1/2 lg:w-1/3">
        <List.Item className="bg-gray-800 text-white text-center w-full">Menu</List.Item>
        <Input.Search
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          required
          className="border p-2 my-2"
        />
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tags
        </label>
        <Select
          id="countries"
          onChange={(value) => setSearchTags(value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue=""
        >
          <Select.Option value="">None</Select.Option>
          <Select.Option value="cold">Cold</Select.Option>
          <Select.Option value="hot">Hot</Select.Option>
          <Select.Option value="salad">Salad</Select.Option>
        </Select>
        {SearchedPosts.map((post: Dish, index: number) => (
          <div className="task border p-2 my-2" key={post.id} >
            <img
              src={post.image}
              className="max-w-full h-auto mb-2"
              alt="post"
            />
            <div className="Post_text mt-2">{post.name}</div>
            <Input
              id="Coment"
              value={post.comment}
              onChange={(e) => dispatch(setComment({ id: post.id, comment: e.target.value }))}
              placeholder="Comment"
              required
              className="border p-2 mt-2"
            />
            <div>{`Tag: ${post.tags}`}</div>
            <div>{`Price: ${post.price}`}</div>
            <Counter post = {post} />
            <Button
              className="w-full bg-blue-500 text-white p-2 mt-2"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => AddDish(e, post.id)}
            >
              Add
            </Button>
          </div>
        ))}
      </List>
    </div>
  );
};

export default Dishes;


