import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";

type ISelectPositionTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const PositionOptions: SelectOptionType[] = [
  {
    label: "Staff",
    value: "Staff",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Head of Department",
    value: "Head of Department",
  },
  {
    label: "Senior Manager",
    value: "Senior Manager",
  },
];

const SelectPosition: React.FC<ISelectPositionTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={PositionOptions}
      placeholder="Pilih Posisi Karyawan"
      label="Position"
      name="position"
      {...props}
    />
  );
};

export default SelectPosition;
