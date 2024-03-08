import { Avatar, Button, Card, Tag, Image, Typography } from "antd";
import React from "react";

import {
  CommentOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Dish } from "../waiter/Dishes";

interface Props {
  post: Dish;
}

const { Meta } = Card;

export const UserDishCard = ({ post }: Props) => {
  console.log(post);
  return (
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
            <Image alt={post.name} src={post.image} width={590} height={440} />
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
        <CommentOutlined
          style={{ fontSize: "200%" }}
          onClick={() => console.log("52")}
          key="setting"
        />,
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="middle" icon={<MinusOutlined />} />
          <h1>{post.count}</h1>
          <Button size="middle" icon={<PlusOutlined />} />
        </div>,
        <ShoppingCartOutlined style={{ fontSize: "200%" }} key="cart" />,
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
  );
};
