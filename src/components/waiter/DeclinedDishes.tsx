import React from "react";

import { useEffect, useState } from "react";

import { Image, Button, Row, Col, Typography, Empty } from "antd";

import ordersService from "../../services/orders.service";

import {
  SetDeclinedDishesList,
  DeleteDeclinedDish,
} from "../../store/slices/declined-dishes";

import { io } from "socket.io-client";

import { useAppSelector, useAppDispatch } from "../../store/store-hooks";

type DeclinedDish = {
  tableNumber: number;
  name: string;
  description: string;
  image: string;
  comment: string;
  quantity: number;
};
type DeclinedDishReply = Record<string, DeclinedDish>;

const DoneDishesList = () => {
  let DeclinedList = 
    useAppSelector((state) => {
      return state.declinedList.declinedlist;
    }
  );
  const dispatch = useAppDispatch();

  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function ProcessDeclineDish(value: DeclinedDishReply) {
      console.log(value.data);
      dispatch(SetDeclinedDishesList(value.data));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("waiter.dishes.decline", ProcessDeclineDish);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiter.dishes.decline", ProcessDeclineDish);
    };
  }, []);

  const { refetch: GetDeclinedList } = ordersService.useGetDeclinedDishesQuery('')
  const [DeletedeclinedDishTriger, {}] = ordersService.useDeleteDeliveredDishMutation()

  useEffect(() => {
    GetDeclinedList()
      .unwrap()
      .then((data) => {
        dispatch(SetDeclinedDishesList(data));
      });
  }, []);
  const DeleteDeclinedDishTriger = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    DeletedeclinedDishTriger(id).unwrap()
    .then(() => {
      dispatch(DeleteDeclinedDish(id))
    })
    .catch((error) =>{
      console.log(error)
    })
  };
  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Declined Dishes
          </Typography.Title>
          {Object.keys(DeclinedList).length === 0 ? (
          <Empty />
        )
        :(
          <>
          {Object.keys(DeclinedList).map((id) => {
            const post = DeclinedList[id];
            return (
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
                  <Typography.Title
                    level={3}
                  >{`Table number: ${post.tableNumber}`}</Typography.Title>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {post.comment !== "" && (
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
                  <Typography.Title level={2}>{post.quantity}</Typography.Title>
                  <Button
                    type="primary"
                    size="large"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      DeleteDeclinedDishTriger(e, id)
                    }
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            );
          })}
          </>)}
        </Col>
      </Row>
    </div>
  );
};
export default DoneDishesList;
