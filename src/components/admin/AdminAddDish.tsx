"use client";

import "../../styles/Tailwind.css";

import React from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useAppDispatch, useAppSelector } from "../../App";

import { SetFieldNewDish, SetAddDishModal} from "../Flowbite/redux/admin"

import FileUploader from "../../modules/DownLoadImage";

import adminDishesService from "../../services/admin/adminDishes.service"

type User = {
  accessToken: string;
  refreshToken: string;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
}

type NewDish = {
  name: string,
  description: string,
  price: number | null,
  image: string,
  tags: string    
}

interface Modal {
  modalAddDishStatus: boolean,
  modalAddUSerStatus: boolean,
}

const AdminAddDish = () => {
  const dispatch = useAppDispatch();
  let NewDish: NewDish = useAppSelector((state) => {
    return state.admin.newDish;
  });
  let user: User = useAppSelector((state) => {
    return state.user.user;
  });

  let modalStatus: Modal = useAppSelector((state) =>{
    return state.admin.modalStatus
  })

  const hasEmptyField = () => {
    return Object.values(NewDish).some((value) => !value);
  };

  const [AddDishTriger, {}] = adminDishesService.useCreateDishMutation();

  const AddNewDish = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!hasEmptyField()) {
              AddDishTriger({body: NewDish}).unwrap().then((data) => {
                console.log(data);
              });
    } else {
      alert("Some fields are empty");
    }
  };


  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(SetAddDishModal({ status: false }));
  };

  return (
    <Dialog open={modalStatus.modalAddDishStatus} onClose={handleClose} maxWidth="md">
      <DialogTitle>Create new Dish</DialogTitle>
      <DialogContent style={{ minWidth: '400px', maxWidth: '600px' }}>
        <div className="space-y-6">
          <div>
            <FileUploader />
          </div>
          <div>
            <div className="mb-2 block">
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
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
                fullWidth
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
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
                fullWidth
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
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
                fullWidth
              />
            </div>
          </div>
          <div>
            <InputLabel htmlFor="countries">Tag</InputLabel>
            <Select
              id="countries"
              onChange={(e) => {
                dispatch(
                  SetFieldNewDish({
                    value: [e.target.value],
                    fieldname: "tags",
                  })
                );
              }}
              value={NewDish.tags[0] || "none"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <MenuItem value="none">none</MenuItem>
              <MenuItem value="cold">cold</MenuItem>
              <MenuItem value="hot">hot</MenuItem>
              <MenuItem value="salad">salad</MenuItem>
              <MenuItem value="drink">drink</MenuItem>
            </Select>
          </div>
          <div className="w-full">
            <Button onClick={(e) => {
              e.preventDefault();
              AddNewDish(e);
            }}>
              Create new Dish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AdminAddDish;
