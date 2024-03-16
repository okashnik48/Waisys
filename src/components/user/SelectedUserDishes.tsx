import React, { FC, useMemo } from "react";

import ordersService from "../../services/orders.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { Button, Typography, Empty, FloatButton } from "antd";
import { toast } from "react-toastify";
import {
  clearSelectedPostsQuest,
} from "../../store/slices/guest";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SelectedPostItem } from "./ui-kit/SelectedPostItem";

const SelectedUserDishes: FC = () => {
  const navigate = useNavigate();

  // TODO: its bad, need to fix
  const ListDish = Object.values(
    useAppSelector((state) => state.guest.selectedPosts)
  );

  const Table = useAppSelector((state) => state.guest.tableNumber);

  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return ListDish.reduce(
      (sum, dish) => sum + (dish.price.value * dish.count || 0),
      0
    );
  }, [ListDish]);

  const [postOrderTrigger] = ordersService.usePostOrderMutation();

  const ConfirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Table === null) {
      toast.info("Set table number");
    } else {
      const updatedListDish = ListDish.map((dish) => {
        return {
          id: dish.id,
          comment: dish.comment,
          quantity: dish.count,
        };
      });
      const NewOrder = {
        body: { dishes: updatedListDish, tableNumber: Table },
      };
      postOrderTrigger(NewOrder)
        .unwrap()
        .then(() => {
          dispatch(clearSelectedPostsQuest());
        });
    }
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <FloatButton
          style={{ position: "fixed", top: "20px", left: "20px" }}
          icon={<RollbackOutlined />}
          onClick={() => navigate(`/menu/${Table}`)}
        />
        <h1 style={{ textAlign: "center" }}>List of selected Dishes</h1>
        {Object.keys(ListDish).length === 0 ? (
          <Empty />
        ) : (
          <>
            {ListDish.map((post) => (
              <SelectedPostItem post = {post}/>
            ))}
            <Typography.Title
              level={2}
              style={{ textAlign: "center" }}
            >{`Total price: ${totalPrice}`}</Typography.Title>
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedUserDishes;
