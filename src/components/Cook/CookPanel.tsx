"use client";

import React from "react";

import { useEffect, useState } from "react";

import orderService from "../../services/orders.service";

import { io } from "socket.io-client";
import { Button, Image, Typography, Col, Row } from "antd";

type OrderDish = {
  name: string;
  image: string;
  description: string;
  id: string;
  comment: string;
  quantity: number;
  isAccepted?: boolean;
  isCompleted?: boolean;
  isDeclined?: boolean;
  [key: string]: any;
};
type ordersGetReply = Record<string, OrderDish>;

const CookPanel = () => {
  const [CookList, setCookList] = useState<Record<string, OrderDish>>({});

  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { refetch: updateOrdersList } = orderService.useGetOrdersQuery("");
  const [changeOrderStatusTriger, {}] = orderService.usePatchOrderMutation();
  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(data: ordersGetReply) {
      Object.values(data).map((order) => {
        setCookList((prevCookList) => {
          return {
            ...prevCookList,
            [order.id]: {
              ...order,
              isAccepted: false,
              isCompleted: false,
              isDeclined: false,
            },
          };
        });
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("cook.orders.create", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cook.orders.create", onFooEvent);
    };
  }, []);

  useEffect(() => {
    updateOrdersList()
      .unwrap()
      .then((data) => {
        Object.values(data).map((order) => {
          setCookList((prevCookList) => {
            return {
              ...prevCookList,
              [order.id]: {
                ...order,
                isAccepted: false,
                isCompleted: false,
                isDeclined: false,
              },
            };
          });
        });
        console.log(CookList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const ChangeDishStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    ChangedStatus: string
  ) => {
    e.preventDefault();
    console.log(CookList);
    changeOrderStatusTriger({
      id: id,
      body: { [ChangedStatus]: !CookList[id][ChangedStatus] },
    })
      .unwrap()
      .then((data) => {
        if (ChangedStatus === "isCompleted" || ChangedStatus === "isDeclined") {
          const ChangedCookList = CookList;
          delete ChangedCookList[id];
          setCookList(ChangedCookList);
        } else {
          setCookList({
            ...CookList,
            [id]: {
              ...CookList[id],
              [ChangedStatus]: !CookList[id][ChangedStatus],
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <h1>List of selected Dish</h1>

          {Object.values(CookList).map((post) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "15%",
              }}
            >
              <div
                style={{
                  marginLeft: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  width={560}
                  src={post.image}
                  style={{ display: "block" }}
                />
              </div>

              <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                <Typography.Title level={3}>{post.name}</Typography.Title>
                <Typography.Title level={3}>{post.comment}</Typography.Title>
                <Typography.Title level={3}>{post.quantity}</Typography.Title>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!post.isAccepted ? (
                    <Button
                      type="primary"
                      size="large"
                      style={{ display: "block" }}
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        ChangeDishStatus(e, post.id, "isAccepted");
                      }}
                    >
                      {" "}
                      Accept{" "}
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      style={{
                        backgroundColor: "rgba(0, 200, 0, 0.7)",
                        display: "block",
                      }}
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        ChangeDishStatus(e, post.id, "isCompleted");
                      }}
                    >
                      {" "}
                      Complete{" "}
                    </Button>
                  )}
                  <Button
                    type="primary"
                    danger
                    size="large"
                    style={{ display: "block" }}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      ChangeDishStatus(e, post.id, "isDeclined");
                    }}
                  >
                    {" "}
                    Decline{" "}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};
export default CookPanel;
