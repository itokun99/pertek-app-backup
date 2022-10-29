import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectResidentStatusProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const residentStatusOptions: SelectOptionType[] = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Verified",
    value: "Verified",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
];

const SelectResidentStatus: React.FC<ISelectResidentStatusProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={residentStatusOptions}
      label="Resident Status"
      name="residentStatus"
      placeholder="Pilih Resident Status"
      {...props}
    />
  );
};

export default SelectResidentStatus;
