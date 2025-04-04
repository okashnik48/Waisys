import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Typography, Input, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useAppSelector } from "../store/store-hooks";
import { dishesTagsOptionsSelector } from "../store/slices/dishes-tags-hooks";

export type Props = {
  control: any;
};

const SortOptionProps = [
  {
    value: "priceDesc",
    label: "ЦІна по спаданню",
  },

  {
    value: "priceAsc",
    label: "Ціна по зростанню",
  },
  {
    value: "name",
    label: "Назва",
  },
  {
    value: "",
    label: "Без сортування",
  },
];

export const CoreSearch = ({ ...rest }: Props) => {
  const tagsOptions = useAppSelector(dishesTagsOptionsSelector);
  console.log(tagsOptions)
  return (
    <div className="input-container">
      <Controller
        name={"searchText"}
        control={rest.control}
        render={({ field }) => {
          return (
            <Input.Search
              id="search"
              {...field}
              placeholder="Пошук"
              size="large"
            />
          );
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <div>
            <Typography.Title
              level={3}
              style={{ marginBottom: "5px", display: "inline-block" }}
            >
              Тег
            </Typography.Title>
            <Controller
              name={"searchTags"}
              control={rest.control}
              render={({ field }) => {
                return (
                  <Select
                    id="tags"
                    mode="multiple"
                    {...field}
                    style={{
                      minWidth: "150px",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                    options={tagsOptions}
                  />
                );
              }}
            />
          </div>
        </div>

        <div>
          <Typography.Title
            level={3}
            style={{ marginBottom: "5px", display: "inline-block" }}
          >
            Сортувати
          </Typography.Title>
          <Controller
            name={"sortOption"}
            control={rest.control}
            render={({ field }) => {
              return (
                <Select
                  id="sort"
                  style={{
                    minWidth: "150px",
                    display: "inline-block",
                    marginLeft: "10px",
                  }}
                  {...field}
                  options={SortOptionProps}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
