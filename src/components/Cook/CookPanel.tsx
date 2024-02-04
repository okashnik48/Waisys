"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { ListGroup } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";


import { useAppDispatch, useAppSelector } from "../../App";
import cooklist, {
  SetDishesList,
  AcceptDish,
  CancelAcceptDish,
  CompleteDish,
} from "../Flowbite/redux/cooklist";

import authService from "../../services/auth.service";
import orderService from "../../services/orders.service"

import { io } from "socket.io-client";

type ordersGetReply = {
  orders: {
    id: number;
    dishes: {
      id: string;
      comment: string;
      quantity: number;
    }[];
    createdBy: string;
    isDone: boolean;
    tableNumber: number;
  }[];
};

type Dish = {
  id: string,
  comment: string,
  isDone: boolean,
}

const CookPanel = () => {
  const [Orders, setOtders] = useState<ordersGetReply>;

  const [CookList, setCookList] = useState<Record<string, Dish>>({})
  //let CookList = Object.values(useAppSelector((state) => state.cook.cooklist));
  const dispatch = useAppDispatch();

  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { data: orders, error: loadDishesError, isLoading: isDishesLoading, refetch: updateOrdersList } = orderService.useGetOrdersQuery('')
  const [changeOrderStatusTriger, {}] = orderService.usePatchOrderMutation()
  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: ordersGetReply) {
      console.log(value)
      value.map((order) => {
        setCookList({
          ...CookList,
          [order.id]: {
            id: order.id,
            comment: order.comment,
            isDone: order.isDone,
          },
        });
      })
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
      updateOrdersList().unwrap().then((data) => {
        console.log(data)
        data.map((order) => {
          setCookList({
            ...CookList,
            [order.id]: {
              id: order.id,
              comment: order.comment,
              isDone: order.isDone,
            },
          });
        })
      })
      .catch((error) =>{
        console.log(error)
      })

  }, []);
  const ChangeDishStatus = (id, ChangedStatus) => {
    changeOrderStatusTriger({id: id, body: {isAccepted: ChangedStatus}}).unwrap().then((data) => {
      setCookList({
        ...CookList,
        [id]: {...CookList[id], isAccepted: ChangedStatus},
      });
        console.log(data)
      })
      .catch((error) =>{
        console.log(error)
      })
  };
  return (
    <div className="flex justify-center">
      <ListGroup className="w-full md:w-1/2 lg:w-1/3">
        <ListGroup.Item className="bg-gray-800 text-white md:text-center">
          List of selected Dish
        </ListGroup.Item>
        {Object.values(CookList).map((dish, index) => {
          return (
            <div key={dish.id} className="p-4 border mb-4">
              <ListGroup.Item className="text-lg font-semibold">
                {dish.name}
              </ListGroup.Item>
              <ListGroup.Item className="text-gray-700">
                {dish.comment}
              </ListGroup.Item>
              <img
                src={dish.image}
                className="max-w-full h-auto mt-2"
                alt="Dish"
              />
              <div className="Post_text mt-2 text-gray-700">
                {dish.description}
              </div>
              <div className="text-gray-700">{dish.quantity}</div>
              <div className="flex flex-col md:flex-row md:justify-between mt-2">
                <button
                  className={`bg-blue-500 text-white p-2 mt-2 md:mr-2 ${
                    dish.isAccepted ? "hidden" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(AcceptDish({ id: dish.id }));
                    ChangeDishStatus(dish.id, "isAccepted");
                  }}
                >
                  Accept
                </button>
                <button
                  className={`bg-red-500 text-white p-2 mt-2 md:mr-2 ${
                    dish.isAccepted ? "hidden" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    ChangeDishStatus(dish.id, "isDeclined");
                  }}
                >
                  Decline
                </button>
                <button
                  className={`bg-green-500 text-white p-2 mt-2 ${
                    !dish.isAccepted ? "hidden" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(CompleteDish({ id: dish.id }));
                    ChangeDishStatus(dish.id, "isCompleted");
                  }}
                >
                  Complete
                </button>
              </div>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
};
export default CookPanel;
