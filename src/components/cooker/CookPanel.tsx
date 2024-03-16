"use client";

import React, { useMemo } from "react";

import { useEffect, useState } from "react";

import orderService from "../../services/orders.service";

import { io } from "socket.io-client";
import { Empty, Spin } from "antd";

import { CookItem } from "./ui-elements/CookItem";

const CookPanel = () => {
  const socket = io("https://waisys.dev.m0e.space/", {
    transports: ["websocket"],
  });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data, refetch, isLoading } = orderService.useGetOrdersQuery(null);

  const cooksList = useMemo(() => {
    return data
      ? Object.values(data).sort(
          (a, b) =>
            new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()
        )
      : [];
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
    socket.on("cook.orders.create", () => {
      refetch();
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cook.orders.create", () => {
        refetch();
      });
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Dishes</h1>
      {isLoading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : !cooksList.length ? (
        <Empty />
      ) : (
        cooksList.map((post) => <CookItem key={post.id} post={post} />)
      )}
    </div>
  );
};
export default CookPanel;
