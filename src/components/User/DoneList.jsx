"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { ListGroup } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";

import {
  addTableNumber,
  removeSelectedPost,
} from "../Flowbite/redux/SelectedPosts";
import { useSelector, useDispatch } from "react-redux";
import { SetTokens, SetUserProperties } from "../Flowbite/redux/user";

import { fetchEventSource } from "@microsoft/fetch-event-source";

import { SetDoneDishesList, DeleteDoneList } from "../Flowbite/redux/donelist";

import { io } from "socket.io-client";

const DoneDishesList = () => {
  let user = useSelector((state) => {
    return state.user.user;
  });
  let DoneList = Object.values(
    useSelector((state) => {
      return state.donelist.donelist;
    })
  );
  const dispatch = useDispatch();

  const socket = io({ transports: ["websocket"] });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("Connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
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

  const SetComplitedDishDone = (e, id) => {
    e.preventDefault();
    fetch(`https://waisys.dev.m0e.space/api/auth/refreshToken`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.refreshToken}` },
    })
      .then((value) => {
        let obj = value.json().then((e) => {
          return e;
        });
        return obj;
      })
      .then((obj) => {
        dispatch(SetTokens(obj));
      })
      .then(() => {
        fetch(`https://waisys.dev.m0e.space/api/orders/dishes/${id}`, {
          mode: "cors",
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
          .then((e) => {
            console.log(e);
            if (e.ok) {
              dispatch(DeleteDoneList(id));
            } else {
              alert("Something happend");
            }
          })
          .catch((value) => {
            console.log(value);
          });
      });
  };
  useEffect(() => {
    fetch(`https://waisys.dev.m0e.space/api/auth/refreshToken`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.refreshToken}` },
    })
      .then((value) => {
        let obj = value.json().then((e) => {
          return e;
        });
        return obj;
      })
      .then((obj) => {
        dispatch(SetTokens(obj));
      })
      .then(() => {
        fetch(`https://waisys.dev.m0e.space/api/orders/dishes/completed`, {
          mode: "cors",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
          .then((value) => {
            return value.json();
          })
          .then((e) => {
            console.log(e);
            dispatch(SetDoneDishesList(e));
            setTimeout(() => {
              console.log(DoneList);
            }, 2000);
          })
          .catch((value) => {
            console.log(value);
          });
      });
  }, []);
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 h-full w-full md:w-96">
      <ListGroup className="w-full">
        <ListGroup.Item>Done Dishes</ListGroup.Item>
        {DoneList.map((post, index) => {
          console.log(12312312);
          let ID = post.id;
          return (
            <div className="task p-4" key={post.id}>
              <div className="mb-2">{post.name}</div>
              <div className="mb-2">{post.comment}</div>
              <img
                src={post.image}
                className="w-full mb-2 rounded-md"
                alt="Dish Image"
              />
              <div className="Post_text mb-2">{post.description}</div>
              <div className="Post_text mb-2">{post.tableNumber}</div>
              <div className="w-full mb-2">
                <Button onClick={(e) => SetComplitedDishDone(e, post.id)}>
                  Delivered
                </Button>
              </div>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
};
export default DoneDishesList;
// const ctrl = new AbortController();

// const evtSource = new fetchEventSource("https://waisys.dev.m0e.space/api/orders/dishes/sseCompleted", {headers: { Authorization: `Bearer ${user.accessToken}`, signal: ctrl.signal}, onmessage(msg){
//   if (msg.event == 'waiter.dishes.complete'){
//     console.log(msg)
//     dispatch(SetDoneDishesList(msg.data))
//   }
// } });
