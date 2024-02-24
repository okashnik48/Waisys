import React, { FC, useMemo } from "react";

import { useState } from "react";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { Empty, ColorPicker, Button, Space, Input } from "antd";
import { toast } from "react-toastify";

type TagOptions = {
  name: string;
  color: string;
};

const AdminTagsList: FC = () => {
  const { data } = adminDishesService.useGetTagsQuery("");
  const [ChangeTagsTrigger] = adminDishesService.useChangeTagsMutation();
  const [DeleteTagTrigger] = adminDishesService.useDeleteTagMutation();
  const [AddTagTrigger] = adminDishesService.useAddTagMutation();
  // const [tagsList, setTagsList] = useState<Record<string, string>>({});
  const [customTag, setCustomTag] = useState<TagOptions>({
    name: "",
    color: "#2B84DB",
  });

  const tagsList = useMemo(() => {
    return data ? data : {};
  }, [data]);

  const ChangeHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    label: string
  ) => {
    e.preventDefault();
    ChangeTagsTrigger({ [label]: tagsList[label] })
      .then(() => {
        toast.success("Success");
      })
      .catch(({ data }) => {
        toast.error(data.error);
      });
  };

  const DeleteTagHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    label: string
  ) => {
    e.preventDefault();
    DeleteTagTrigger(label)
      .unwrap()
      .then(() => {
        console.log(tagsList);
        setTagsList((prevProps) => {
          const updatedTagsList = { ...prevProps };
          delete updatedTagsList[label];
          return updatedTagsList;
        });

        toast.success("Success");
      })
      .catch(({ data }) => {
        toast.error(data.error);
      });
  };
  const AddTagHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    AddTagTrigger(customTag)
      .then(() => {
        toast.success("Success");
        setTagsList((prevProps) => {
          return {
            ...prevProps,
            [customTag.name]: customTag.color,
          };
        });
        setCustomTag({ name: "", color: "#2B84DB" });
      })
      .catch(({ data }) => {
        toast.error(data.error);
      });
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
          return (
            <div>
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
                    setTagsList((prevProps) => {
                      return {
                        ...prevProps,
                        [label]: `#${currentColor.toHex()}`,
                      };
                    });
                  }}
                />
                <Button
                  type="primary"
                  onClick={(e) => {
                    ChangeHandler(e, label);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={(e) => {
                    DeleteTagHandler(e, label);
                  }}
                >
                  Delete
                </Button>
              </Space>
            </div>
          );
        })
      )}
      <Space>
        <Input
          style={{ width: "100px" }}
          placeholder="Custom tag"
          value={customTag.name}
          onChange={(e) => {
            e.preventDefault();
            setCustomTag({
              ...customTag,
              name: e.target.value,
            });
          }}
        />
        <ColorPicker
          style={{
            display: "inline-block",
            marginLeft: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
          value={customTag.color}
          onChange={(currentColor) => {
            const updatedCustomTag = {
              ...customTag,
              color: `#${currentColor.toHex()}`,
            };
            setCustomTag(updatedCustomTag);
          }}
        />
        <Button
          type="primary"
          disabled={customTag.name === "" ? true : false}
          style={{ marginLeft: "5px" }}
          onClick={AddTagHandler}
        >
          add
        </Button>
      </Space>
    </div>
  );
};

export default AdminTagsList;
