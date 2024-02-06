import React, { FC, useEffect, useState } from "react";


import ordersService from "../../services/orders.service";
import {
  addTableNumber,
  removeSelectedPost,
  clearSelectedPosts,
} from "../../store/slices/selected-posts";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { List, Button, Input } from 'antd';


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
  const user = useAppSelector((state) => state.user.user);
  const ListDish: Dish[] = Object.values(
    useAppSelector((state) => state.selectedPosts.selectedPosts)
  );
  const Table = useAppSelector((state) => state.selectedPosts.tableNumber);
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
      dispatch(clearSelectedPosts())
      console.log(NewOrder);
    }
  };

  return (
    <div style={{
      position: 'static',
      top: '50%',
      left: '50%',
      margin: '1rem',
      width: '100%',
      maxWidth: '24rem' // You can adjust this value to fit your design needs
  }}>
      <List style={{ width: '100%' }}>
          <List.Item style={{ textAlign: 'center' }}>List of selected Dishes</List.Item>
  
          {ListDish.map((post: Dish) => (
              <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '1rem' }} key={post.id}>
                  <div style={{ marginBottom: '0.5rem' }}>{post.name}</div>
                  <div style={{ marginBottom: '0.5rem' }}>{post.comment}</div>
                  <img
                      src={post.image}
                      style={{ width: '100%', marginBottom: '0.5rem', borderRadius: '0.5rem' }}
                      alt="Dish Image"
                  />
                  <div style={{ marginBottom: '0.5rem' }}>{post.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => DeleteDish(e, post.selectedPostId)}>
                          Delete
                      </Button>
                      <span>{post.count}</span>
                  </div>
              </div>
          ))}
          <div style={{ textAlign: 'center' }}>{`Total price: ${totalPrice}`}</div>
      </List>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
              onClick={ConfirmOrder}
              style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', marginRight: '0.5rem' }}
          >
              Confirm Order
          </Button>
          <Input
              id="TableNumber"
              value={Table}
              onChange={(e) => dispatch(addTableNumber(e.target.value))}
              placeholder="Table Number"
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', border: '1px solid #007bff' }}
          />
      </div>
  </div>
  );
};

export default SelectedList;