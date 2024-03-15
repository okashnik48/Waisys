import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "../../store/store-hooks";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import postService from "../../services/dishes.service";
interface Dish {
  post: {
    name: string;
    id: string;
    count: number;
  };
  index: number
}

const DishCounter: React.FC<Dish> = ({ post, index }) => {
  const dispatch = useAppDispatch();
  
  const ChangeCountDish = (value: number) => {
    dispatch(
      postService.util.updateQueryData("dishes", null, (draftPost) => {
        draftPost[index].count = value;  
      })
    );
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post.count !== 1) {
      ChangeCountDish(post.count - 1)
    }
  };
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    ChangeCountDish(post.count + 1)
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: "10px" }}>
      <Button size="middle" onClick={handleDecrement} icon={<MinusOutlined />} />
      <h1>{post.count}</h1>
      <Button size="middle" onClick={handleIncrement} icon = {<PlusOutlined/>} />
    </div>
  );
};

export default DishCounter;
