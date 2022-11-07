import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectFamilyStatusProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const familyStatusOptions: SelectOptionType[] = [
  {
    label: "Husband",
    value: "Husband",
  },
  {
    label: "Spouse",
    value: "Spouse",
  },
  {
    label: "Child",
    value: "Child",
  },
  {
    label: "Family",
    value: "Family",
  },
  {
    label: "Assistant",
    value: "Assistant",
  },
];

const SelectFamilyStatus: React.FC<ISelectFamilyStatusProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={familyStatusOptions}
      label="Family Status"
      name="familyStatus"
      placeholder="Pilih Family Status"
      {...props}
    />
  );
};

export default SelectFamilyStatus;
