import React from "react";

import DishesTypes from "../../../store/types/dishes-types";
import { Image, Button, Typography } from "antd";
import { removeSelectedPostQuest } from "../../../store/slices/guest";
import { useAppDispatch } from "../../../store/store-hooks";

type Props = {
    post: DishesTypes.SelectedDishForList
}

export const SelectedPostItem = ({post}: Props) =>{
    const dispatch = useAppDispatch();
    
    const DeleteDish = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        dispatch(removeSelectedPostQuest({ listId: id }));
      };
    return (
        <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          marginBottom: "1rem",
        }}
        key={post.id}
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
          <Button
            type="primary"
            danger
            size="large"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              DeleteDish(e, post.selectedPostId)
            }
          >
            Delete
          </Button>
          <Typography.Title level={2}>{post.count}</Typography.Title>
        </div>
      </div>
    )

}