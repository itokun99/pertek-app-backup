import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";

type ISelectStatusTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const StatusOptions: SelectOptionType[] = [
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

const SelectStatus: React.FC<ISelectStatusTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={StatusOptions}
      label="Status"
      name="status"
      placeholder="Pilih Status Karyawan"
      {...props}
    />
  );
};

export default SelectStatus;
