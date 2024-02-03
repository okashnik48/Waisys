import React, { FC, useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { ListGroup } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "../../App";

import ordersService from "../../services/orders.service";
import { RootState } from "../../App";
import {
  addTableNumber,
  removeSelectedPost,
  clearSelectedPosts,
} from "../Flowbite/redux/SelectedPosts";

interface Dish {
  id: string;
  name: string;
  comment: string;
  price: number;
  count: number;
  image: string;
  description: string;
  selectedPostId: string;
}



const SelectedList: FC = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const ListDish: Dish[] = Object.values(
    useAppSelector((state: RootState) => state.selectedPosts.selectedPosts)
  );
  const Table = useAppSelector((state: RootState) => state.selectedPosts.tableNumber);
  const dispatch = useAppDispatch();

  const [totalPrice, SetTotalPrice] = useState<number>(0);
  useEffect(() => {
    let sum = 0;
    ListDish.map((dish: Dish) => {
      sum += dish.price * dish.count;
    });
    SetTotalPrice(sum);
  }, [ListDish]);

  const DeleteDish = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    dispatch(removeSelectedPost({ listId: id }));
  };

  const [
    postOrderTriger,
    { error: postOrderError, isLoading: isPostOrderLoading },
  ] = ordersService.usePostOrderMutation();

  const ConfirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (parseInt(Table) === -1) {
      alert("Set table number");
    } else if (ListDish.length === 0) {
      alert("Choose dishes");
    } else {
      const updatedListDish = ListDish.map((dish: Dish) => {
        return {
          id: dish.id,
          comment: dish.comment,
          quantity: dish.count,
        };
      });
      const NewOrder = {
        accessToken: user.accessToken,
        body: { dishes: updatedListDish, tableNumber: parseInt(Table) },
      };
      postOrderTriger(NewOrder);
      console.log(NewOrder);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 h-full w-full md:w-96">
      <ListGroup className="w-full">
        <ListGroup.Item>List of selected Dish</ListGroup.Item>

        {ListDish.map((post: Dish) => {
          return (
            <div className="task p-4" key={post.id}>
              <div className="mb-2">{post.name}</div>
              <div className="mb-2">{post.comment}</div>
              <img
                src={post.image}
                className="w-full mb-2 rounded-md"
                alt="Dish Image"
              />
              <div className="Post_text mb-2">{post.description}</div>
              <div className="w-full mb-2">
                <Button onClick={(e) => DeleteDish(e, post.selectedPostId)}>
                  Delete
                </Button>
              </div>
              <div>{post.count}</div>
            </div>
          );
        })}
        <div>{`Total price: ${totalPrice}`}</div>
      </ListGroup>
      <div className="mt-4">
        <button
          onClick={ConfirmOrder}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
        >
          Confirm Order
        </button>
        <TextInput
          id="TableNumber"
          value={Table}
          onChange={(e) => dispatch(addTableNumber(e.target.value))}
          placeholder="Table Number"
          required
          className="w-full p-2 mb-2 rounded-md border border-blue-300 focus:ring focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SelectedList;