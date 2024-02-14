"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { Modal, Input, Select, Button } from "antd";

import { SetFieldNewDish, SetAddDishModal } from "../../store/slices/admin";

import FileUploader from "../../modules/DownLoadImage";

import adminDishesService from "../../services/admin/admin-dishes.service";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";

type NewDish = {
  name: string;
  description: string;
  price: number | null;
  image: string;
  tags: string;
};

interface ModalType {
  modalAddDishStatus: boolean;
  modalAddUSerStatus: boolean;
}

const AdminAddDish = () => {
  const dispatch = useAppDispatch();
  let NewDish: NewDish = useAppSelector((state) => state.admin.newDish);

  let modalStatus: ModalType = useAppSelector((state) => {
    return state.admin.modalStatus;
  });

  const hasEmptyField = () => {
    return Object.values(NewDish).some((value) => !value);
  };

  const [AddDishTriger, {}] = adminDishesService.useCreateDishMutation();

  const AddNewDish = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!hasEmptyField()) {
      AddDishTriger({ body: NewDish })
        .unwrap()
        .then((data) => {
          console.log(data);
        });
    } else {
      alert("Some fields are empty");
    }
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
          <div>
            <label htmlFor="countries">Tag</label>
            <Select
              id="countries"
              onChange={(value) => {
                dispatch(
                  SetFieldNewDish({
                    value,
                    fieldname: "tags",
                  })
                );
              }}
              value={NewDish.tags[0] || "none"}
            >
              <Select.Option value="none">none</Select.Option>
              <Select.Option value="cold">cold</Select.Option>
              <Select.Option value="hot">hot</Select.Option>
              <Select.Option value="salad">salad</Select.Option>
              <Select.Option value="drink">drink</Select.Option>
            </Select>
          </div>
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
export default AdminAddDish;
