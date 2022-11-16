import React from "react";
import { SelectOptionType } from "@types";
import useUnitByContactIDList from "./hook";
import { createOptions } from "@utils/helper";
import SelectOption, { SelectOptionChangeType } from "@components/select/SelectOption";

interface ISelectUnitByContactID {
  onChange: SelectOptionChangeType<string>;
  value?: SelectOptionType | null;
  contactId: string;
  error?: boolean;
  helperText?: string;
}

const SelectUnitByContactID: React.FC<ISelectUnitByContactID> = ({
  onChange,
  value,
  contactId,
  error,
  helperText,
}) => {
  const { data, loading } = useUnitByContactIDList(contactId);

  const options: SelectOptionType[] = createOptions(
    data.map((v) => ({
      ...v,
    })),
    "name",
    "id"
  );

  const disabled = !contactId || options.length === 0;

  return (
    <SelectOption
      type="base-select"
      name="propertyUnit"
      label="Property Unit"
      placeholder="Pilih Property Unit"
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
export default SelectUnitByContactID;
