import React, { FC, useMemo } from "react";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { Empty, ColorPicker, Button, Space } from "antd";
import TagInput from "../../ui-kit/TagInput";

const AdminTagsList: FC = () => {
  const { data } = adminDishesService.useGetTagsQuery("");
  const [ChangeTagsTrigger] = adminDishesService.useChangeTagsMutation();
  const [DeleteTagTrigger] = adminDishesService.useDeleteTagMutation();
  
  const tagsList = useMemo(() => {
    console.log(data)
    if (data){
      return data;
    }
    else {
      return {}
    }
    }, [data]);

  const ChangeHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    label: string,
    color: string
  ) => {
    ChangeTagsTrigger({ [label]: color });
  };

  const DeleteTagHandler = (label: string) => {
    DeleteTagTrigger(label);
  };
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>Tag List</h1>
      {tagsList === undefined ? (
        <Empty />
      ) : (
        Object.keys(tagsList).map((label) => {
          let color = tagsList[label];
          return (
            <div key = {label}>
              <Space>
                <h3>{label}</h3>
                <ColorPicker
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  defaultValue={tagsList[label]}
                  onChangeComplete={(currentColor) => {
                    color = `#${currentColor.toHex()}`;
                  }}
                />
                <Button
                  type="primary"
                  onClick={(e) => {
                    ChangeHandler(e, label, color);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={(e) => DeleteTagHandler(label)}
                >
                  Delete
                </Button>
              </Space>
            </div>
          );
        })
      )}
      <TagInput></TagInput>
    </div>
  );
};

export default AdminTagsList;
