
import React from "react";

import { useEffect, useMemo, useState } from "react";


import { useSelector, useDispatch } from "react-redux";

import authService from "../../services/auth.service";

import {
  SetDeclinedDishesList,
  DeleteDeclinedDish,
} from "../Flowbite/redux/declinedDishes";

import { io } from "socket.io-client";

const DoneDishesList = () => {
  let user = useSelector((state) => {
    return state.user.user;
  });
  let DeclinedList = Object.values(
    useSelector((state) => {
      return state.declinedlist.declinedlist;
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

    function ProcessDeclineDish(value) {
      console.log(value.data);
      let DeclineDish = {
        [value.data.id]: value.data,
      };
      dispatch(SetDeclinedDishesList(DeclineDish));
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
        fetch(`https://waisys.dev.m0e.space/api/orders/dishes/declined`, {
          mode: "cors",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
          .then((value) => {
            return value.json();
          })
          .then((e) => {
            console.log(e);
            dispatch(SetDeclinedDishesList(e));
          })
          .catch((value) => {
            console.log(value);
          });
      });
  }, []);
  const DeleteDeclinedDish = (id) => {
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
              dispatch(DeleteDeclinedDish(id));
            } else {
              alert("Something happend");
            }
          })
          .catch((value) => {
            console.log(value);
          });
      });
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 h-full w-full md:w-96">
      <ListGroup className="w-full">
        <ListGroup.Item>DeclinedList</ListGroup.Item>
        {DeclinedList.map((post, index) => {
          return (
            <div className="task p-4" key={post.id}>
              <div className="mb-2">{post.name}</div>
              <div className="mb-2">{post.comment}</div>
              <img
                src={post.image}
                className="w-full mb-2 rounded-md"
                alt="Dish Image"
              />
              <div className="Post_text mb-2">{post.tableNumber}</div>
              <div className="w-full mb-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteDeclinedDish(post.id);
                  }}
                >
                  Ok
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
