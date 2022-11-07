import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectIdentityTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const identityTypeOptions: SelectOptionType[] = [
  {
    label: "KTP",
    value: "KTP",
  },
  {
    label: "SIM",
    value: "SIM",
  },
  {
    label: "Paspor",
    value: "Paspor",
  },
];

const SelectIdentityType: React.FC<ISelectIdentityTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={identityTypeOptions}
      label="Tipe Identitas"
      name="identityType"
      placeholder="Pilih Identitas"
      {...props}
    />
  );
};

export default SelectIdentityType;
