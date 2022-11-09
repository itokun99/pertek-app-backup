import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from "../SelectOption";
import { createOptions } from "@utils/helper";
import { SelectOptionChangeType } from "../SelectOption";
import useSelectCompanyDivision from "./hook/useSelectCompanyDivision";

interface ISelectCompanyDivisionProperties {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectCompanyDivision: React.FC<ISelectCompanyDivisionProperties> = ({
  onChange,
  value,
  disabled,
  error,
  helperText,
}) => {
  const { data, loading, keyword, setKeyword, setOpen } = useSelectCompanyDivision();

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
    })),
    "name",
    "id"
  );

  return (
    <SelectOption
      type="auto-complete-select"
      name="company_department_id"
      label="Company Department"
      placeholder="Masukan Nama Kontak"
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

export default SelectCompanyDivision;
