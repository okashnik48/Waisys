"use client";

import "../../../styles/Tailwind.css";

import { useDispatch } from "react-redux";
import { counterDecrement, counterIncrement } from "../redux/posts";

import React from "react";
import { useState } from "react";

const Counter = ({post}) => {

  const dispatch = useDispatch();
  const decrement = (e) => {
    e.preventDefault();
    if (post.count != 1) {
      dispatch(counterDecrement({id: post.id}));
    }
  };
  const increment = (e) => {
    e.preventDefault();
    dispatch(counterIncrement({id: post.id}));
  };
  return (
<div class="custom-number-input sm:w-32">
  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
    <button
      onClick={decrement}
      data-action="decrement"
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 sm:w-12 rounded-l cursor-pointer outline-none"
    >
      <span class="m-auto text-xl font-thin">−</span>
    </button>
    <input
      type="number"
      class="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
      name="custom-input-number"
      value={post.count}
    ></input>
    <button
      onClick={increment}
      data-action="increment"
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 sm:w-12 rounded-r cursor-pointer"
    >
      <span class="m-auto text-xl font-thin">+</span>
    </button>
  </div>
</div>
  );
};
export default Counter;
