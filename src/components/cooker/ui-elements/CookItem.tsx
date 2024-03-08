import React from "react";

import { OrderDish } from "../../../services/orders.service";
import { Typography, Image, Button } from "antd";
import ordersService from "../../../services/orders.service";

interface Props{
    post: OrderDish
}

export const CookItem: React.FC<Props>= ({post}) =>{
    const [changeOrderStatusTrigger] = ordersService.usePatchOrderMutation();
    const onChangeDishStatus = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        id: string,
        ChangedStatus: string
      ) => {
        changeOrderStatusTrigger({
          id: id,
          body: { [ChangedStatus]: true },
        });
      };
    return (
        <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15%",
            }}
          >
            <div
              style={{
                marginLeft: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                width={560}
                src={post.image}
                style={{ display: "block" }}
              />
            </div>

            <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
              <Typography.Title level={3}>{post.name}</Typography.Title>
              <Typography.Title level={3}>{post.comment}</Typography.Title>
              <Typography.Title level={3}>{post.quantity}</Typography.Title>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!post.isAccepted ? (
                  <Button
                    type="primary"
                    size="large"
                    style={{ display: "block" }}
                    onClick={(e) => {
                      onChangeDishStatus(e, post.id, "isAccepted");
                    }}
                  >
                    &nbsp; Accept &nbsp;
                  </Button>
                ) : (
                  <Button
                    size="large"
                    style={{
                      backgroundColor: "rgba(0, 200, 0, 0.7)",
                      display: "block",
                    }}
                    onClick={(e) => {
                      onChangeDishStatus(e, post.id, "isCompleted");
                    }}
                  >
                    {" "}
                    Complete{" "}
                  </Button>
                )}
                <Button
                  type="primary"
                  danger
                  size="large"
                  style={{ display: "block" }}
                  onClick={(e) => {
                    onChangeDishStatus(e, post.id, "isDeclined");
                  }}
                >
                  {" "}
                  Decline{" "}
                </Button>
              </div>
            </div>
          </div>
    )
}