import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";

type ISelectFacilityTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const profileTypeOptions: SelectOptionType[] = [
  {
    label: "Shared",
    value: "Shared",
  },
  {
    label: "Dedicated",
    value: "Dedicated",
  },
];

const SelectFacilityType: React.FC<ISelectFacilityTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={profileTypeOptions}
      label="Tipe Fasilitas"
      name="facility_type"
      placeholder="Pilih Tipe Fasilitas"
      {...props}
    />
  );
};

export default SelectFacilityType;
