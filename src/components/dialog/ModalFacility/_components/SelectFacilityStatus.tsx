import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";

type ISelectFacilityStatusProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const profileTypeOptions: SelectOptionType[] = [
  {
    label: "Open",
    value: "Open",
  },
  {
    label: "Close",
    value: "Close",
  },
  {
    label: "Maintenance",
    value: "Maintenance",
  },
];

const SelectFacilityStatus: React.FC<ISelectFacilityStatusProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={profileTypeOptions}
      label="Status"
      name="status"
      placeholder="Pilih Status Fasilitas"
      {...props}
    />
  );
};

export default SelectFacilityStatus;
