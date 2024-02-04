import React, { FC, useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { ListGroup } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { initPosts, addPost, removePost, setComment, setCountDefault } from "../Flowbite/redux/posts";
import { addSelectedPost } from "../Flowbite/redux/SelectedPosts";
import { SetTokens, SetUserProperties } from "../Flowbite/redux/user";
import Counter from "../Flowbite/tools/Counter";
import authService from "../../services/auth.service";
import ordersService from "../../services/orders.service";

import postService from "../../services/posts.service";

import { useAppSelector } from "../../App";
import { useAppDispatch } from "../../App";

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


interface User{
  accessToken: string;
  refreshToken: string;
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
  const [searchTags, SetsearchTags] = useState("");
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
    <div className="flex flex-col items-center ">
      <ListGroup className="w-full md:w-1/2 lg:w-1/3">
        <div className="bg-gray-800 text-white text-center w-full ">Menu</div>
        <TextInput
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
        <select
          id="countries"
          onChange={(event) => {
            SetsearchTags(event.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" selected>
            None
          </option>
          <option value="cold">Cold</option>
          <option value="hot">Hot</option>
          <option value="salad">Salad</option>
        </select>
        {SearchedPosts.map((post: Dish, index: number) => {
          console.log(post);
          return (
            <div className="task border p-2 my-2" key={post.id} >
              <img
                src={post.image}
                className="max-w-full h-auto mb-2"
                alt="post"
              />
              <div className="Post_text mt-2">{post.name}</div>
              <TextInput
                id="Coment"
                value={post.comment}
                onChange={(e) => dispatch(setComment({ id: post.id, comment: e.target.value }))}
                placeholder="Comment"
                required
                className="border p-2 mt-2"
              />
              <div>{`Tag: ${post.tags}`}</div>
              <div>{`Price: ${post.price}`}</div>
              <Counter post={post} />
              <Button
                className="w-full bg-blue-500 text-white p-2 mt-2"
                onClick={(e) => AddDish(e, post.id)}
              >
                Add
              </Button>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Dishes;


