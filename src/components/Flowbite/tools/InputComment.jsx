"use client";

import "../../../styles/Tailwind.css";
import {TextInput } from "flowbite-react";

import React from "react";
import { useState } from "react";

const InputComment = (props) => {
    const [comment, setComment] = useState();
    return(
        <div comment = {comment}>
            <TextInput
            id="Coment"
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
            placeholder="Comment"
            required
            />
        </div>
    )
}
export default InputComment;