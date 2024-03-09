import { Card, Tag, Image, Typography, Badge } from "antd";
import React, { useState } from "react";

import { CommentOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import DishCounter from "../waiter/DishCounter";
import CommentForm from "./CommentForm";
import { useAppDispatch } from "../../store/store-hooks";
import { addSelectedPostQuest } from "../../store/slices/guest";
import DishesTypes from "../../store/types/dishes-types";

interface Props {
  post: DishesTypes.Dish;
  index: number;
}

const { Meta } = Card;

export const UserDishCard = ({ post, index }: Props) => {
  const dispatch = useAppDispatch();

  const [isCommentFormVisible, setIsCommentFormVisible] =
    useState<boolean>(false);
  const handlerAddDish = () => {
    const selectedPostId = crypto.randomUUID();
    const NewSelectedPost: DishesTypes.SelectedDish = {
      ...post,
      selectedPostId: selectedPostId,
    };
    dispatch(
      addSelectedPostQuest({ post: NewSelectedPost, listId: selectedPostId })
    );
  };
  return (
    <>
      <Card
        style={{
          width: "600px",
          flexDirection: "column",
          height: "auto",
          margin: "5px",
        }}
        title={
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {post.name}
          </h2>
        }
        cover={
          <div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                alt={post.name}
                src={post.image}
                width={590}
                height={440}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "10px",
              }}
            >
              <div style={{ display: "block" }}>
                {Object.keys(post.tags).map((label) => (
                  <Tag
                    key={label}
                    color={post.tags[label]}
                    style={{
                      fontSize: "16px",
                      padding: "8px 12px",
                      display: "inline-block",
                    }}
                  >
                    {label}
                  </Tag>
                ))}
              </div>
              <Typography.Title
                level={3}
                style={{
                  marginLeft: "10px",
                  marginBottom: "20px",
                  marginRight: "10px",
                }}
              >
                {" "}
                {`Price: ${post.price.value} ${post.price.currency}`}{" "}
              </Typography.Title>
            </div>
          </div>
        }
        actions={[
          <div style={{ marginTop: "20%" }}>
            <Badge dot={post.comment ? true : false} status="success">
              <CommentOutlined
                style={{ fontSize: "200%" }}
                onClick={() => setIsCommentFormVisible(true)}
                key="setting"
              />
            </Badge>
          </div>,
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DishCounter post={post} index={index} />
          </div>,
          <div style={{ marginTop: "20%" }}>
            <ShoppingCartOutlined
              style={{ fontSize: "200%" }}
              onClick={handlerAddDish}
              key="cart"
            />
          </div>,
        ]}
      >
        <Meta
          title={
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Description
            </h3>
          }
          description={
            <p style={{ fontSize: "20px", width: "100%", height: "300px" }}>
              {post.description}
            </p>
          }
        />
      </Card>
      <CommentForm
        isVisible={isCommentFormVisible}
        setIsVisible={setIsCommentFormVisible}
        comment={post.comment}
        index={index}
      />
    </>
  );
};
