"use client";

import React from "react";

import {
  Modal,
  Button,
  Form,
  Typography,
} from "antd";

import {
  SetAddDishModal,
} from "../../store/slices/admin";

import FileUploader from "./DownLoadImage";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import TagInput from "../../ui-kit/TagInput";

import CorePriceInput from "../../ui-kit/CorePriceInput";

import AdminDishesTypes from "../../store/types/admin-types/adminDishes-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CoreInputRequired } from "../../ui-kit/CoreInputRequired";
import { CoreInputTextAria } from "../../ui-kit/CoreInputTextAria";
import { TagSelect } from "../../ui-kit/TagSelect";

type DefaultValues = AdminDishesTypes.Dish;

interface ModalType {
  modalAddDishStatus: boolean;
  modalAddUSerStatus: boolean;
}

const NewDishProps = {
  name: "",
  description: "",
  price: {
    value: null,
    currency: "UAH",
  },
  image: "",
  tags: {},
};

const AdminCreateDish = () => {
  const dispatch = useAppDispatch();
  const modalStatus: ModalType = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const { control, handleSubmit, setValue, getValues } = useForm<DefaultValues>(
    {
      defaultValues: NewDishProps,
    }
  );
  const [AddDishTrigger] = adminDishesService.useCreateDishMutation();
  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
          AddDishTrigger({ body: formData }).then(() => {
      });
      console.log(formData)
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
        <Form onFinish={handleSubmit(onSubmit)}>
        <FileUploader SetValue = {setValue} />
          <div style={{ marginBottom: "16px" }}>
            <CoreInputRequired
              name="name"
              size="large"
              control={control}
              label=""
              placeholder="Dish Name"
              type="text"
              rules={[{ required: true, message: "Please input dish name!" }]}
            />
          </div>
          <CoreInputTextAria
            name="description"
            control={control}
            placeholder="Description"
            label=""
            type="text"
            size="large"
            rules={[{ required: true, message: "Please input description!" }]}
          />
          <CorePriceInput
            control={control}
            label=""
            name="price"
            placeholder="Enter Price"
            size="large"
            type="number"
            rules={[{ required: true, message: "Please set price!" }]}
          />
          <div>
            <div style={{ display: "block" }}>
              <Typography.Title level={5} style={{ display: "inline-block" }}>
                Tag
              </Typography.Title>
              <TagSelect control={control} name={"tags"} />
            </div>
            <TagInput SetTagValueForDish={setValue} GetTagsValues={getValues} />
          </div>
          <Button type="primary" htmlType="submit">
            Create new Dish
          </Button>
        </Form>

      </div>
    </Modal>
  );
};
export default AdminCreateDish;
