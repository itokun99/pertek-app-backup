import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from "../SelectOption";
import useTenantList from "./hook";
import { createOptions } from "@utils/helper";
import { SelectOptionChangeType } from "../SelectOption";

interface ISelectTenant {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectTenant: React.FC<ISelectTenant> = ({
  onChange,
  value,
  disabled,
  error,
  helperText,
}) => {
  const { data, loading, keyword, setKeyword, setOpen } = useTenantList();

  const handleInputChange = (
    _event: React.SyntheticEvent,
    value: string,
    _reason: AutocompleteInputChangeReason
  ): void => {
    setKeyword(value);
  };

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options: SelectOptionType[] = createOptions(
    data.map((v) => ({
      ...v,
      fullName: `${v.first_name} ${v.last_name}`,
    })),
    "fullName",
    "contact_id"
  );

  return (
    <SelectOption
      type="auto-complete-select"
      name="tenant"
      label="Tenant"
      placeholder="Pilih Tenant"
      loading={loading}
      value={value}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      error={error}
      helperText={helperText}
    />
  );
};

export default SelectTenant;
