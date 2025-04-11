import React, { FC, useMemo } from "react";

import DishesTagsService from "../../services/dishes-tags.service";
import { Empty, ColorPicker, Button, Space } from "antd";
import TagInput from "../../ui-kit/TagInput";

const AdminTagsList: FC = () => {
  const { data } = DishesTagsService.useGetTagsQuery(null);
  const [ChangeTagsTrigger] = DishesTagsService.useChangeTagsMutation();
  const [DeleteTagTrigger] = DishesTagsService.useDeleteTagMutation();
  
  const tagsList = useMemo(() => {
    
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
      <h1>Список тегів</h1>
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
                  Підтвердити
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={(e) => DeleteTagHandler(label)}
                >
                  Видалити
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
