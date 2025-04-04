import React from "react";
import DishesTypes from "../../store/types/dishes-types";
import { useAppDispatch } from "../../store/store-hooks";
import postService from "../../services/dishes.service";
import { addSelectedPost } from "../../store/slices/selected-posts";
import {
    Image,
    Input,
    Select,
    Button,
    Typography,
    Card,
    Spin,
    Empty,
    Tag,
  } from "antd";
import DishCounter from "./DishCounter";
  
interface Props {
  post: DishesTypes.DishForList;
  index: number;
}
export const WaiterDishCard = ({post, index}: Props) =>{
    const dispatch = useAppDispatch();
    const ChangeFieldDish = (
        index: number,
        label: "comment" | "count",
        value: string | number
      ) => {
        dispatch(
          postService.util.updateQueryData("dishes", null, (draftPost) => {
            if (label === "comment") {
              draftPost[index].comment = value as string;
            } else {
              draftPost[index].count = value as number;
            }
          })
        );
      };
    
      const AddDish = () => {
        const selectedPostId = crypto.randomUUID();
        const NewSelectedPost: DishesTypes.SelectedDishForList = {
          ...post,
          selectedPostId: selectedPostId,
        };
        dispatch(
          addSelectedPost({ post: NewSelectedPost, listId: selectedPostId })
        );
        ChangeFieldDish(index, "comment", "");
        ChangeFieldDish(index, "count", 1);
      };
      return (
        <Card key={post.id}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography.Title level={2}>
                          {post.name}
                        </Typography.Title>
                      </div>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Image alt={post.name} src={post.image} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                          style={{ marginLeft: "10px" }}
                        >
                          {" "}
                          {`Price: ${post.price.value} ${post.price.currency}`}{" "}
                        </Typography.Title>
                      </div>
                      <Typography.Title
                        level={4}
                        style={{ marginLeft: "10px", textAlign: "center" }}
                      >
                        {post.description}
                      </Typography.Title>
                      <div
                        style={{
                          margin: "0 auto",
                          width: "200px",
                          marginTop: "40px",
                        }}
                      >
                        <Input
                          id="Coment"
                          value={post.comment}
                          onChange={(e) =>
                            ChangeFieldDish(index, "comment", e.target.value)
                          }
                          placeholder="Коментар"
                          required
                          size="large"
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography.Title level={3}>Кількість:</Typography.Title>
                          <DishCounter post={post} index={index} />
                        </div>
                        <Button
                          size="large"
                          style={{
                            backgroundColor: "rgba(0, 200, 0, 0.7)",
                            marginTop: "10px",
                            width: "100%",
                          }}
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => AddDish()}
                        >
                          Додати
                        </Button>
                      </div>
                    </Card>
      )

}