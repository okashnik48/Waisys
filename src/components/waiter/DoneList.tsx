import React, { useMemo } from "react";

import { useEffect, useState } from "react";


import { io } from "socket.io-client";

import { useAppSelector, useAppDispatch } from "../../store/store-hooks";

import ordersService from "../../services/orders.service";

import { Button, Col, Empty, Image, Row, Spin, Typography } from "antd";

const DoneDishesList = () => {
  const dispatch = useAppDispatch();

  const socket = io("https://waisys.dev.m0e.space/", { transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data, isLoading, refetch } = ordersService.useGetCompletedDishesQuery("");
  const [setComplitedDishDoneTriger, {}] =
    ordersService.useDeleteDeliveredDishMutation();

  const DoneList = useMemo(() => {
    return data ? data : {};
  }, [data]);

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
    socket.on("waiter.dishes.complete", refetch);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiter.dishes.complete", refetch);
    };
  }, []);

  const SetComplitedDishDone = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setComplitedDishDoneTriger(id)
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Completed Dishes
        </Typography.Title>
        {isLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : Object.keys(DoneList).length === 0 ? (
          <Empty />
        ) : (
          <>
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
                  key={id}
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
                    <Typography.Title level={2}>
                      {post.quantity}
                    </Typography.Title>
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
          </>
        )}
      </div>
    </div>
  );
};
export default DoneDishesList;
