import React, { useEffect, memo } from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from "../SelectOption";
import usePropertyUnit from "./hooks";
import { createOptions } from "@utils/helper";
import { SelectOptionChangeType } from "../SelectOption";

interface ISelectPropertyUnit {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
}

const SelectPropertyUnit: React.FC<ISelectPropertyUnit> = ({ onChange, value, disabled }) => {
  const { data, loading, keyword, setKeyword, setOpen } = usePropertyUnit();

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

  const options: SelectOptionType[] = createOptions(data, "name", "id");

  return (
    <SelectOption
      name="propertyUnit"
      label="Property Unit"
      placeholder="Masukan Nama Property Unit"
      loading={loading}
      value={value}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      type="auto-complete-select"
    />
  );
};

export default memo(SelectPropertyUnit);
