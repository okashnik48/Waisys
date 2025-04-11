import React, { useMemo } from "react";

import { useEffect, useState } from "react";

import { Image, Button, Typography, Empty, Spin } from "antd";

import ordersService from "../../services/orders.service";


import { io } from "socket.io-client";
import { useAppSelector } from "../../store/store-hooks";


const DoneDishesList = () => {
  const userRole = useAppSelector((state) => state.user.user).role;
  const socket = io("https://waisys.dev.m0e.space/", { transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data, isLoading, refetch } = ordersService.useGetDeclinedDishesQuery(null);

  useEffect(() => {
    if (socket.connected) socket.disconnect();
    if (userRole != "WAITER") return;
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("waiter.dishes.decline", refetch);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiter.dishes.decline", refetch);
    };
  }, []);

  const [DeleteDeclinedDishTrigger] =
    ordersService.useDeleteDeliveredDishMutation();

  const DeclinedList = useMemo(() => {
    return data ? data : {};
  }, [data]);

  const DeleteHandler = (id: string) => {
    DeleteDeclinedDishTrigger(id);
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
          Відхилені страви
        </Typography.Title>
        {isLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : Object.keys(DeclinedList).length === 0 ? (
          <Empty />
        ) : (
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
                      onClick={() => DeleteHandler(id)}
                    >
                      Підтвердити
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
