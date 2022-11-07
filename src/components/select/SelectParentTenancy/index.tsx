import React from "react";
import { SelectOptionType } from "@types";
import SelectOption from "../SelectOption";
import useParentTenancyList from "./hook/useParentTenancyList";
import { createOptions } from "@utils/helper";
import { SelectOptionChangeType } from "../SelectOption";

interface ISelectParentTenancy {
  onChange: SelectOptionChangeType<string>;
  value?: string;
  unitId?: string;
  error?: boolean;
  helperText?: string;
}

const SelectParentTenancy: React.FC<ISelectParentTenancy> = ({
  onChange,
  value,
  unitId,
  error,
  helperText,
}) => {
  const { data, loading } = useParentTenancyList(unitId);

  const options: SelectOptionType[] = createOptions(
    data.map((v) => ({
      ...v,
      fullName: `${v.first_name} ${v.last_name}`,
    })),
    "fullName",
    "tenant_id"
  );

  const disabled = !unitId || options.length === 0;

  return (
    <SelectOption
      type="base-select"
      name="parentTenancy"
      label="Parent Tenancy"
      placeholder="Pilih Parent Tenancy"
      loading={loading}
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};

export default React.memo(SelectParentTenancy);
