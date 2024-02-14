import React, { useState } from "react";
import { Button } from "antd";
import { useAppDispatch } from "../store/store-hooks";
import { counterDecrement, counterIncrement } from "../store/slices/posts";

interface Dish {
  post: {
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
  };
}

const Counter: React.FC<Dish> = ({ post }) => {
  const dispatch = useAppDispatch();
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post.count != 1) {
      dispatch(counterDecrement({ id: post.id }));
    }
  };
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(counterIncrement({ id: post.id }));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={handleDecrement}>-</Button>
      <h1>{post.count}</h1>
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
};

export default Counter;
