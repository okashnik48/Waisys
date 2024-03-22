"use client";

import React, { useEffect } from "react";

import { Modal, Button, Form, Typography, Input, InputNumber, Select } from "antd";

import { SetAddDishModal } from "../../store/slices/admin";

import FileUploader from "./DownLoadImage";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import TagInput from "../../ui-kit/TagInput";

import CorePriceInput from "../../ui-kit/CorePriceInput";

import AdminDishesTypes from "../../store/types/admin-types/adminDishes-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CoreInputRequired } from "../../ui-kit/CoreInputRequired";
import { CoreInputTextArea } from "../../ui-kit/CoreInputTextAria";
import { TagSelect } from "../../ui-kit/TagSelect";

import { currencyOptions, currencyOptionsMark } from "../../configs/SelectPatern";

import { suffixSelector } from "../../ui-kit/Ant-Design-Form/CorePriceInputAnt";

import ImageUploader from "./ui-kit/ImageUploader";

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

  const [form] = Form.useForm<DefaultValues>();

  const { control, handleSubmit, setValue, getValues } = useForm<DefaultValues>(
    {
      defaultValues: NewDishProps,
    }
  );
  const [AddDishTrigger] = adminDishesService.useCreateDishMutation();
  const onSubmit: SubmitHandler<DefaultValues> = (formData) => {
    AddDishTrigger({ body: formData }).then(() => {});
    console.log(formData);
  };

  const onSubmitAndDesign = (value: DefaultValues) => {
    console.log(value);
    
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(SetAddDishModal({ status: false }));
  };

useEffect(() =>{
  console.log()
}, [Form.useWatch("price", form)])

  

  return (
    <Modal
      visible={modalStatus.modalAddDishStatus}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <h2>Create new Dish</h2>
      <div style={{ minWidth: "400px", maxWidth: "600px" }}>
        <Form
          onFinish={(value) => onSubmitAndDesign(value)}
          form={form}
          initialValues={{
            name: "",
            description: "",
            price: {
              value: null,
              currency: "UAN"
            },
            image: "",
          }}
        >
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please input dish name!" }]}
          >
            <ImageUploader setValue = {form.setFieldValue as any}/>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "16px" }}
            name="name"
            rules={[{ required: true, message: "Please input dish name!" }]}
          >
            <Input size="large" placeholder="Dish Name" type="text" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea placeholder="Description" size="large" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please set price!" }]}
            name="price"
          >
            <InputNumber
              name="price"
              placeholder="Enter Price"
              size="large"
              type="number"
              prefix={currencyOptionsMark[Form.useWatch("price.currency", form)]}
              style={{ width: "100%" }}
              addonAfter={<Form.Item name="currency" noStyle>
              <Select style={{ width: 70 }} onChange={(e) => form.setFieldValue("price.currency", e.values)}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
                <Select.Option value="GBP">GBP</Select.Option>
                <Select.Option value="CNY">CNY</Select.Option>
                <Select.Option value="UAH">UAH</Select.Option>
              </Select>
            </Form.Item>}
            />
          </Form.Item>
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
