import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectProfileTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const profileTypeOptions: SelectOptionType[] = [
  {
    label: "Personal",
    value: "Personal",
  },
  {
    label: "Corporate",
    value: "Corporate",
  },
];

const SelectProfileType: React.FC<ISelectProfileTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={profileTypeOptions}
      label="Tipe Profil"
      name="profileType"
      placeholder="Pilih Tipe Profil"
      {...props}
    />
  );
};

export default SelectProfileType;
