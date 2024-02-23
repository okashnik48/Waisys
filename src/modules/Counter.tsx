import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "../store/store-hooks";
import { counterDecrement, counterIncrement } from "../store/slices/posts";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
interface Dish {
  post: {
    name: string;
    id: string;
    count: number;
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
    <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: "10px" }}>
      <Button size="middle" onClick={handleDecrement} icon={<MinusOutlined />} />
      <h1>{post.count}</h1>
      <Button size="middle" onClick={handleIncrement} icon = {<PlusOutlined/>} />
    </div>
  );
};

export default Counter;
