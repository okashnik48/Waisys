import React, { FC, useEffect, useState } from "react";

import ordersService from "../../services/orders.service";
import {
  addTableNumber,
  removeSelectedPost,
  clearSelectedPosts,
} from "../../store/slices/selected-posts";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { Image, Button, Input, Row, Col, Typography, Empty } from "antd";
import { toast } from "react-toastify";
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

  const [postOrderTrigger] = ordersService.usePostOrderMutation();

  const ConfirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Table === "") {
      toast.info("Set table number")
    } else {
      const updatedListDish = ListDish.map((dish: Dish) => {
        return {
          id: dish.id,
          comment: dish.comment,
          quantity: dish.count,
        };
      });
      const NewOrder = {
        body: { dishes: updatedListDish, tableNumber: parseInt(Table) },
      };
      postOrderTrigger(NewOrder).then(() => {
        toast.success("success");
        dispatch(clearSelectedPosts());
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
        <h1 style={{ textAlign: "center" }} >List of selected Dishes</h1>
        {Object.keys(ListDish).length === 0 ? (
          <Empty />
        )
        :
        (<>
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
          </>)}
        </Col>
      </Row>
    </div>
  );
};

export default SelectedList;
