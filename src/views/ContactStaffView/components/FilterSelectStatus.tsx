import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";
import React from "react";

type IFilterSelectStatus = Omit<ISelectOptionProps, "label" | "name" | "options">;

const FilterSelect: React.FC<IFilterSelectStatus> = (props) => {
  const options = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Resign",
      value: "Resign",
    },
    {
      label: "Leave",
      value: "Leave",
    },
  ];

  return (
    <SelectOption label="Status" name="status" type="base-select" options={options} {...props} />
  );
};

export default FilterSelect;
