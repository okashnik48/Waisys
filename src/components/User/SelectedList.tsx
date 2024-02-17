import React, { FC, useEffect, useState } from "react";

import ordersService from "../../services/orders.service";
import {
  addTableNumber,
  removeSelectedPost,
  clearSelectedPosts,
} from "../../store/slices/selected-posts";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { Image, Button, Input, Row, Col, Typography } from "antd";

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

  const [postOrderTriger] = ordersService.usePostOrderMutation();

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
      dispatch(clearSelectedPosts());
      console.log(NewOrder);
    }
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <h1 style={{ textAlign: "center" }} >List of selected Dishes</h1>
          {ListDish.map((post: Dish) => (
            <div
              style={{
                background: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                marginBottom: "1rem",
              }}
              key={post.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography.Title level={2}>{post.name}</Typography.Title>
                
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                              {post.comment != "" && (
                <Typography.Title
                  level={3}
                  style={{ marginBottom: "0.5rem" }}
                >{`comment: ${post.comment}`}</Typography.Title>
              )}
                </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  width={600}
                  src={post.image}
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                  alt="Dish Image"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Button
                  type="primary"
                  danger
                  size = "large"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    DeleteDish(e, post.selectedPostId)
                  }
                >
                  Delete
                </Button>
                <Typography.Title level={2}>{post.count}</Typography.Title >
              </div>
            </div>
          ))}
          <Typography.Title
            level={2}
            style={{ textAlign: "center" }}
          >{`Total price: ${totalPrice}`}</Typography.Title>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <div style={{ marginBottom: "1rem" }}>
              <Input
                value={Table}
                onChange={(e) => dispatch(addTableNumber(e.target.value))}
                placeholder="Table Number"
                size="large"
                style={{ width: 100 }}
              />
            </div>
            <div>
              <Button
                onClick={ConfirmOrder}
                size="large"
                style={{
                  backgroundColor: "rgba(0, 200, 0, 0.7)",
                }}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SelectedList;
