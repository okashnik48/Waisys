import React, { useMemo } from "react";
import { Control, Controller, FieldValues, Path, useController } from "react-hook-form";
import adminDishesService from "../services/admin/admin-dishes.service";
import { Select, SelectProps, Tag } from "antd";

type TagRender = SelectProps["tagRender"];

type TagSelectProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
};

export function TagSelect<T extends FieldValues>({
  control,
  name,
}: TagSelectProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const { tagsList, colorMask } = adminDishesService.useGetTagsQuery("", {
    selectFromResult: ({ data }) => ({
      tagsList: data
        ? Object.keys(data).map((tag) => ({
            value: tag,
            label: tag,
          }))
        : [],
        colorMask: data? data : {}
    }),
  });
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const tagRender: TagRender = (params) => {
    return (
        <Tag
          onMouseDown={onPreventMouseDown}
          style={{ marginRight: 3 }}
          color={colorMask[params.label as string]}
          closable={params.closable}
          onClose={params.onClose}
        >
          {params.label}
        </Tag>
    );
  };

  return (
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
        const selectedTags = (
          options as Array<{ value: string; label: string }>
        ).reduce((acc, option) => {
          acc[option.label] = colorMask[option.value];
          return acc;
        }, {} as Record<string, string>);
        onChange(selectedTags);
      }}
      value={
        value
          ? Object.keys(value).map((tag) => ({
              value: tag,
              label: tag,
            }))
          : []
      }
      options={tagsList}
    />
  );
}
