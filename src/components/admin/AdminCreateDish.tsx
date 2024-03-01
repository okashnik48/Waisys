"use client";

import React, { useMemo, useState } from "react";

import {
  Modal,
  Input,
  Select,
  Button,
  SelectProps,
  Tag,
} from "antd";

import { SetFieldNewDish, SetAddDishModal, ClearNewDish } from "../../store/slices/admin";

import FileUploader from "./DownLoadImage";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { toast } from "react-toastify";
import TagInput from "../../ui-kit/TagInput";

type TagRender = SelectProps["tagRender"];

type NewDish = {
  name: string;
  description: string;
  price: number | null;
  image: string;
  tags: Record<string, string>;
};

interface ModalType {
  modalAddDishStatus: boolean;
  modalAddUSerStatus: boolean;
}

const AdminCreateDish = () => {
  const dispatch = useAppDispatch();
  const NewDish: NewDish = useAppSelector((state) => state.admin.newDish);

  const modalStatus: ModalType = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const hasEmptyField = () => {
    return Object.values(NewDish).some((value) => !value);
  };

  const [AddDishTrigger] = adminDishesService.useCreateDishMutation();
  const { tagsProps } = adminDishesService.useGetTagsQuery("", {
    selectFromResult: ({ data }) => ({
      tagsProps: data
        ? Object.keys(data).map((tag) => ({
            value: data[tag],
            label: tag,
          }))
        : [],
    }),
  });
  const AddNewDish = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!hasEmptyField()) {
      AddDishTrigger({ body: NewDish }).then(() =>{
        dispatch(ClearNewDish(null));
      })
    } else {
      toast.info("Some fields are empty")
    }
  };
  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(SetAddDishModal({ status: false }));
  };

  return (
    <Modal
      visible={modalStatus.modalAddDishStatus}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <h2>Create new Dish</h2>
      <div style={{ minWidth: "400px", maxWidth: "600px" }}>
        <div className="space-y-6">
          <div>
            <FileUploader />
          </div>
          <div className="mb-2 block">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              onChange={(e) => {
                dispatch(
                  SetFieldNewDish({
                    value: e.target.value,
                    fieldname: "name",
                  })
                );
              }}
              value={NewDish.name}
            />
          </div>
          <div className="mb-2 block">
            <label htmlFor="description">Description</label>
            <Input.TextArea
              id="description"
              onChange={(e) => {
                dispatch(
                  SetFieldNewDish({
                    value: e.target.value,
                    fieldname: "description",
                  })
                );
              }}
              value={NewDish.description}
              autoSize
            />
          </div>
          <div className="mb-2 block">
            <label htmlFor="price">Price</label>
            <Input
              id="price"
              onChange={(e) => {
                dispatch(
                  SetFieldNewDish({
                    value: parseFloat(e.target.value),
                    fieldname: "price",
                  })
                );
              }}
              value={NewDish.price === null ? "" : NewDish.price.toString()}
            />
          </div>
          <label htmlFor="countries">Tag</label>
          <Select
            mode="multiple"
            id="countries"
            placeholder="Choose tag"
            tagRender={tagRender}
            style={{
              marginLeft: "10px",
              minWidth: "120px",
              display: "inline-block",
            }}
            dropdownStyle={{ width: "auto" }}
            onChange={(values, options) => {
              const selectedTags = options.reduce((acc, option) => {
                acc[option.label] = option.value;
                return acc;
              }, {});
              dispatch(
                SetFieldNewDish({
                  value: selectedTags,
                  fieldname: "tags",
                })
              );
            }}
            value={
              NewDish.tags
                ? Object.keys(NewDish.tags).map((tag) => ({
                    value: NewDish.tags[tag],
                    label: tag,
                  }))
                : []
            }
            options={tagsProps}
          />
  <TagInput type = "New-Dish-Tag" />
          <div className="w-full">
            <Button
              onClick={(e) => {
                e.preventDefault();
                AddNewDish(e);
              }}
            >
              Create new Dish
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AdminCreateDish;
