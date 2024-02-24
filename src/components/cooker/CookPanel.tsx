"use client";

import React, { useMemo } from "react";

import { useEffect, useState } from "react";

import orderService from "../../services/orders.service";

import { io } from "socket.io-client";
import { Button, Image, Typography, Col, Row, Empty } from "antd";

const CookPanel = () => {
  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data, refetch } =
    orderService.useGetOrdersQuery(null);

  const cooksList = useMemo(() => {
    return data ? Object.values(data) : [];
  }, [data]);

  const [changeOrderStatusTrigger] = orderService.usePatchOrderMutation();

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
    socket.on("cook.orders.create", refetch);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cook.orders.create", refetch);
    };
  }, []);

  const onChangeDishStatus = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    ChangedStatus: string
  ) => {
    changeOrderStatusTrigger({
      id: id,
      body: { [ChangedStatus]: true },
    })
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <h1>List of selected Dish</h1>
          {!cooksList.length ? (
            <Empty imageStyle={{ height: 400, width: "auto" }} />
          ) : (
            cooksList.map((post) => (
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
                        onClick={(e) => {
                          onChangeDishStatus(e, post.id, "isAccepted");
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
                        onClick={(e) => {
                          onChangeDishStatus(e, post.id, "isCompleted");
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
                      onClick={(e) => {
                        onChangeDishStatus(e, post.id, "isDeclined");
                      }}
                    >
                      {" "}
                      Decline{" "}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </Col>
      </Row>
    </div>
  );
};
export default CookPanel;
