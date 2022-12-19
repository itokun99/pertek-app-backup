import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption, { SelectOptionChangeType } from "@components/select/SelectOption";
import useStaff from "./hook";
import { createOptions } from "@utils/helper";

interface ISelectStaff {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectStaff: React.FC<ISelectStaff> = ({ onChange, value, disabled, error, helperText }) => {
  const { data, loading, keyword, setKeyword, setOpen } = useStaff();

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
      fullName: v.contact.first_name + " " + v.contact.last_name,
    })),
    "fullName",
    "id"
  );

  return (
    <SelectOption
      type="auto-complete-select"
      name="staff"
      label="Staff"
      placeholder="Pilih Staff"
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

export default SelectStaff;
