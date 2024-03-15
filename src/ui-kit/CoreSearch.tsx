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
    label: "price desc",
  },

  {
    value: "priceAsc",
    label: "price asc",
  },
  {
    value: "name",
    label: "name",
  },
  {
    value: "",
    label: "none",
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
              placeholder="Search"
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
              Tag
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
            Sort by
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
