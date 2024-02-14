import React from "react";

import { useEffect, useState } from "react";

import {
  SetDoneDishesList,
  DeleteDoneList,
} from "../../store/slices/done-list";

import { io } from "socket.io-client";

import { useAppSelector, useAppDispatch } from "../../store/store-hooks";

import ordersService from "../../services/orders.service";

import { Button, Col, Image, Row, Typography } from "antd";
type CompletedDish = {
  tableNumber: number;
  name: string;
  description: string;
  image: string;
  comment: string;
  quantity: number;
};
type CompletedDishesReply = Record<string, CompletedDish>;

const DoneDishesList = () => {
  let DoneList = useAppSelector((state) => {
    return state.donelist.donelist;
  });
  const dispatch = useAppDispatch();

  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { refetch: GetDoneList } = ordersService.useGetCompletedDishesQuery("");
  const [setComplitedDishDoneTriger, {}] = ordersService.useDeleteDeliveredDishMutation()

  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      console.log(value.data);
      let NewDoneDish = {
        [value.data.id]: value.data,
      };
      dispatch(SetDoneDishesList(NewDoneDish));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("waiter.dishes.complete", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiter.dishes.complete", onFooEvent);
    };
  }, []);

  const SetComplitedDishDone = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setComplitedDishDoneTriger(id).unwrap()
    .then(() => {
      dispatch(DeleteDoneList(id))
    })
    .catch((error) =>{
      console.log(error)
    })
  };
  useEffect(() => {
    GetDoneList()
      .unwrap()
      .then((data) => {
        dispatch(SetDoneDishesList(data));
      });
  }, []);
  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Completed Dishes
          </Typography.Title>
          {Object.keys(DoneList).map((id) => {
            const post = DoneList[id];
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
                      SetComplitedDishDone(e, id)
                    }
                  >
                    Delivered
                  </Button>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};
export default DoneDishesList;
