import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "../SelectOption";

type ISelectTenancyRoleProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const tenancyRoleOptions: SelectOptionType[] = [
  {
    label: "Tenant",
    value: "Tenant",
  },
  {
    label: "Agent",
    value: "Agent",
  },
  {
    label: "Owner",
    value: "Owner",
  },
];

const SelectTenancyRole: React.FC<ISelectTenancyRoleProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={tenancyRoleOptions}
      label="Role Tenant"
      name="tenancy_role"
      placeholder="Pilih Role Tenant"
      {...props}
    />
  );
};

export default SelectTenancyRole;
