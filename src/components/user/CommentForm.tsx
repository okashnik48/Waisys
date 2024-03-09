"use client";

import React from "react";

import { Modal, Input, Select, Button } from "antd";
import { useAppDispatch } from "../../store/store-hooks";
import postService from "../../services/dishes.service";

interface Props {
  isVisible: boolean;
  setIsVisible: any;
  comment: string;
  index: number;
}

const CommentForm = ({ isVisible, setIsVisible, comment, index }: Props) => {
  const dispatch = useAppDispatch();
  const ChangeCommentDish = (value: string) => {
    dispatch(
      postService.util.updateQueryData("dishes", null, (draftPost) => {
        draftPost[index].comment = value;
      })
    );
  };
  return (
    <Modal
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      width={600}
    >
      <h2 style={{ textAlign: "center" }}>Your comment </h2>
      <Input.TextArea
        placeholder="Write your comment"
        value={comment}
        autoSize
        onChange={(e) => ChangeCommentDish(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Button type="primary" onClick={() => setIsVisible(false)}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
export default CommentForm;
