import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectFamilyStatusProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const familyStatusOptions: SelectOptionType[] = [
  {
    label: "Houseband",
    value: "Houseband",
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
      label="Resident Status"
      name="residentStatus"
      placeholder="Pilih Resident Status"
      {...props}
    />
  );
};

export default SelectFamilyStatus;
