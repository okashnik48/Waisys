"use client";

import React, { useMemo } from "react";

import { useEffect, useState } from "react";

import orderService from "../../services/orders.service";

import { io } from "socket.io-client";
import { Button, Image, Typography, Col, Row, Empty } from "antd";
import { toast } from "react-toastify";

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
  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data: CookList, refetch: updateCookList} = orderService.useGetOrdersQuery(
    "",
    {
      // selectFromResult: ({ data }) => ({
      //   CookList: Object.values(data || {}).map((order: OrderDish) => ({
      //     ...order,
      //     isAccepted: false,
      //     isCompleted: false,
      //     isDeclined: false,
      //   })),
      // }),
    }
  );

  const [changeOrderStatusTriger] = orderService.usePatchOrderMutation();

  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("cook.orders.create", updateCookList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cook.orders.create", updateCookList);
    };
  }, []);

  useMemo(() => {
console.log(CookList)
  }, [CookList]);
  const ChangeDishStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    ChangedStatus: string
  ) => {
    e.preventDefault();
    changeOrderStatusTriger({
      id: id,
      body: { [ChangedStatus]: true },
    })
      .unwrap()
      .then((data) => {
        updateCookList();
        toast.success("Success")
      })
      .catch(({data}) => {
        toast.error(data.message);
      });
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <h1 >List of selected Dish</h1>
          {CookList && Object.keys(CookList).length === 0? <Empty imageStyle={{height: 400, width:  "auto"}}/>
          :
          Object.keys(CookList??{}).map((id) => {
            const post =CookList[id] 
            return (
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
                      &nbsp; Accept &nbsp;
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
          )})}
        </Col>
      </Row>
    </div>
  );
};
export default CookPanel;
